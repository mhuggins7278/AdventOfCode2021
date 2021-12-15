const fs = require("fs")

const rawData = fs.readFileSync("./data/day14.txt", "utf8").split("\n").filter(Boolean)

const polymerTemplate = rawData.splice(0, 1)[0]

const insertRules = new Map()

rawData.forEach((mapItem) => {
  const [pair, insertItem] = [...mapItem.split(" -> ")]
  insertRules.set(pair, insertItem)
})

function findPolymer(iterations) {
  let pairCounts = new Map()
  let template = polymerTemplate
  //get initial pair values
  let matches = []
  insertRules.forEach((value, key) => {
    console.log(key)
    const regex = new RegExp(`(?=(${key}))`, "g")
    matches = [...matches, [...template.matchAll(regex)]]
  })
  matches.flat().forEach((match) => {
    pairCounts.set(match[1], (pairCounts.get(match[1]) || 0) + 1)
  })

  for (let i = 0; i < iterations; i++) {
    let newPairs = new Map()
    pairCounts.forEach((count, pair) => {
      charToInsert = insertRules.get(pair)
      const [firstChar, secondChar] = pair.split("")
      const firstNewPair = `${firstChar}${charToInsert}`
      const secondNewPair = `${charToInsert}${secondChar}`
      newPairs.set(firstNewPair, (newPairs.get(firstNewPair) || 0) + count)
      newPairs.set(secondNewPair, (newPairs.get(secondNewPair) || 0) + count)
    })
    pairCounts = newPairs
  }
  const charCounts = [...pairCounts.entries()].reduce((acc, entry) => {
    const [pair, c] = [...entry]
    const [a, b] = [...pair.split("")]
    acc.set(a, (acc.get(a) || 0) + c)
    acc.set(b, (acc.get(b) || 0) + c)

    console.log(acc)
    return acc
  }, new Map())

  return [...charCounts.values()].sort((a, b) => b - a)
}

part1Counts = findPolymer(10)
console.log(`Part1: ${Math.ceil(part1Counts.at(0) / 2) - Math.ceil(part1Counts.at(-1) / 2)}`)
// console.log(`Part1: ${part1Counts.at(0) - part1Counts.at(-1)}`)

part2Counts = findPolymer(40)
console.log(`Part2: ${Math.ceil(part2Counts.at(0) / 2) - Math.ceil(part2Counts.at(-1) / 2)}`)
