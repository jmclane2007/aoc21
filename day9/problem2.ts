import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);
// Creating array to control our movements
const touched = new Array(lines.length).fill(false).map(() => new Array(lines[0].length).fill(false));
const lowPoints = [];

for(let i = 0; i < lines.length; i++) {
  for(let j = 0; j < lines[0].length; j++) {
    const currCode = lines[i].charCodeAt(j);
    let higherCount = 0;
    if(i === 0) {
      higherCount++;
    } else {
      if(currCode < lines[i - 1].charCodeAt(j)) {
        higherCount++
      }
    }
    if(i === lines.length - 1) {
      higherCount++;
    } else {
      if(currCode < lines[i + 1].charCodeAt(j)) {
        higherCount++;
      }
    }
    if(j === 0) {
      higherCount++;
    } else {
      if(currCode < lines[i].charCodeAt(j - 1)) {
        higherCount++;
      }
    }
    if(j === lines[0].length - 1) {
      higherCount++;
    } else {
      if(currCode < lines[i].charCodeAt(j + 1)) {
        higherCount++;
      }
    }
    // true minimum if all adjacent spots are higher
    if(higherCount === 4) {
      // Don't use an object for rol/col because why not?
      lowPoints.push(i);
      lowPoints.push(j);
    }
  }
}

const sums = [];
for(let i = 0; i < lowPoints.length; i += 2) {
  // Inefficient way to do this, but whatever, it's simple
  sums.push(dfs(lowPoints[i], lowPoints[i+1]));
  sums.sort((a,b) => b - a);
}
console.log(sums);
console.log(sums[0] * sums[1] * sums[2]);

function dfs(row: number, col: number): number {
  // base case isn't long enough yet. needs more conditions
  if(row < 0 || col < 0 || row >= lines.length || col >= lines[0].length || lines[row].charAt(col) === "9" || touched[row][col]) {
    return 0;
  }
  touched[row][col] = true;

  return 1 + dfs(row - 1, col) + dfs(row + 1, col) + dfs(row, col - 1) + dfs(row, col + 1);
}