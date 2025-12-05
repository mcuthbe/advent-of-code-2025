import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);
let finalCount = 0;

const grid: Record<string, string> = {};

for (const [row, move] of moves.entries()) {
  for (const [col, char] of move.split("").entries()) {
    grid[`${row},${col}`] = char;
  }
}
let done = false;
while (!done) {
  console.log("Attempting");
  let count = 0;

  for (const key in grid) {
    const [row, col] = key.split(",").map(Number);
    let rocks = 0;
    if (grid[key] === ".") {
      continue;
    }
    // console.log("Checking " + key, grid[key]);
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        const newKey = `${i},${j}`;
        if ((grid[newKey] === "@" || grid[newKey] === "X") && newKey != key) {
          rocks++;
        }
      }
    }
    if (rocks < 4) {
      // console.log("Rocks: " + rocks);
      count++;
      grid[key] = "X";
    }
  }
  for (const key in grid) {
    if (grid[key] === "X") {
      grid[key] = ".";
    }
  }
  finalCount += count;
  console.log(count);
  if (count === 0) {
    done = true;
  }
}

console.log(finalCount);
