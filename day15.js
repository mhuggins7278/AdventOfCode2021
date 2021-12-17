const fs = require("fs")
const Graph = require("node-dijkstra")

const valuesArray = fs
  .readFileSync("./data/day15.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("").map((n) => +n))

const width = valuesArray[0].length
const height = valuesArray.length

function fillGraph(array, route, dimensions) {
  const [height, width] = dimensions
  array.flat().forEach((value, index, values) => {
    children = {}
    //not left edge
    if (index % width > 0) {
      children[index - 1] = values[index - 1]
    }
    //not right edge
    if (index % width < width - 1) {
      children[index + 1] = values[index + 1]
    }
    //not top row
    if (index > width) {
      children[index - width] = values[index - width]
    }
    //not bottom row
    if (index < height * width - width) {
      children[index + width] = values[index + width]
    }
    route.addNode(`${index}`, children)
  })
}

function part1() {
  const route = new Graph()
  dimensions = [valuesArray.length, valuesArray[0].length]
  fillGraph(valuesArray, route, dimensions)
  const path = route.path("0", `${route.graph.size}`, { cost: true })
  console.log(path)
}

// part1()

function cloneGrid(grid, clonedGrids = []) {
  grid = grid.map((row) => {
    return row.map((item) => {
      return item === 9 ? 1 : item + 1
    })
  })
  clonedGrids.push(grid)
  if (clonedGrids.length === 5) {
    return clonedGrids
  }
  return cloneGrid(grid, clonedGrids)
}

function appendRight(baseGrid, clonedGrids) {
  baseGrid = baseGrid.map((row, index) => {
    for (let i = 0; i < clonedGrids.length - 1; i++) {
      row = [...row, ...clonedGrids[i][index]]
    }
    return row
  })
  return baseGrid
}
function duplicateDown(grid, clonedGrids) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < height; j++) {
      newRow = grid[j].map((item) => {
        newValue = item + i + 1
        return newValue > 9 ? newValue - 9 : newValue
      })
      grid = [...grid, newRow]
    }
  }
  return grid
}

function part2() {
  const baseGrid = [...valuesArray]
  const clonedGrids = cloneGrid(baseGrid)
  let mergedGrid = appendRight(baseGrid, clonedGrids)
  mergedGrid = duplicateDown(mergedGrid, clonedGrids)
  dimensions = [mergedGrid.length, mergedGrid[0].length]
  const route2 = new Graph()
  fillGraph(mergedGrid, route2, dimensions)
  const path2 = route2.path("0", `${route2.graph.size - 1}`, { cost: true, reverse: true })
  console.log(path2)
}

part2()
