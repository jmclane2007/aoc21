import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const line = input.split(/[\s,=xyarget:.]+/);
const x1 = parseInt(line[1]), x2 = parseInt(line[2]);
const y1 = parseInt(line[3]), y2 = parseInt(line[4]);

// I'm pretty confident that you can also write an equation for this, but I'm not THAT mathy.
// Bounded by max x and min y
let totalShots = 0;
// Only works for negative y values
const maxX = Math.max(x1, x2);
const minX = Math.min(x1, x2);
const maxY = Math.max(y1, y2);
const minY = Math.min(y1, y2);
for(let i = 1; i <= maxX + 100; i++) {
  for(let j = -100; j <= 100; j++) {
    let x = 0, vx = i;
    let y = 0, vy = j;
    // up for 89 steps, down for 89 steps, plus 1 after hitting y=0
    for(let step = 0; step < 200; step++) {
      x += vx;
      y += vy;
      if(x <= maxX && x >= minX && y <= maxY && y >= minY) {
        totalShots++;
        break;
      }
      if(vx > 0) {
        vx--;
      }
      if(y < minY) {
        break;
      }
      vy--;
    }
  }
}

console.log(totalShots);