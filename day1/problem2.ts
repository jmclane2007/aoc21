import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const nums = input.split(/\s+/).map((depth) => parseInt(depth));
let increases = 0;
for(let i = 0; i < nums.length - 3; i++) {
  if(nums[i] < nums[i+3]) {
    increases++;
  }
};
console.log(increases);
