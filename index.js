const grid = document.querySelector(".grid")
const start = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }

}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === 9 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")

  )
    return clearInterval(timerId)

  const tail = currentSnake.pop()
  squares[tail].classList.remove("snake")
  currentSnake.unshift(currentSnake[0] + direction)

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple")
    squares[tail].classList.add("snake")
    currentSnake.push(tail)
    generateApples()
    score++
    scoreDisplay.textContent = score



  }


  squares[currentSnake[0]].classList.add("snake")

}
move()

let timerId = setInterval(move, 1000)

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains("snake"))
  squares[appleIndex].classList.add("apple")
}
generateApples()

function control(e) {
  if (e.keyCode === 38) {
    console.log("up")
    direction = -width
  } else if (e.keyCode === 37) {
    console.log("left")
    direction = -1
  } else if (e.keyCode === 40) {
    console.log("down")
    direction = +width
  } else if (e.keyCode === 39) {
    console.log("right")
    direction = 1
  }

}
document.addEventListener("keydown", control)