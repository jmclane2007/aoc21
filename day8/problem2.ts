import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const digits = input.split(/[,\s|]+/);
let seven = "";
let one = "";
let four = "";
let eight = "";
let digitSum = 0;
for(let i = 0; i < digits.length; i += 14) {
  for(let j = 0; j < 10; j++) {
    if(digits[i + j].length == 3) {
      seven = digits[i + j];
    } else if(digits[i + j].length == 2) {
      one = digits[i + j];
    } else if(digits[i + j].length == 4) {
      four = digits[i + j];
    } else if(digits[i + j].length == 7) {
      eight = digits[i + j];
    }
  }
  
  digitSum += (1000 * translateDigit(digits[i + 10])) + (100 * translateDigit(digits[i + 11])) + (10 * translateDigit(digits[i + 12])) + translateDigit(digits[i + 13]);
}
console.log(digitSum);

function translateDigit(digit: string) {
  if(digit.length === 2) {
    return 1;
  }else if(digit.length === 3) {
    return 7;
  } else if(digit.length === 4) {
    return 4;
  } else if(digit.length == 7) {
    return 8;
  } else if(digit.length == 5) {
    // If it has both segments in 1, it's 3
    if(digit.includes(one.charAt(0)) && digit.includes(one.charAt(1))) {
      return 3;
    }
    let segmentSum = 0;
    for(let i = 0; i < four.length; i++) {
      if(digit.includes(four.charAt(i))) {
        segmentSum++;
      }
    }
    if(segmentSum === 2) {
      return 2;
    } else {
      return 5;
    }
  } else {
    // If it has one segment of 1, it's 6
    const hasSegment1 = digit.includes(one.charAt(0));
    const hasSegment2 = digit.includes(one.charAt(1));
    if((hasSegment1 && !hasSegment2) || (!hasSegment1 && hasSegment2)) {
      return 6;
    }
    let segmentSum = 0;
    for(let i = 0; i < four.length; i++) {
      if(digit.includes(four.charAt(i))) {
        segmentSum++;
      }
    }
    if(segmentSum === 4) {
      return 9;
    } else {
      return 0;
    }
  }
}

