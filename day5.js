const fs = require('fs');
const assert = require('assert');

const rawData = fs.readFileSync('./data/day5.txt', 'utf8').split('\n');

const data = rawData.reduce((acc, row) => {
  const entries = row.split(' -> ');
  acc.push(
    entries.reduce((acc2, item) => {
      nextItem = item.split(',').map((item) => parseInt(item));
      acc2.push({ x: nextItem[0], y: nextItem[1] });
      return acc2;
    }, [])
  );

  return acc;
}, []);

const gridWidth = Math.max.apply(
  Math,
  data.map((item) => {
    value = Math.max(item[0].x, item[1].x);
    return value + 1;
  })
);
const gridHeight = Math.max.apply(
  Math,
  data.map((item) => {
    value = Math.max(item[0].y, item[1].y);
    return value + 1;
  })
);

function fillGridPoints(isPart1) {
  const defaultRow = new Array(gridWidth).fill(0);
  const emptyGrid = new Array(gridHeight).fill(null);

  const grid = emptyGrid.map(() => {
    return JSON.parse(JSON.stringify(defaultRow));
  });
  // const grid = new Array(gridHeight).fill(new Array(rowLength));

  data.forEach((coordinates) => {
    const isDiagonal =
      coordinates[0].y !== coordinates[1].y &&
      coordinates[0].x !== coordinates[1].x;
    if (isPart1 && isDiagonal) {
      return;
    }

    const startingColumn = coordinates[0].x;
    const endingColumn = coordinates[1].x;
    const startingRow = coordinates[0].y;
    const endingRow = coordinates[1].y;
    const isLtR = startingColumn <= endingColumn;
    const isTtB = startingRow <= endingRow;
    for (
      let r = startingRow;
      isTtB ? r <= endingRow : r >= endingRow;
      isTtB ? r++ : r--
    ) {
      for (
        let c = startingColumn;
        isLtR ? c <= endingColumn : c >= endingColumn;
        isLtR ? c++ : c--
      ) {
        grid[r][c] = grid[r][c] + 1;
        if (isDiagonal) {
          isTtB ? r++ : r--;
        }
      }
    }
  });
  return grid;
}

function calculateOverLappingPoints(grid) {
  return grid.reduce((acc, row) => {
    acc += row.reduce((acc2, point) => {
      return point > 1 ? (acc2 = acc2 + 1) : acc2;
    }, 0);
    return acc;
  }, 0);
}

const part1Grid = fillGridPoints(true);
const part1Answer = calculateOverLappingPoints(part1Grid);

const part2Grid = fillGridPoints();
const part2Answer = calculateOverLappingPoints(part2Grid);

console.log(part1Answer);
console.log(part2Answer);
