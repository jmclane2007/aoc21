import * as fs from 'fs';
import readline from 'readline';

async function countGamma() {
  const stream = fs.createReadStream("input.txt");
  const lines = readline.createInterface({input: stream, crlfDelay: Infinity});

  const bitCounts: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  let totalLines = 0;
  for await(const line of lines) {
    totalLines++;
    let bitNumber = parseInt(line, 2);
    let i = 11;
    while(bitNumber) {
      bitCounts[i--] += bitNumber & 1;
      bitNumber >>= 1;
    }
  }

  let gammaString = "";
  let epsilonString = "";
  bitCounts.forEach(count => {
    if(count >= (totalLines / 2)) {
      gammaString += "1";
      epsilonString += "0";
    } else {
      gammaString += "0";
      epsilonString += "1";
    }
  });
  console.log(parseInt(gammaString, 2) * parseInt(epsilonString, 2))
}
countGamma();