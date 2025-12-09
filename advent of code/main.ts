import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const lines = inputString.split(`\r\n`);

type Position = {
  x: number;
  y: number;
  z: number;
};

const calculateDistance = (a: Position, b: Position) => {
  return Math.abs(
    Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2)
  );
};

const pointsEquals = (a: Position, b: Position) => {
  return a.x === b.x && a.y === b.y && a.z === b.z;
};

let connections: { first: Position; second: Position; distance: number }[] = [];

for (let i = 0; i < lines.length; i++) {
  const [x, y, z] = lines[i].split(",").map((n) => +n);
  const position = { x, y, z };
  for (let j = i + 1; j < lines.length; j++) {
    const [x2, y2, z2] = lines[j].split(",").map((n) => +n);
    const position2 = { x: x2, y: y2, z: z2 };
    const distance = calculateDistance(position, position2);

    connections.push({ first: position, second: position2, distance });
  }
}

let finalCount = 1;

let circuits: Position[][] = [];
let finished = false;
connections
  .toSorted((a, b) => a.distance - b.distance)
  .forEach(({ first, second }) => {
    let done = false;
    if (finished) return;

    if (
      circuits.filter((circuit) =>
        circuit.find(
          (pos) => pointsEquals(pos, first!) || pointsEquals(pos, second!)
        )
      ).length > 1
    ) {
      const firstCircuitIndex = circuits.findIndex(
        (circuit) => !!circuit.find((pos) => pointsEquals(pos, first!))
      );
      const secondCircuitIndex = circuits.findIndex(
        (circuit) => !!circuit.find((pos) => pointsEquals(pos, second!))
      );
      if (firstCircuitIndex === -1 || secondCircuitIndex === -1) {
        return;
      }
      if (
        firstCircuitIndex !== -1 &&
        secondCircuitIndex !== -1 &&
        firstCircuitIndex !== secondCircuitIndex
      ) {
        const newCircuit = new Set([
          ...circuits[firstCircuitIndex],
          ...circuits[secondCircuitIndex],
        ]);
        if (firstCircuitIndex > secondCircuitIndex) {
          circuits.splice(firstCircuitIndex, 1);
          circuits.splice(secondCircuitIndex, 1);
        } else {
          circuits.splice(secondCircuitIndex, 1);
          circuits.splice(firstCircuitIndex, 1);
        }
        circuits.push(Array.from(newCircuit));
        done = true;
      }
    }
    if (done) return;
    circuits.forEach((circuit, index) => {
      const has1 = circuit.find((pos) => pointsEquals(pos, first!));
      const has2 = circuit.find((pos) => pointsEquals(pos, second!));
      if (has1 && has2) {
        done = true;

        return;
      }
      if (has1) {
        done = true;

        circuit.push(second!);
        return;
      }
      if (has2) {
        done = true;
        circuit.push(first!);
        return;
      }
    });
    if (!done) {
      circuits.push([first!, second!]);
    }

    if (circuits.length === 1 && circuits[0].length === lines.length) {
      finished = true;
      finalCount = first.x * second.x;
    }
  });

console.log(finalCount);
