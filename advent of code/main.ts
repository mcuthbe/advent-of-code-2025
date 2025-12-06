import { memoise, permutator } from "./helpers.ts";

// Define the path to the text file
const filePath = "./input.txt";

let inputString = (await Deno.readTextFile(filePath)) as string;

const moves = inputString.split(`\r\n`);

type Entry = { operation: "+" | "*"; values: number[] };
const dict: Record<number, Entry> = {};

for (const move of moves) {
  const strings = move.split(" ").filter((x) => x.length > 0);
  console.log(strings);
  for (const [index, str] of strings.entries()) {
    dict[index] = dict[index] || { operation: "+", values: [] };
    if (str === "+" || str === "*") {
      dict[index].operation = str;
    }

    const num = Number(str);
    if (isNaN(num)) continue;
    dict[index].values.push(num);
  }
}
let count = 0;
for (const entry of Object.values(dict)) {
  let total = entry.values[0];
  for (const val of entry.values.slice(1)) {
    if (entry.operation === "+") {
      total += val;
    } else {
      total *= val;
    }
  }
  console.log(JSON.stringify(entry));
  console.log(total);
  count += total;
}
console.log(count);
