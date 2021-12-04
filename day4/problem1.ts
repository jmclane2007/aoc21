import * as fs from 'fs';

interface BoardResult {
  turnsToWin: number;
  winSum: number;
}

interface BoardNumber {
  row: number;
  col: number;
}

const input = fs.readFileSync("input.txt", "utf8");

const splitInput = input.split(/\s+/);
const drawnNumbers = splitInput[0].split(",").map(drawnNumber => parseInt(drawnNumber));
let topResult: BoardResult = {turnsToWin: 0, winSum: 0};
// Skipping 25 numbers each time a board is evaluated
for(let i = 1; i < splitInput.length; i += 25) {
  const result: BoardResult = evaluateBoard(splitInput, i);
  // Flip to < for part 1, > for part 2
  // Also change the turnsToWin to 100 for part 1, 0 for part 2
  if(result.turnsToWin > topResult.turnsToWin) {
    topResult = result;
  } else if(result.turnsToWin === topResult.turnsToWin && result.winSum > topResult.winSum) {
    topResult = result;
  }

}
console.log(topResult);

function evaluateBoard(splitInput: string[], inputNumber: number): BoardResult {
  // Use a map to avoid searching the board each time
  let board: {[key: string]: BoardNumber} = {};
  // Read in the board and prep a check
  const boardChecks = []
  for(let i = 0; i < 5; i++) {
    const row = []
    for(let j = 0; j < 5; j++) {
      board[splitInput[inputNumber + (i * 5) + j]] = {row: i, col: j};
      row.push(false);
    }
    boardChecks.push(row);
  }
  let turns = 1;
  for(let drawnNumber of drawnNumbers) {
    const check = board[drawnNumber];
    if(check) {
      boardChecks[check.row][check.col] = true;
      if(boardWins(boardChecks)) {
        return {turnsToWin: turns, winSum: calculateSum(board, boardChecks) * drawnNumber}
      }
    }
    turns++;
  }
  return {turnsToWin: 0, winSum: 0};
}

function boardWins(board: boolean[][]): boolean {
  for(let i = 0; i < 5; i++) {
    let rowCount = 0;
    let colCount = 0;
    for(let j = 0; j < 5; j++) {
      if(board[i][j]) {
        colCount++;
      }
      if(board[j][i]) {
        rowCount++;
      }
    }
    if(colCount === 5 || rowCount === 5) {
      return true;
    }
  }

  return false;
}

function calculateSum(board: { [key: string]: BoardNumber }, boardChecks: boolean[][]): number {
  let sum = 0;
  const keys = Object.keys(board);
  for(const key of keys){
    if(!boardChecks[board[key].row][board[key].col]) {
      sum += parseInt(key);
    }
  }
  return sum;
}