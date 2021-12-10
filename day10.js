const fs = require("fs")
const charMap = {
  ")": { inValidScore: 3, missingScore: 1, pair: "(" },
  "]": { inValidScore: 57, missingScore: 2, pair: "[" },
  "}": { inValidScore: 1197, missingScore: 3, pair: "{" },
  ">": { inValidScore: 25137, missingScore: 4, pair: "<" },
}
const closingChars = Object.keys(charMap)

const data = fs
  .readFileSync("./data/day10.txt", "utf8")
  .split("\n")
  .reduce(
    (acc, line) => {
      const open = []
      for (let i = 0; i < line.length; i++) {
        const char = line.charAt(i)
        //if it's opening char just push it into the array and continue if this isn't the last iteration
        if (!closingChars.includes(char)) {
          open.push(char)
          if (i < line.length - 1) continue
        }
        //if the string is invalid push it to the invalidLines array if it's not the last line
        if (open.at(-1) !== charMap[char]?.pair && i < line.length - 1) {
          acc["invalidLines"].push(char)
          break
        }
        if (i === line.length - 1) {
          if (closingChars.includes(char)) {
            open.pop()
          }
          open.reverse()
          acc["incompleteLines"].push([...open])
          break
        }
        open.pop()
      }
      return acc
    },
    { invalidLines: [], incompleteLines: [] }
  )

console.log(data)

part1Answer = data["invalidLines"].reduce((acc, char) => {
  acc += charMap[char].inValidScore
  return acc
}, 0)

part2Answer = data["incompleteLines"]
  .reduce((acc, chars) => {
    acc.push(
      chars.reduce((score, char) => {
        missingScore = Object.entries(charMap).reduce((acc, e) => {
          if (e[1].pair === char) {
            acc += e[1].missingScore
          }
          return acc
        }, 0)
        score = score * 5 + missingScore
        return score
      }, 0)
    )

    return acc
  }, [])
  .sort((a, b) => (a < b ? 1 : -1))[Math.floor(data["incompleteLines"].length / 2)]

console.log(`Part 1: ${part1Answer}`)
console.log(`Part 2: ${part2Answer}`)
