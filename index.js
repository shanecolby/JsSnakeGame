const grid = document.querySelector(".grid")
const start = document.getElementById("start")
const score = document.getElementById("score")
let squares = []
let currentSnake = [2, 1, 0]

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div')
    console.log(square)
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
  console.log(squares)
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))