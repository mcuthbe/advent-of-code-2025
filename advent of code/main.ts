import { memoise } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

console.log(inputString);

const moves = inputString.split(`\r\n`);
console.log(moves);
let count = 0;
for (const [index, move] of moves.entries()) {
  let best = "00";
  for (let i = 0; i < move.length; i++) {
    for (let j = i + 1; j < move.length; j++) {
      if (move[i] + move[j] > best) {
        best = move[i] + move[j];
      }
    }
  }
  console.log(best);
  // console.log(count);
  count += +best;
}
console.log(count);
