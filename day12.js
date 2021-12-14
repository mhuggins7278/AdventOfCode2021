const fs = require("fs")

const connections = new Map()
fs.readFileSync("./data/day12.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .forEach((connection) => {
    const [start, end] = connection.split("-")
    if (!connections.has(start)) {
      connections.set(start, [end])
    } else {
      connections.set(start, [...connections.get(start), ...[end]])
    }
    if (!connections.has(end)) {
      connections.set(end, [start])
    } else {
      connections.set(end, [...connections.get(end), ...[start]])
    }
  })

console.log(connections)

function isSmallCave(cave) {
  return cave === cave.toLowerCase()
}

function walkPaths(node, visited, paths, canVisitTwice, visitedTwice) {
  visited.push(node)
  if (node === "end") {
    paths.push(visited.join`,`)
    return
  }
  for (const adjacentCave of connections.get(node)) {
    if (adjacentCave === "start" && canVisitTwice) {
      continue
    }
    if (isSmallCave(adjacentCave) && visited.includes(adjacentCave)) {
      if (visitedTwice || !canVisitTwice) {
        continue
      }
      if (visited.filter((c) => c === adjacentCave).length >= 2) {
        continue
      }
      walkPaths(adjacentCave, [...visited], paths, canVisitTwice, true)
    } else {
      walkPaths(adjacentCave, [...visited], paths, canVisitTwice, visitedTwice)
    }
  }
}

function part1() {
  const validPaths1 = []
  walkPaths("start", [], validPaths1)
  console.log(`Part 1: ${validPaths1.flat().length}`)
}

part1()

function part2() {
  const validPaths2 = []
  walkPaths("start", [], validPaths2, true, false)
  console.log(`Part 2: ${validPaths2.flat().length}`)
}

part2()
