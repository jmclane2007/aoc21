import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split(/[\s]+/);
const SIZE = 100;
const STEPS = 50;
const imageSize = SIZE + ((STEPS + 1) * 2);
// Need enough size around the edge to calculate pixels leaking in
let image = new Array(imageSize).fill(0).map(() => new Array(imageSize).fill(0));
lines[0] = lines[0].replace(/[.]/g, "0").replace(/#/g, "1");
for(let i = 0; i < SIZE; i++) {
  // Making it easier to tell which pixels are lit and make binary number later
  lines[i+1] = lines[i+1].replace(/[.]/g, "0").replace(/#/g, "1");
  for(let j = 0; j < SIZE; j++) {
    image[i + STEPS + 1][j + STEPS + 1] = lines[i+1].charAt(j);
  }
}

for(let step = 0; step < STEPS; step++) {
  printImage(image);
  const newImage = new Array(imageSize).fill(0).map(() => new Array(imageSize).fill(0));
  for(let i = 1; i < imageSize - 1; i++) {
    for(let j = 1; j < imageSize - 1; j++) {
      // Form our binary number
      let binary = "";
      for(let k = -1; k < 2; k++) {
        for(let l = -1; l < 2; l++) {
          binary += image[i + k][j + l];
        }
      }
      newImage[i][j] = lines[0].charAt(parseInt(binary, 2));
    }
  }
  // Have to flip all the outside pixels if 0 equals # and 511 equals .
  // Cheated to see if we need to flip looking at the input.
  const flipTo = step % 2 === 0 ? "1" : "0";
  for(let i = 0; i < newImage.length; i++) {
    newImage[i][0] = flipTo;
    newImage[0][i] = flipTo;
    newImage[newImage.length - 1][i] = flipTo;
    newImage[i][newImage.length - 1] = flipTo;
  }
  image = newImage;
}
let count = 0;
for(let i = 0; i < image.length; i++) {
  for(let j = 0; j < image.length; j++) {
    if(image[i][j] === "1") {
      count++;
    }
  }
}
printImage(image);
console.log(count);


function printImage(image: string[][]) {
  for(let i = 0; i < image.length; i++) {
    let line = "";
    for(let j = 0; j < image.length; j++) {
      if(image[i][j] === "1") {
        line+="#"
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
  console.log("");
}