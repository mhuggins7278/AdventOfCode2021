const fs = require('fs');
const assert = require('assert');

const rawData = fs.readFileSync('./data/day4.txt', 'utf8').split('\n');

const numbers = rawData
  .splice(0, 1)[0]
  .split(',')
  .map((item) => parseInt(item));

const boards = new Map();
const winningScores = [];
const calledNumbers = numbers.splice(0, 5);

const filteredData = rawData.filter((line) => line.length > 0);

function generateBoards() {
  let iteration = 0;
  while (filteredData.length >= 5) {
    const rows = filteredData.splice(0, 5);
    const board = rows.map((row) => {
      return row
        .split(' ')
        .filter((item) => item.length > 0)
        .map((item) => parseInt(item));
    });
    boards.set(iteration, board);
    iteration++;
  }
}

function sumUnMarkedNumbers(board) {
  return board.reduce((acc, row) => {
    row.forEach((square) => {
      if (!calledNumbers.includes(square)) {
        acc += square;
      }
    });
    return acc;
  }, 0);
}

function checkForWinners() {
  boards.forEach((board, key) => {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns.push(board.map((row) => row[i]));
    }
    for (var row of [...board, ...columns]) {
      if (row.every((item) => calledNumbers.includes(item))) {
        // sumOfUnMarkedNumbers = sumUnMarkedNumbers(board);
        winningScores.push(sumUnMarkedNumbers(board) * calledNumbers.at(-1));
        //Don't check anymore rows on this board
        boards.delete(key);
        break;
      }
    }
  });

  if (numbers.length && boards.size) {
    calledNumbers.push(numbers.splice(0, 1)[0]);
    return checkForWinners();
  }
}

generateBoards(filteredData);

checkForWinners();

console.log(`part1answer: ${winningScores[0]}`);

console.log(`part2answer: ${winningScores.at(-1)}`);
