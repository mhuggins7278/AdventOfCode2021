const fs = require('fs');
const assert = require('assert');

const rows = fs.readFileSync('./data/day3.txt', 'utf8').split('\n');

const output = rows.reduce((acc, item, outerIndex) => {
  [...item].forEach((value, index) => {
    if (acc[index]) {
      if (acc[index][value]) {
        acc[index][value]++;
      } else {
        acc = { ...acc, [index]: { ...acc[index], [value]: 1 } };
      }
    } else {
      acc = { ...acc, [index]: { ...acc[index], [value]: 1 } };
    }
  });
  return acc;
}, {});

epsilon = [];
gamma = [];

Object.values(output).forEach((item, index) => {
  console.log(item, index);
  if (item['0'] > item['1']) {
    gamma.push(0);
    epsilon.push(1);
  } else {
    gamma.push(1);
    epsilon.push(0);
  }
});

epsilonInt = parseInt(epsilon.join(''), 2);
gammaInt = parseInt(gamma.join(''), 2);

console.log(gammaInt * epsilonInt);
