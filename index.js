const grid = document.querySelector(".grid")
const start = document.getElementById("start")
const score = document.getElementById("score")


function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div')
    console.log(square)
    square.classList.add('square')
    grid.appendChild(square)
  }
}
createGrid()