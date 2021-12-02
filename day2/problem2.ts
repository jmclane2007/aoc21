import * as fs from 'fs';
import readline from 'readline';

async function processInstructions() {
  const stream = fs.createReadStream("input.txt");
  const lines = readline.createInterface({input: stream, crlfDelay: Infinity});
  let forward = 0;
  let depth = 0;
  let aim = 0;

  for await(const line of lines) {
    const instruction = line.split(/\s/);
    if(instruction[0] === "forward") {
      const value = parseInt(instruction[1])
      forward += value;
      depth += (value * aim);
    } else if (instruction[0] === "down") {
      aim += parseInt(instruction[1]);
    } else {
      aim -= parseInt(instruction[1]);
    }
  }
  console.log("forward = " + forward);
  console.log("depth = " + depth);
  console.log("depth = " + forward * depth);
}
processInstructions();
