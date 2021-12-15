const fs = require("fs")

const rawData = fs.readFileSync("./data/day14.test", "utf8").split("\n").filter(Boolean)

const polymerTemplate = rawData.splice(0, 1)[0]

const insertRules = new Map()

rawData.forEach((mapItem) => {
  const [pair, insertItem] = [...mapItem.split(" -> ")]
  insertRules.set(pair, insertItem)
})

function findPolymer(iterations) {
  const
  let template = polymerTemplate
  for (let i = 0; i < iterations; i++) {
    console.log(template.length)
    console.log(i)
    let matches = []
    insertRules.forEach((value, key) => {
      const regex = new RegExp(`(?=(${key}))`, "g")
      matches = [...matches, [...template.matchAll(regex)]]
    })
    console.log(`gotmatches`)
    matches = matches.flat().sort((a, b) => a.index - b.index)
    templateArray = template.split()
    console.log(`arraySplit`)
    matches
      // .sort((a, b) => a.index - b.index)
      .forEach((match, indexCount) => {
        templateArray.splice(match.index + indexCount, 0, insertRules.get(match[1]))
        // template = `${template.substring(0, match.index + indexCount + 1)}${insertRules.get(
        //   match[1]
        // )}${template.substring(match.index + indexCount + 1)}`
      })
    console.log(`updated string array`)
    template = templateArray.join("")
    console.log("template joined back to string")
  }

  return [
    ...template
      .split("")
      .reduce((acc, letter) => {
        const currentCount = acc.get(letter)
        if (currentCount) {
          acc.set(letter, currentCount + 1)
        } else {
          acc.set(letter, 1)
        }
        return acc
      }, new Map())
      .values(),
  ].sort((a, b) => b - a)
}

// part1Counts = findPolymer(10)
// console.log(`Part1: ${part1Counts.at(0) - part1Counts.at(-1)}`)

part2Counts = findPolymer(40)
console.log(`Part2: ${part2Counts.at(0) - part2Counts.at(-1)}`)
