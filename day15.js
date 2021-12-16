const fs = require("fs")
const Graph = require("node-dijkstra")

const valuesArray = fs
  .readFileSync("./data/day15.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("").map((n) => +n))


const width = valuesArray[0].length
const height = valuesArray.length
console.log(height * width)

function fillGraph() {
  valuesArray.flat().forEach((value, index, values) => {
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

// const graph = generateGraph()

// let part1RiskLevel = 0

const route = new Graph()
fillGraph()
const path = route.path("0", `${height * width - 1}`, { cost: true })
console.log(path)
// function part1() {
//   // console.log(graph)
//   const

//   traverse(graph[0], [])
//   console.log(part1RiskLevel)
// }

// part1()
