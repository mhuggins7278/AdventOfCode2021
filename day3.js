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

console.log(`part1 answer: ${gammaInt * epsilonInt}`);

// part2

const getMostFrequentCharAtIndex = (items, index) => {
  let counts = items.reduce((acc, item) => {
    const char = item.trim().charAt(index);
    if (acc[char]) {
      acc[char]++;
    } else {
      acc[char] = 1;
    }
    return acc;
  }, {});
  return counts[0] > counts[1] ? 0 : 1;
};

const filterRows = (rows, index, most) => {
  const mostFrequentChar = getMostFrequentCharAtIndex(rows, index);
  const filteredRows = rows.filter((row) => {
    if (most) {
      return parseInt(row.charAt(index), 2) === mostFrequentChar;
    } else {
      return parseInt(row.charAt(index), 2) !== mostFrequentChar;
    }
  });
  if (filteredRows.length == 1) {
    value = parseInt(filteredRows[0], 2);
    return value;
  }
  index = index + 1;
  return filterRows(filteredRows, index++, most);
};

const oxy_gen = filterRows(rows, 0, true);
const co2_scrub = filterRows(rows, 0, false);

ls_rating = oxy_gen * co2_scrub;

console.log(`part two answer: ${ls_rating}`);
