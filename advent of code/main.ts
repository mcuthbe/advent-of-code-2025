import { memoise } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

console.log(inputString);

const moves = inputString.replace(/\r\n/g, "").split(`,`);
console.log(moves);
let count = 0;
for (const [index, move] of moves.entries()) {
  const [first, second] = move.split("-");
  for (let i = +first; i <= +second; i++) {
    const text = `${i}`;
    if (text.slice(0, text.length / 2) === text.slice(text.length / 2)) {
      count += i;
    }
  }
}
console.log(count);
