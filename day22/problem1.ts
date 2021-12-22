import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const REACTOR_SIZE = 50;
const lines = input.split(/[\sxyz=,.]+/);
const arrayLength = REACTOR_SIZE * 2 + 1;
const reactor = new Array(arrayLength).fill(false).map(
  () => new Array(arrayLength).fill(false).map(
    () => new Array(arrayLength).fill(false)));
// on/off plus 6 coords
for(let steps = 0; steps < lines.length; steps += 7) {
  const on = lines[steps] === "on";
  const minX = parseInt(lines[steps + 1]) + REACTOR_SIZE, maxX = parseInt(lines[steps + 2]) + REACTOR_SIZE;
  const minY = parseInt(lines[steps + 3]) + REACTOR_SIZE, maxY = parseInt(lines[steps + 4]) + REACTOR_SIZE;
  const minZ = parseInt(lines[steps + 5]) + REACTOR_SIZE, maxZ = parseInt(lines[steps + 6]) + REACTOR_SIZE;
  // I know this approach isn't going to work for part 2 because I don't know how to do the overlapping cubes/rectangular prisms, but it will work for a small problem set
  let count = 0;
  for(let i = minX; i < arrayLength && i >= 0 && i <= maxX; i++) {
    for(let j = minY; j < arrayLength && j >= 0 && j <= maxY; j++) {
      for(let k = minZ; k < arrayLength && k >= 0 && k <= maxZ; k++) {
        reactor[i][j][k] = on;
        count++;
      }
    }
  }
}

let count = 0;
for(let i = 0; i < reactor.length; i++) {
  for(let j = 0; j < reactor[0].length; j++) {
    for(let k = 0; k < reactor[0][0].length; k++) {
      if(reactor[i][j][k]) {
        count++;
      }
    }
  }
}
console.log(count);