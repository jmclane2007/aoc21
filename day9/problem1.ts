import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);
let riskSum = 0;
for(let i = 0; i < lines.length; i++) {
  for(let j = 0; j < lines[0].length; j++) {
    const currCode = lines[i].charCodeAt(j);
    let lessThanCount = 0;
    if(i === 0) {
      lessThanCount++;
    } else {
      if(currCode < lines[i - 1].charCodeAt(j)) {
        lessThanCount++
      }
    }
    if(i === lines.length - 1) {
      lessThanCount++;
    } else {
      if(currCode < lines[i + 1].charCodeAt(j)) {
        lessThanCount++;
      }
    }
    if(j === 0) {
      lessThanCount++;
    } else {
      if(currCode < lines[i].charCodeAt(j - 1)) {
        lessThanCount++;
      }
    }
    if(j === lines[0].length - 1) {
      lessThanCount++;
    } else {
      if(currCode < lines[i].charCodeAt(j + 1)) {
        lessThanCount++;
      }
    }
    // true minimum if all adjacent spots are higher
    if(lessThanCount === 4) {
      // 0 is ascii 48, plus 1 for risk
      riskSum += currCode - 47
    }
  }
}
console.log(riskSum);