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
    // console.log(text);
    for (let j = 0; j <= text.length - 1; j++) {
      // console.log(`j: ${j}`);
      let subString = "";
      for (let k = 0; k < j; k++) {
        // console.log(`k: ${k}`);
        subString += text[k];
      }
      // console.log(subString);
      const repetitions = text.length / j;
      if (repetitions % 1 === 0) {
        if (text === subString.repeat(repetitions)) {
          console.log(`Found: ${text}, ${subString}`);
          count += i;
          break;
        }
      }
    }
  }
}
console.log(count);
