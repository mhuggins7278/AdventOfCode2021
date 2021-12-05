const fs = require('fs');
const assert = require('assert');

const rawData = fs.readFileSync('./data/day4.test', 'utf8').split('\n');

const numbers = rawData
  .splice(0, 1)[0]
  .split(',')
  .map((item) => parseInt(item));

console.log(numbers.slice(-1));

const boards = [];

const filteredData = rawData.filter((line) => line.length > 0);

function generateBoards(filteredData) {
  const rows = filteredData.splice(0, 5);
  const board = rows.map((row) => {
    return row
      .split(' ')
      .filter((item) => item.length > 0)
      .map((item) => parseInt(item));
  });
  boards.push(board);

  if (filteredData.length >= 5) {
    generateBoards(filteredData);
  }
}

function checkForWin(calledNumbers) {
  sumOfUnMarkedNumbers = null;

  calledNumbers;
  for (var board of boards) {
    // check each row in the board for a win
    for (var row of board) {
      if (row.every((item) => calledNumbers.includes(item))) {
        // console.log(`Win! ${row} ${calledNumbers.at(-1)}`);
        const sumOfUnMarkedNumbers = board.reduce((acc, curr) => {
          curr.forEach((square) => {
            if (!calledNumbers.includes(square)) {
              acc += square;
            }
          });
          return acc;
        }, 0);
        return sumOfUnMarkedNumbers * calledNumbers.at(-1);
        return;
      }
    }
    //check each column in the board for a win
    for (let i = 0; i < 5; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((item) => calledNumbers.includes(item))) {
        // console.log(`Win! ${column} ${calledNumbers.at(-1)}`);
        sumOfUnMarkedNumbers = board.reduce((acc, curr) => {
          curr.forEach((square) => {
            if (!calledNumbers.includes(square)) {
              acc += square;
            }
          });
          return acc;
        }, 0);
        return sumOfUnMarkedNumbers * calledNumbers.at(-1);
      }
    }
  }

  if (numbers.length > 0 && !sumOfUnMarkedNumbers) {
    const newNumbers = [...calledNumbers, numbers.splice(0, 1)[0]];
    return checkForWin(newNumbers);
  }
}

generateBoards(filteredData);
const part1answer = checkForWin(numbers.splice(0, 5));

console.log(part1answer);
