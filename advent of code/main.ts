import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);

type Entry = { operation: "+" | "*"; values: number[] };

let count = 0;

type Coord = `${number},${number}`;

type Map = Record<number, Record<number, string>>;

let map: Map = {};
let startPos: Coord = `0,0`;
let checked: Record<`${number},${number}`, number> = {};

let locations: Set<Coord> = new Set();

inputString.split("\r\n").forEach((line, lineIndex) => {
  line.split("").forEach((char, charIndex) => {
    map[lineIndex] ??= {};
    if (char === "S") {
      startPos = `${charIndex},${lineIndex}`;
      locations.add(startPos);
    }
    map[lineIndex][charIndex] = char;
  });
});
// console.log(map);
// console.log(locations);
// console.log(map[Array.from(locations)[0].y][Array.from(locations)[0].x]);
while (
  locations.size > 0 &&
  Array.from(locations).every(
    (location) =>
      map[Number(location.split(",")[1])][Number(location.split(",")[0])]
  )
) {
  let newLocations: Set<Coord> = new Set();
  for (const location of locations) {
    const newY = Number(location.split(",")[1]) + 1;
    const x = Number(location.split(",")[0]);
    if (map[newY]?.[x] === ".") {
      newLocations.add(`${x},${newY}`);
    }
    if (map[newY]?.[x] === "^") {
      newLocations.add(`${x + 1},${newY}`);
      newLocations.add(`${x - 1},${newY}`);
      count++;
    }
  }
  locations = newLocations;
  console.log(locations);
}

console.log(count);
