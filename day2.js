const fs = require('fs');

const moves = fs.readFileSync('./data/day2.txt', 'utf8').split('\n');

const values = moves.reduce(
  (acc, move) => {
    const [direction, value] = move.split(' ');
    switch (direction) {
      case 'forward':
        acc.horizontalDistance += parseInt(value);
        break;
      case 'up':
        acc.totalDepth -= parseInt(value);
        break;
      case 'down':
        acc.totalDepth += parseInt(value);
        break;
    }
    return acc;
  },
  { horizontalDistance: 0, totalDepth: 0 }
);

console.log(values.horizontalDistance * values.totalDepth);

//  part 2

let aim = 0;
let depth = 0;
let distance = 0;

const sampleMoves = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];

moves.map((move) => {
  const direction = move.split(' ')[0];
  const units = parseInt(move.split(' ')[1]);
  if (direction === 'forward') {
    distance += units;
    depth = depth + units * aim;
  }
  if (direction === 'up') {
    aim -= units;
  }
  if (direction === 'down') {
    aim += units;
  }
});

console.log(depth * distance);
