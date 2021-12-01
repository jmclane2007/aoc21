import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const splitInput = input.split(/\s+/);
let previousDepth: number;
let increases = 0;
splitInput.forEach((depth) => {
  const parseDepth = parseInt(depth);
  if(previousDepth) {
    if(parseDepth > previousDepth) {
      increases++; 
    }
  }
  previousDepth = parseDepth;
});
console.log(increases);