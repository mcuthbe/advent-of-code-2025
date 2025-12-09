import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const lines = inputString.split(`\r\n`);

type Position = {
  x: number;
  y: number;
};

const calculateArea = (a: Position, b: Position) => {
  return Math.abs((a.x - b.x + 1) * (a.y - b.y + 1));
};

const pointsEquals = (a: Position, b: Position) => {
  return a.x === b.x && a.y === b.y;
};

let largest = 0;
for (let i = 0; i < lines.length; i++) {
  const [x, y] = lines[i].split(",").map((n) => +n);
  const position = { x, y };
  for (let j = i + 1; j < lines.length; j++) {
    const [x2, y2] = lines[j].split(",").map((n) => +n);
    const position2 = { x: x2, y: y2 };
    const area = calculateArea(position, position2);

    if (area > largest) {
      console.log(area);
      console.log(position, position2);
      largest = area;
    }
  }
}
console.log(largest);
