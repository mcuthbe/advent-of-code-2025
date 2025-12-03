import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);
let start = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let options: number[][] = [start];

const decrease = (current: string) => {
  while (current.length > 12) {
    let options: string[] = [];
    for (let i = 0; i < current.length; i++) {
      const option = current.slice(0, i) + current.slice(i + 1);
      // console.log(i);
      // console.log(current.slice(0, i));
      // console.log(current.slice(i + 1));
      // console.log(option);
      options.push(option);
    }
    current = options.sort((a, b) => +b - +a)[0];
    // console.log(current);
  }
  return current;
};

let count = 0;

for (const [index, move] of moves.entries()) {
  const decreased = decrease(move);
  console.log(decreased);
  count += +decreased;
  // console.log(move.slice(1));
}
console.log(count);
