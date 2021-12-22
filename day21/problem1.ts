// Positions need to be starting position minus 1 due to the mod. so 5 -> 4, 9 -> 8 etc.
let pos1 = 4;
let pos2 = 8;
// let's just brute force it for now. problem 2 will probably be annoying
// Each move is 9 more than the last
// Each move rotates 9-0, starting at 6 and substracting 1 each time

let player1 = 0, player2 = 0;
// Didn't want to use Math.abs each time, max 2000 steps
let score = 100006, steps = 0;
while(player1 < 1000 && player2 < 1000) {
  if(steps % 2 === 0) {
    // console.log((pos1 + score) % 10);
    // console.log(((pos1 + score) % 10));
    pos1 = ((pos1 + score) % 10);
    player1 += pos1 + 1;
  } else {
    pos2 = ((pos2 + score) % 10);
    player2 += pos2 + 1;
  }
  score--;
  steps++;
}

console.log(`player 1 score: ${player1} player 2 score: ${player2} steps: ${steps}`);
console.log(`player1 pos: ${pos1} player 2pos: ${pos2}`)
if(player1 >= 1000) {
  console.log(player2 * steps * 3);
} else {
  console.log(player1 * steps * 3);
}