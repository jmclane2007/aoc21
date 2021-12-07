import * as fs from 'fs';

const input = fs.readFileSync("input.txt", "utf8");

const crabs = input.split(/[,\s]+/).map(coord => parseInt(coord));
// This sorts in lexico order unless you use a comparator
crabs.sort((a, b) => a - b);
let median = 0;
if(crabs.length % 2 === 0) {
  const middle = crabs.length / 2;
  median = Math.ceil((crabs[middle] + crabs[middle - 1]) / 2.0);
} else {
  median = crabs[Math.floor(crabs.length)];
}
let fuelSum = 0;
let total = 0;
crabs.forEach(crab => {
  fuelSum += Math.abs(median - crab);
  total += crab;
});
console.log("Part one: " + fuelSum);

const average = Math.floor(total / crabs.length);
fuelSum = 0;
crabs.forEach(crab => {
  const distance = Math.abs(average - crab);
  const cost = (distance * (distance + 1)) / 2;
  fuelSum += cost;
})
console.log("Part two: " + fuelSum);
