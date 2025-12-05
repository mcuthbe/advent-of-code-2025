import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);
const ranges =
  inputString.match(/.*-.*/gm)?.map((range) => {
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  }) || [];
const ids = inputString.match(/^\d+$/gm)?.map(Number) || [];

let count = 0;

for (const id of ids) {
  let found = false;
  console.log(id);
  for (const range of ranges) {
    if (id >= range.min && id <= range.max) {
      found = true;
      break;
    }
  }
  if (found) {
    count++;
  }
}

console.log(count);
