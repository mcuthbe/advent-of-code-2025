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

let circuits: Position[][] = [];

connections
  .toSorted((a, b) => a.distance - b.distance)
  .filter((_, index) => index < 1000)
  .forEach(({ first, second }) => {
    let done = false;
    if (first.x === 19137 || second.x === 19137) {
      console.log("starting", first, second);
      console.log(
        circuits.filter((circuit) =>
          circuit.find(
            (pos) => pointsEquals(pos, first!) || pointsEquals(pos, second!)
          )
        )
      );
    }

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
        console.log(
          "Circuits",
          circuits.filter((circuit) =>
            circuit.find(
              (pos) => pointsEquals(pos, first!) || pointsEquals(pos, second!)
            )
          )
        );
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
        if (first.x === 19137 || second.x === 19137) {
          console.log("Merging circuits");
        }
        // if (Array.from(newCircuit).some((pos) => pos.x === 19137)) {
        //   console.log("Merged from elsewhere", first, second);
        // }
      }
    }
    if (done) return;
    circuits.forEach((circuit, index) => {
      const has1 = circuit.find((pos) => pointsEquals(pos, first!));
      const has2 = circuit.find((pos) => pointsEquals(pos, second!));
      if (has1 && has2) {
        done = true;
        if (first.x === 19137 || second.x === 19137) {
          console.log("Has1 && has2");
        }
        return;
      }
      if (has1) {
        done = true;
        if (first.x === 19137 || second.x === 19137) {
          console.log("Has1");
        }
        circuit.push(second!);
        return;
      }
      if (has2) {
        if (first.x === 19137 || second.x === 19137) {
          console.log("Has2");
        }
        done = true;
        circuit.push(first!);
        return;
      }
    });
    if (!done) {
      if (first.x === 19137 || second.x === 19137) {
        console.log("New circuit");
      }
      circuits.push([first!, second!]);
    }
    if (first.x === 19137 || second.x === 19137) {
      console.log("Connected", first, second);
      console.log(
        circuits.filter((circuit) =>
          circuit.find(
            (pos) => pointsEquals(pos, first!) || pointsEquals(pos, second!)
          )
        )
      );
    }
  });

let finalCount = 1;
circuits = circuits.toSorted((a, b) => b.length - a.length);
for (let i = 0; i < 3; i++) {
  console.log(circuits[i].length);
  finalCount *= circuits[i].length;
}
console.log(finalCount);
