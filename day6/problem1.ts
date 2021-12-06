import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const NUMBER_OF_DAYS = 256; 
const fishDays = input.split(/[,\s]+/).map(coord => parseInt(coord));
const fishCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
fishDays.forEach(daysLeft => {
  fishCounts[daysLeft]++;
});
for(let i = 0; i < NUMBER_OF_DAYS; i++) {
  const day0Count = fishCounts[0];
  for(let j = 0; j < fishCounts.length - 1; j++) {
    fishCounts[j] = fishCounts[j+1];
  }
  fishCounts[fishCounts.length - 1] = day0Count;
  fishCounts[6] += day0Count;
}
let fishSum = 0;
for(let j = 0; j < fishCounts.length; j++) {
  fishSum += fishCounts[j];
}
console.log(fishCounts);
console.log(fishSum);