import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);

type Entry = { operation: "+" | "*"; values: number[] };

let count = 0;

type Coord = { x: number; y: number };
type Dupes = { coord: Coord; count: number };

type Map = Record<number, Record<number, string>>;

let map: Map = {};
let startPos: Coord = { x: 0, y: 0 };
let checked: Record<`${number},${number}`, number> = {};

let locations: Dupes[] = [];

inputString.split("\r\n").forEach((line, lineIndex) => {
  line.split("").forEach((char, charIndex) => {
    map[lineIndex] ??= {};
    if (char === "S") {
      startPos = { x: charIndex, y: lineIndex };
      locations.push({ coord: startPos, count: 1 });
    }
    map[lineIndex][charIndex] = char;
  });
});
// console.log(map);
// console.log(locations);
// console.log(map[Array.from(locations)[0].y][Array.from(locations)[0].x]);
let done = false;
while (locations.length > 0 && !done) {
  let newLocations: Dupes[] = [];
  let deduped: Dupes[] = [];
  for (const location of locations) {
    const existing = deduped.find(
      (loc) =>
        loc.coord.x === location.coord.x && loc.coord.y === location.coord.y
    );
    if (existing) {
      existing.count += location.count;
    } else {
      deduped.push(location);
    }
  }
  console.log(deduped);
  for (const location of deduped) {
    const newY = location.coord.y + 1;
    if (map[newY]?.[location.coord.x] === ".") {
      newLocations.push({
        coord: { x: location.coord.x, y: newY },
        count: location.count,
      });
    }
    if (map[newY]?.[location.coord.x] === "^") {
      newLocations.push({
        coord: { x: location.coord.x + 1, y: newY },
        count: location.count,
      });
      newLocations.push({
        coord: { x: location.coord.x - 1, y: newY },
        count: location.count,
      });
    }
  }
  if (!locations.every((location) => map[location.coord.y][location.coord.x])) {
    done = true;
  } else {
    count = locations.reduce((acc, loc) => acc + loc.count, 0);
  }
  locations = newLocations;
  // console.log(locations);
}

console.log(count);
