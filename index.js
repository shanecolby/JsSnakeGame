const grid = document.querySelector(".grid")
const start = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.7





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