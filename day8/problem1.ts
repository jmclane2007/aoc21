import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const digits = input.split(/[,\s|]+/);

let digitSum = 0;
for(let i = 0; i < digits.length; i += 14) {
  if(isUniqueDigit(digits[i+10])) {
    digitSum++;
  }
  if(isUniqueDigit(digits[i+11])) {
    digitSum++;
  }
  if(isUniqueDigit(digits[i+12])) {
    digitSum++;
  }
  if(isUniqueDigit(digits[i+13])) {
    digitSum++;
  }
}
console.log(digitSum);

function isUniqueDigit(digit: string) {
  if(digit.length == 2 || digit.length == 3 ||digit.length == 4 ||digit.length == 7) {
    return true;
  }
  return false;
}
