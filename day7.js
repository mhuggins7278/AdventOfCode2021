const assert = require('assert');
const fs = require('fs');

const positions = new Map();

const rawData = fs
  .readFileSync('./data/day7.txt', 'utf8')
  .split('\n')[0]
  .split(',')
  .map(Number);

const maxPosition = Math.max.apply(Math, rawData);

for (let i = 0; i <= maxPosition; i++) {
  count = rawData.filter((item) => +item === i).length;
  positions.set(i, count);
}

function calculateCostForStep(numSteps) {
  if (numSteps === 0) return numSteps;
  return (numSteps * (numSteps + 1)) / 2;
}

function calculateFuelCostsByPosition(progressiveFuelCost) {
  const fuelCosts = new Map();
  [...positions.keys()].forEach((destination) => {
    const fuelCost = [...positions.entries()].reduce((acc, entry) => {
      const starPosition = entry[0];
      const numCrabs = entry[1];
      const numSteps = Math.abs(starPosition - destination);
      let costPerCrab = progressiveFuelCost
        ? calculateCostForStep(numSteps)
        : numSteps;
      acc = acc + costPerCrab * numCrabs;
      return acc;
    }, 0);
    fuelCosts.set(destination, fuelCost);
  });
  return fuelCosts;
}

function getAnswerForPart(fuelCosts) {
  return [...fuelCosts.values()].reduce((acc, fuelCost) => {
    return acc ? (acc < fuelCost ? acc : fuelCost) : fuelCost;
  }, undefined);
}

const part1FuelCosts = calculateFuelCostsByPosition(false);

console.log(`Part 1 answer: ${getAnswerForPart(part1FuelCosts)}`);

const part2FuelCosts = calculateFuelCostsByPosition(true);

console.log(`Part 2 answer: ${getAnswerForPart(part2FuelCosts)}`);
