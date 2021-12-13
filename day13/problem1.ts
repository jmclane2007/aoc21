import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);

let i = 0;
// We will be adding and removing items as the paper is folded
// This can be done with an array, but you have to cheat and look at the max inputs
// I just find this solution more interesting
const markedPoints = new Map<number, Set<number>>();
while(!lines[i].startsWith("fold")) {
  const nums = lines[i].split(",").map(a => parseInt(a));
  const set = markedPoints.get(nums[0]);
  if(!set) {
    markedPoints.set(nums[0], new Set<number>());
  }
  markedPoints.get(nums[0])!.add(nums[1]);
  i++;
}

// This would have been so much easier in Java with better set equality and methods
while(i < lines.length) {
  const fold = lines[i+2].split("=");
  const foldNum = parseInt(fold[1]);
  if(fold[0].charAt(fold[0].length - 1) === "x") {
    for(let currKey of markedPoints.keys()) {
      if(currKey > foldNum) {
        const newX = (2 * foldNum) - currKey;
        const set = markedPoints.get(newX)!;
        if(!set) {
          markedPoints.set(newX, markedPoints.get(currKey)!);
        } else {
          for(let value of markedPoints.get(currKey)!.values()) {
            set.add(value);
          }
        }
        markedPoints.delete(currKey);
      }
    }
  } else {
    for(let key of markedPoints.keys()) {
      const set = markedPoints.get(key);
      set?.forEach(value => {
        if(value > foldNum) {
          set.add((2 * foldNum) - value);
          set.delete(value);
        }
      })
    }
  }
  i += 3;
}

let totalPoints = 0;
const screen = new Array(40).fill(" ").map(() => new Array(7).fill(" "));
for(let key of markedPoints.keys()) {
  totalPoints += markedPoints.get(key)!.size;
  for(let value of markedPoints.get(key)!.values()) {
    screen[key][value] = "#";
  }
}
// They come out backwards
for(let i = 0; i < screen.length; i++) {
  let line = "";
  for(let j = 0; j < screen[0].length; j++) {
    line += screen[i][j];
  }
  console.log(line);
}
console.log(totalPoints);
