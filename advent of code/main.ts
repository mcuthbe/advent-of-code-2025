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
  const direction = move[0];
  let distance = move.match(/\d+/) ? parseInt(move.match(/\d+/)![0]) : 0;
  while (distance > 0) {
    position = direction === "R" ? position + 1 : position - 1;
    if (position < 0) position += 100;
    if (position > 99) position -= 100;
    if (position === 0) count++;
    distance--;
  }
}
console.log(count);
