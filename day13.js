const fs = require("fs")

const coordinates = []
folds = []

fs.readFileSync("./data/day13.txt", "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    if (Number(line[0]) || line[0] === "0") {
      const [x, y] = line.trim().split(",")
      coordinates.push([+x, +y])
    } else {
      const [axis, position] = line.split(" ")[2].split("=")
      folds.push([axis, Number(position)])
    }
  })

const dimensions = coordinates.reduce(
  (acc, c) => {
    const [x, y] = [...c]

    if (x + 1 > acc["x"]) {
      acc["x"] = x + 1
    }
    if (y + 1 > acc["y"]) {
      acc["y"] = y + 1
    }
    return acc
  },
  {x: 0, y: 0}
)

const defaultRow = new Array(dimensions["x"]).fill(0)
const paper = new Array(dimensions["y"])

for (let i = 0; i < paper.length; i++) {
  paper[i] = [...defaultRow]
}

coordinates.forEach((c) => {
  const [x, y] = [...c]
  paper[y][x] = 1
})

function foldOnX(paper, foldPosition) {
  const {leftSide, rightSide} = paper.reduce(
    (acc, line) => {
      acc.leftSide.push(line.slice(0, foldPosition).reverse())
      acc.rightSide.push(line.slice(foldPosition + 1))
      return acc
    },
    {leftSide: [], rightSide: []}
  )
  return rightSide.map((line, lineIndex) => {
    return line.map((value, columnIndex) => {
      return value || leftSide[lineIndex][columnIndex]
    })
  })
}
function foldOnY(paper, foldPosition) {
  const topHalf = paper.slice(0, foldPosition)
  const bottomHalf = paper.slice(foldPosition + 1).reverse()

  return topHalf.map((line, lineIndex) => {
    return (mergedLine = line.map((value, columnIndex) => {
      return value || bottomHalf[lineIndex][columnIndex]
    }))
  })
}

function part1() {
  let localPaper = JSON.parse(JSON.stringify(paper))
  localPaper = foldOnX(localPaper, 655)
  const visibleDots = localPaper.reduce((acc, line) => {
    acc = acc + line.filter((i) => i > 0).length
    return acc
  }, 0)
  console.log(`Part1: ${visibleDots}`)
}
part1()


function part2() {
  let localPaper = JSON.parse(JSON.stringify(paper))
  folds.forEach(fold => {
    [foldAxis, position] = [...fold]
    switch (foldAxis){
      case 'x':
        localPaper = foldOnX(localPaper, position)
        break;
      case 'y':
        localPaper = foldOnY(localPaper, position)
        break;
    }
  })


  const output = localPaper.map(row => row.map(item => item > 0 ? '#' : '.' ).reverse()).join('\n')
  console.log(output)

}

part2()
