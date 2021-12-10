import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);
// Stack time!
let errorSum = 0;
lines.forEach(line => {
  errorSum += evaluateLine(line);
})
console.log(errorSum);

function evaluateLine(line: string) {
  const stack: string[] = [];
  for(let i = 0; i < line.length; i++) {
    const currChar = line.charAt(i);
    if(currChar === ")") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "(") {
        return 3;
      }
      // This feels wrong, but hey it's javascript
      stack.length = stack.length - 1;
    } else if (currChar === "]") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "[") {
        return 57;
      }
      stack.length = stack.length - 1;
    } else if (currChar === "}") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "{") {
        return 1197;
      }
      stack.length = stack.length - 1;
    } else if (currChar === ">") {
      if(!stack[stack.length - 1] || stack[stack.length - 1] !== "<") {
        return 25137;
      }
      stack.length = stack.length - 1;
    } else {
      stack.push(currChar);
    }
  }
  return 0;
}