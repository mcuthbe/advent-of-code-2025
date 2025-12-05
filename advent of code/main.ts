import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);
type Range = { min: number; max: number };
const ranges =
  inputString.match(/.*-.*/gm)?.map((range) => {
    const [min, max] = range.split("-").map(Number);
    return { min, max };
  }) || [];

let count = 0;

let validRanges: Range[] = [];

const compareRanges = (a: Range, b: Range) => {
  // console.log(`Comparing: ${JSON.stringify(a)}, ${JSON.stringify(b)}`);
  //fully inside, skip
  if (a.min >= b.min && a.max <= b.max) {
    return [b];
  }
  //fully outside, separate range
  if (a.max < b.min || a.min > b.max) {
    // console.log("No replacement");
    return [a, b];
  }
  //fully bigger, swap
  if (a.min <= b.min && a.max >= b.max) {
    return [a];
  }
  //left overlapping
  if (a.min < b.min && a.max <= b.max) {
    return [{ min: a.min, max: b.max }];
  }
  //right overlapping
  if (a.min >= b.min && a.max > b.max) {
    return [{ min: b.min, max: a.max }];
  }
  console.log("No replacement any");
};

let currentRanges = ranges;
for (let i = 0; i < currentRanges.length; i++) {
  loop2: for (let j = i + 1; j < currentRanges.length; j++) {
    const comparedRanges = compareRanges(currentRanges[i], currentRanges[j]);

    if (comparedRanges && comparedRanges.length !== 2) {
      console.log("Replacement:" + JSON.stringify(comparedRanges));
      currentRanges.splice(j, 1);
      currentRanges.splice(i, 1);
      currentRanges.push(...comparedRanges);
      i = -1;
      break loop2;
    }
  }
  console.log(i);
  // console.log(currentRanges);
}

for (const range of currentRanges) {
  count += range.max - range.min + 1;
}

console.log(count);
