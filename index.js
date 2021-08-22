const grid = document.querySelector(".grid")
const startBtn = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const saveBtn = document.getElementById("saveBtn")
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0
let previousScore = []



function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {

  currentSnake.forEach(index => squares[index].classList.remove("snake"))

  squares[appleIndex].classList.remove("apple")
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000
  generateApples()
  currentSnake.forEach(index => squares[index].classList.add("snake"))

  timerId = setInterval(move, intervalTime)

}


function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === 9 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return scoreDisplay.textContent = "You LOSE!", clearInterval(timerId)

  // initiates movement of the snake. removes last box and stlying and adds box to the end
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
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }
  squares[currentSnake[0]].classList.add("snake")
}
move()


function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains("snake"))
  squares[appleIndex].classList.add("apple")
}
generateApples()

function control(e) {
  if (e.keyCode === 38) {
    direction = -width
  } else if (e.keyCode === 37) {
    direction = -1
  } else if (e.keyCode === 40) {
    direction = +width
  } else if (e.keyCode === 39) {
    direction = 1
  }
}


document.addEventListener("keydown", control)
startBtn.addEventListener("click", startGame)
