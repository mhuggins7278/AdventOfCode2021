const assert = require('assert');
const fs = require('fs');

const part1Days = 80;

const part2Days = 256;

const initialFish = fs
  .readFileSync('./data/day6.txt', 'utf8')
  .split('\n')[0]
  .split(',')
  .map(Number);

function modelFishReproduction(daysToModel) {
  let fishByAge = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  //add inputs to school
  initialFish.forEach((age) => fishByAge[age]++);
  //loop 256 days
  for (let day = 1; day <= daysToModel; day++) {
    let fishToSpawn = fishByAge[0];
    fishByAge[0] = fishByAge[1];
    fishByAge[1] = fishByAge[2];
    fishByAge[2] = fishByAge[3];
    fishByAge[3] = fishByAge[4];
    fishByAge[4] = fishByAge[5];
    fishByAge[5] = fishByAge[6];
    fishByAge[6] = fishByAge[7] + fishToSpawn;
    fishByAge[7] = fishByAge[8];
    fishByAge[8] = fishToSpawn;
  }
  //sum fish quantities after spawn period
  return Object.values(fishByAge).reduce((x, y) => x + y);
}

console.log(`part1 Answer ${modelFishReproduction(part1Days)}`);
console.log(`part1 Answer ${modelFishReproduction(part2Days)}`);
