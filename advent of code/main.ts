import { memoise } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

console.log(inputString);

const moves = inputString.split(`\r\n`);
console.log(moves);
let position = 50;
let count = 0;
for (const [index, move] of moves.entries()) {
  console.log(move);
  const direction = move[0];
  const distance =
    (move.match(/\d+/) ? parseInt(move.match(/\d+/)![0]) : 0) % 100;
  position = direction === "R" ? position + distance : position - distance;
  if (position < 0) position += 100;
  if (position >= 100) position -= 100;
  console.log(position);
  if (position === 0) count++;
}
console.log(count);
