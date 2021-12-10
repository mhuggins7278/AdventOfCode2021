const fs = require("fs")
const data = fs
  .readFileSync("./data/day9.txt", "utf8")
  .split("\n")
  .map((row) => row.split("").map((n) => +n))

const width = data[0].length - 1
const height = data.length - 1

function getLowPoints() {
  const lowPoints = []
  const lowPointCoordinates = []
  data.forEach((row, rowIndex) => {
    row.forEach((point, pointIndex) => {
      const adjacentPoints = getAdjacentPoints(rowIndex, pointIndex)
      const pointValues = Object.keys(adjacentPoints)
      if (pointValues.every((p) => p > point)) {
        lowPoints.push(point)
        lowPointCoordinates.push([rowIndex, pointIndex])
      }
    })
  })
  return { lowPoints, lowPointCoordinates }
}

function getAdjacentPoints(rowIndex, pointIndex) {
  const adjacentPoints = {}
  const { isLeftEdge, isRightEdge, isTopRow, isBottomRow } = getSquarePosition(rowIndex, pointIndex)

  //check the square to the left
  if (!isLeftEdge) {
    coordinates = [rowIndex, pointIndex - 1]
    point = data[coordinates[0]][coordinates[1]]
    adjacentPoints[point]
      ? adjacentPoints[point].push(coordinates)
      : (adjacentPoints[point] = [coordinates])
  }
  // check the square to the right
  if (!isRightEdge) {
    coordinates = [rowIndex, pointIndex + 1]
    point = data[coordinates[0]][coordinates[1]]
    adjacentPoints[point]
      ? adjacentPoints[point].push(coordinates)
      : (adjacentPoints[point] = [coordinates])
  }
  //check the square below
  if (!isBottomRow) {
    coordinates = [rowIndex + 1, pointIndex]
    point = data[coordinates[0]][coordinates[1]]
    adjacentPoints[point]
      ? adjacentPoints[point].push(coordinates)
      : (adjacentPoints[point] = [coordinates])
  }
  //check the square above the current square
  if (!isTopRow) {
    coordinates = [rowIndex - 1, pointIndex]
    point = data[coordinates[0]][coordinates[1]]
    adjacentPoints[point]
      ? adjacentPoints[point].push(coordinates)
      : (adjacentPoints[point] = [coordinates])
  }

  return adjacentPoints
}

function getBasinSize(pointsToCheck, basinSize = 0, checkedPoints = []) {
  for (const point of pointsToCheck) {
    const adjacentPoints = getAdjacentPoints(point[0], point[1])
    const filteredPoints = Object.fromEntries(
      Object.entries(adjacentPoints).filter(([point, positions]) => {
        positions = positions.filter((p) => !checkedPoints.includes(`${p.join("")}`))
        return positions.length >= 1 && +point !== 9
      })
    )
    for (const [point, positions] of Object.entries(filteredPoints)) {
      positions.forEach((position) => {
        if (!checkedPoints.includes(`${position.join("")}`)) {
          checkedPoints.push(`${position.join("")}`)
        }
      })
    }

    if (Object.keys(filteredPoints).length) {
      getBasinSize(Object.values(filteredPoints).flat(), basinSize, checkedPoints)
    }
  }
  return checkedPoints.length
}

function getBasins(coordinates) {
  const basins = []
  coordinates.forEach((position) => {
    basins.push(getBasinSize([position]))
  })
  return basins
}

function getSquarePosition(rowIdx, pointIdx) {
  //check if the square is in the first column
  const isLeftEdge = pointIdx === 0
  //check if the square is in the last column
  const isRightEdge = pointIdx === width
  //check if the square is in the top row.
  //our id's are based on the array index.
  const isTopRow = rowIdx === 0
  //check if the square is in the bottom row
  const isBottomRow = rowIdx === height
  return { isLeftEdge, isRightEdge, isTopRow, isBottomRow }
}

const { lowPoints, lowPointCoordinates } = getLowPoints()

const part1Answer = lowPoints.reduce((acc, point) => {
  acc += point + 1
  return acc
}, 0)
console.log(`Part 1: ${part1Answer}`)

const part2Answer = getBasins(lowPointCoordinates)
  .sort((a, b) => (a < b ? 1 : -1))
  .splice(0, 3)
  .reduce((acc, i) => i * acc, 1)
console.log(`Part 2: ${part2Answer}`)
