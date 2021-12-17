import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const line = input.split(/[\s,=xyarget:.]+/);
const x1 = parseInt(line[1]), x2 = parseInt(line[2]);
const y1 = parseInt(line[3]), y2 = parseInt(line[4]);

// We don't actually care about the x velocity for this part
// The fastest the probe can be moving while in the target is the bottom y
// Probe always comes back to y = 0, so 
const bottom = Math.min(y1, y2);
// We need an extra step after coming back to 0
console.log(bottom * (bottom + 1) / 2);

