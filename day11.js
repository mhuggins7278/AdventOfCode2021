const fs = require("fs")
const parsedData = fs
  .readFileSync("./data/day11.txt", "utf8")
  .split("\n")
  .join("")
  .split("")
  .flat()
  .map(Number)

const width = 10

function getSquidPosition(index) {
  const isLeftEdge = index % width === 0
  //check if the position is in the last column
  const isRightEdge = index % width === width - 1
  //check if the position is in the top row.
  //our id's are based on the array index.
  const isTopRow = index < width
  //check if the position is in the bottom row
  //for a 10x10 grid the first positions in the last row will be 90-99
  //our 10x10-10 === 90
  const isBottomRow = index >= width * width - width

  return { isLeftEdge, isRightEdge, isTopRow, isBottomRow }
}

function step1(data) {
  return data.forEach((squid, index) => {
    data[index] = squid + 1
  })
}
function step2(data, totalFlashes, flashedThisStep) {
  let flashedThisRound = false
  for (const [index, charge] of data.entries()) {
    const { isLeftEdge, isRightEdge, isTopRow, isBottomRow } = getSquidPosition(index)
    if (charge > 9 && !flashedThisStep.includes(index)) {
      totalFlashes = totalFlashes + 1
      flashedThisStep.push(index)
      flashedThisRound = true
      if (!isLeftEdge) {
        data[index - 1] = data[index - 1] + 1
      }
      if (!isRightEdge) {
        data[index + 1] = data[index + 1] + 1
      }
      if (!isTopRow) {
        data[index - width] = data[index - width] + 1
      }
      if (!isBottomRow) {
        data[index + width] = data[index + width] + 1
      }
      if (!isTopRow && !isRightEdge) {
        data[index + 1 - width] = data[index + 1 - width] + 1
      }
      if (!isTopRow && !isLeftEdge) {
        data[index - 1 - width] = data[index - 1 - width] + 1
      }
      if (!isBottomRow && !isLeftEdge) {
        data[index - 1 + width] = data[index - 1 + width] + 1
      }
      if (!isBottomRow && !isRightEdge) {
        data[index + 1 + width] = data[index + 1 + width] + 1
      }
    }
  }
  if (!flashedThisRound) {
    return flashedThisStep
  }
  return step2(data, totalFlashes, flashedThisStep)
}

function part1() {
  let totalFlashes = 0
  let part1Data = [...parsedData]
  for (let i = 0; i < 100; i++) {
    step1(part1Data)
    flashedThisStep = step2(part1Data, totalFlashes, [])
    totalFlashes += flashedThisStep.length

    flashedThisStep.forEach((index) => (part1Data[index] = 0))
  }
  console.log(`Part 1: ${totalFlashes}`)
}
part1()

function part2() {
  let synchronized = false
  let i = 0
  let part2Data = [...parsedData]
  let totalFlashes = 0
  while (!synchronized) {
    i++
    step1(part2Data)
    flashedThisStep = step2(part2Data, totalFlashes, [])

    flashedThisStep.forEach((index) => (part2Data[index] = 0))
    if (part2Data.every((d) => d === 0)) {
      console.log(`Part 2: ${i}`)
      synchronized = true
    }
  }
}

part2()
