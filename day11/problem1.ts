import * as fs from 'fs';

const ROWS = 10;
const COLS = ROWS;
// Too lazy to change to a while loop so let's go for a while
const STEPS = 1000000;

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);
const octopi = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(0));
let flashed: boolean[][];
let totalFlashed = 0;
for(let i = 0; i < ROWS; i++) {
  for(let j = 0; j < COLS; j++) {
    octopi[i][j] = lines[i].charCodeAt(j) - 48;
  }
}

for(let i = 0; i < STEPS; i++) {
  let previousFlashes = totalFlashed;
  increaseEnergy();
  flashOctopi();
  if(totalFlashed - previousFlashes === ROWS * COLS) {
    console.log(`ALL OCTOPI FLASH ON STEP ${i+1}`);
    break;
  }
}

console.log(totalFlashed);

function increaseEnergy() {
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      octopi[i][j]++;
    }
  }
}

function flashOctopi(): void {
  // reset flashing array
  flashed = new Array(ROWS).fill(false).map(() => new Array(COLS).fill(false));
  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      dfs(i, j);
    }
  }

  for(let i = 0; i < ROWS; i++) {
    for(let j = 0; j < COLS; j++) {
      if(octopi[i][j] > 9) {
        octopi[i][j] = 0;
      }
    }
  }
}

function dfs(row: number, col: number): void {
  // We're doing the long conditional thing again
  if(row < 0 || col < 0 || row >= ROWS || col >= COLS || flashed[row][col] || octopi[row][col] < 10) {
    return;
  }
  if(octopi[row][col] > 9) {
    flashed[row][col] = true;
    totalFlashed++;
    // Check adjacent octopi
    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        if(row + i >= 0 && col + j >= 0 && row + i < ROWS && col + j < COLS) {
          octopi[row + i][col + j]++;
        }
      }
    }
    for(let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        dfs(row + i, col + j);
      }
    }
  }
}