import * as fs from 'fs';
import readline from 'readline';

async function countGamma() {
  const stream = fs.createReadStream("input.txt");
  const lines = readline.createInterface({input: stream, crlfDelay: Infinity});
  let sortedLines: string[] = [];
  for await(const line of lines) {
    sortedLines.push(line);
  }
  sortedLines.sort();
  let sortCount = 0;
  while(sortedLines.length > 1 && sortCount < 12) {
    let index = 0;
    // This can be shortened to basically a binary search without slicing, but I wanted to actually remove items
    while(index < sortedLines.length) {
      if(sortedLines[index].charAt(sortCount) === "1") {
        break;
      }
      index++;
    }
    // Reverse the slices if you want to find the least common bits
    if(index <= sortedLines.length  / 2) {
      sortedLines = sortedLines.slice(index, sortedLines.length);
      // sortedLines = sortedLines.slice(0, index);
    } else {
      sortedLines = sortedLines.slice(0, index);
      // sortedLines = sortedLines.slice(index, sortedLines.length);
    }
    sortCount++;
  }
  console.log(parseInt(sortedLines[0], 2));
}
countGamma();