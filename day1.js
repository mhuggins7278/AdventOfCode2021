const fs = require('fs');

const values = fs.readFileSync('./data/day1.txt', 'utf8').split('\n');

let previousValue = null;
const count = values.reduce((acc, next) => {
  if (previousValue) {
    if (parseInt(next) > parseInt(previousValue)) {
      acc++;
    }
  }
  previousValue = next;
  return acc;
}, 0);

count;

let previousChunkValue = null;
const chunkCount = values.reduce((acc, currentValue, index, origArray) => {
  if (origArray[index + 2]) {
    currentChunkValue =
      parseInt(currentValue) +
      parseInt(origArray[index + 1]) +
      parseInt(origArray[index + 2]);
    if (
      previousChunkValue &&
      parseInt(currentChunkValue) > parseInt(previousChunkValue)
    ) {
      acc++;
    }
    previousChunkValue = currentChunkValue;
  }
  return acc;
}, 0);

chunkCount;
