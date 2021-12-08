const fs = require("fs")
const assert = require("assert")

const parsedData = fs
  .readFileSync("./data/day8.txt", "utf8")
  .split("\n")
  .map((line) => {
    return line.split(" | ").reduce((acc, item) => {
      acc.push(
        item
          .trim()
          .split(" ")
          .reduce((acc2, i) => {
            acc2.push(i.trim().split(""))
            return acc2
          }, [])
      )
      return acc
    }, [])
  })

function calculatePart2(data) {
  sum = 0
  data.forEach((row) => {
    function find(cond) {
      if (Number.isInteger(cond)) {
        const length = cond
        cond = (a) => a.length === length
      }
      const index = signals.findIndex(cond)
      return signals.splice(index, 1)[0]
    }

    const signals = [...row[0]]
    const output = [...row[1]]
    const decoderKey = {
      1: find(2),
      4: find(4),
      7: find(3),
      8: find(7),
    }
    decoderKey[9] = find((a) => decoderKey[4].every((b) => a.includes(b)))
    decoderKey[0] = find((a) => a.length === 6 && decoderKey[1].every((b) => a.includes(b)))
    decoderKey[6] = find(6)
    decoderKey[3] = find((a) => decoderKey[7].every((b) => a.includes(b)))
    decoderKey[2] = find((a) => decoderKey[4].filter((b) => a.includes(b)).length === 2)
    decoderKey[5] = find(5)

    const rowTotal = parseInt(
      output
        .reduce((acc, item) => {
          for (key of Object.keys(decoderKey)) {
            if (
              item.length == decoderKey[key].length &&
              item.every((a) => decoderKey[key].includes(a))
            ) {
              acc.push(key)
              break
            }
          }
          return acc
        }, [])
        .join("")
    )
    sum += rowTotal
  })
  return sum
}

const part1Output = parsedData.reduce((acc, row) => {
  acc += row[1].reduce((acc, outputItem) => {
    if ([2, 3, 4, 7].includes(outputItem.length)) {
      acc++
    }
    return acc
  }, 0)
  return acc
}, 0)

console.log(`Part 1 answer: ${part1Output}`)

const part2Output = calculatePart2([...parsedData])
console.log(part2Output)
// groupOutputNumbers([...part2Output])
