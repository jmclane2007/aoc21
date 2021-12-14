import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s->]+/);
const STEPS = 40;
const polymerMap = new Map<string, string>();
// Figured that they would go further with part 2, but didn't know how to solve it at the time.
for(let i = 1; i < lines.length; i +=2) {
  polymerMap.set(lines[i], lines[i+1]);
}

// initial count of pairs
let pairMap = new Map<string, number>();
for(let i = 0; i < lines[0].length-1; i++) {
  const pair = lines[0].charAt(i) + lines[0].charAt(i+1);
  const sum = pairMap.get(pair);
  if(sum) {
    pairMap.set(pair, sum + 1);
  } else {
    pairMap.set(pair, 1);
  }
}

for(let i = 0; i < STEPS; i++) {
  pairMap = increasePolymer(pairMap);
}
console.log(pairMap);

const charCounts = new Array<number>(26).fill(0);
for(let key of pairMap.keys()) {
  charCounts[key.charCodeAt(0) - 65] += pairMap.get(key)!;
}
// Accounting for overlap here.
charCounts[lines[0].charCodeAt(lines[0].length - 1) - 65]++;

let max = 0;
let min = Number.MAX_VALUE;
for(let i = 0; i < 26; i++) {
  max = Math.max(max, charCounts[i]);
  if(charCounts[i] < min && charCounts[i] > 0) {
    min = charCounts[i];
  }
}

console.log(max - min);

function increasePolymer(pairMap: Map<string, number>) {
  const newMap = new Map<string, number>();
  for(let key of pairMap.keys()) {
    const middle = polymerMap.get(key);
    const firstPair = key.charAt(0) + middle;
    const secondPair = middle + key.charAt(1);
    const numPairs = pairMap.get(key)!;
    if(newMap.get(firstPair)) {
      newMap.set(firstPair, newMap.get(firstPair)! + numPairs)
    } else {
      newMap.set(firstPair, numPairs);
    }
    if(newMap.get(secondPair)) {
      newMap.set(secondPair, newMap.get(secondPair)! + numPairs)
    } else {
      newMap.set(secondPair, numPairs);
    }
  }
  return newMap;
}
