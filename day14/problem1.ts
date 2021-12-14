import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s->]+/);
const STEPS = 10;
const polymerMap = new Map<string, string>();
for(let i = 1; i < lines.length; i +=2) {
  polymerMap.set(lines[i], lines[i+1]);
}
let newPolymer = lines[0];
for(let i = 0; i < STEPS; i++) {
  newPolymer = increasePolymer(newPolymer);
}
const charCounts = new Array<number>(26).fill(0);
let fcount = 0;
for(let i = 0; i < newPolymer.length; i++) {
  charCounts[newPolymer.charCodeAt(i) - 65]++;
}
let max = 0;
let min = newPolymer.length;
for(let i = 0; i < 26; i++) {
  console.log(charCounts[i]);
  max = Math.max(max, charCounts[i]);
  if(charCounts[i] < min && charCounts[i] > 0) {
    min = charCounts[i];
  }
}

console.log(newPolymer);
console.log(max - min);

function increasePolymer(starting: string) {
  let result = starting.charAt(0);
  for(let i = 0; i < starting.length - 1; i++) {
    const firstChar = starting.charAt(i);
    const secondChar = starting.charAt(i+1);
    const polymer = polymerMap.get(firstChar + secondChar);
    if(polymer) {
      result += polymer;
    }
    result += secondChar;
  }
  return result;
}

