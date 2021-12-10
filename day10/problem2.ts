import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);

const completeScores: number[] = [];
lines.forEach(line => {
  const score = evaluateLine(line);
  // Discard corrupted lines
  if(score > -1) {
    console.log(score);
    completeScores.push(score);
  }
})
completeScores.sort((a, b) => a - b);
console.log(completeScores);
console.log(completeScores[Math.floor(completeScores.length / 2)]);

function evaluateLine(line: string) {
  // Stack time!
  const stack: string[] = [];
  for(let i = 0; i < line.length; i++) {
    const currChar = line.charAt(i);
    if(currChar === ")") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "(") {
        return -1;
      }
      // This feels wrong, but hey it's javascript
      stack.length = stack.length - 1;
    } else if (currChar === "]") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "[") {
        return -1;
      }
      stack.length = stack.length - 1;
    } else if (currChar === "}") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "{") {
        return -1;
      }
      stack.length = stack.length - 1;
    } else if (currChar === ">") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "<") {
        return -1;
      }
      stack.length = stack.length - 1;
    } else {
      stack.push(currChar);
    }
  }
  let completeScore = 0;
  for(let i = stack.length - 1; i >= 0; i--) {
    const currChar = stack[i];
    completeScore *= 5;
    if(currChar === "(") {
      completeScore += 1;
    } else if(currChar === "[") {
      completeScore += 2;
    } else if(currChar === "{") {
      completeScore += 3;
    } else {
      completeScore += 4;
    }
    stack.length--;
  }
  return completeScore;
}