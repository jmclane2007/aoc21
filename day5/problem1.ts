import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const linePoints = input.split(/[-,>\s]+/).map(coord => parseInt(coord));
// There's probably a way to do this with a map. This seems really inefficient in array form
const oceanFloor = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
for(let i = 0;  i < linePoints.length; i+=4) {
  // Only vertical or horizontal lines are considered
  if(linePoints[i] === linePoints[i+2]) {
    if(linePoints[i + 1] > linePoints[i+3]) {
      for(let j = linePoints[i+3]; j <= linePoints[i+1]; j++) {
        oceanFloor[linePoints[i]][j]++;
      }
    } else {
      for(let j = linePoints[i+1]; j <= linePoints[i+3]; j++) {
        oceanFloor[linePoints[i]][j]++;
      }
    }
  } else if(linePoints[i+1] === linePoints[i+3]) {
    if(linePoints[i] > linePoints[i+2]) {
      for(let j = linePoints[i+2]; j <= linePoints[i]; j++) {
        oceanFloor[j][linePoints[i+1]]++;
      }
    } else {
      for(let j = linePoints[i]; j <= linePoints[i+2]; j++) {
        oceanFloor[j][linePoints[i+1]]++;
      }
    }
  } else if(Math.abs(linePoints[i] - linePoints[i+2]) === Math.abs(linePoints[i+1] - linePoints[i+3])) {
    let rowMove = 1;
    let colMove = 1;
    if(linePoints[i] > linePoints[i+2]) {
      rowMove = -1;
    }
    if(linePoints[i+1] > linePoints[i+3]) {
      colMove = -1;
    }
    for(let j = 0; j <= Math.abs(linePoints[i] - linePoints[i+2]); j++) {
      oceanFloor[linePoints[i] + (j*rowMove)][linePoints[i+1] + (j*colMove)]++;
    }
  }
}

let overlaps = 0;
for(let i = 0; i < oceanFloor.length; i++) {
  for(let j = 0; j < oceanFloor[0].length; j++) {
    if(oceanFloor[i][j] > 1) {
      overlaps++;
    }
  }
}
console.log(overlaps);