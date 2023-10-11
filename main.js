import './style.css'

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const $score = document.querySelector("span")

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HIGHT = 30
let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
]

const piece = {
  position: { x: 5, y: 5},
  shape: [
    [1, 1],
    [1, 1]
  ]
}

const pieces = [
  [
    [1, 1],
    [1, 1]
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [
    [1],
    [1],
    [1],
    [1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
]

const collisionButtom = () => {
  if(checkCollision()) {
    piece.position.y--
    solidifyPiece()
    removeRows()
  }
}

let dropCounter = 0 
let lastTime = 0

const update = (time = 0) => {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if(dropCounter > 500) { // velocidad de caida
    piece.position.y++
    dropCounter = 0
    collisionButtom()
  }

  draw()
  window.requestAnimationFrame(update)
}

const draw = () => {
  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1){
        context.fillStyle = "yellow"
        context.fillRect(x, y, 1, 1)
      } 
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value) {
        context.fillStyle = "red"
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })

  $score.innerText = score
}

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    piece.position.x--
    if(checkCollision()){
      piece.position.x++
    }
  }
  if (event.key === "ArrowRight") {
    piece.position.x++
    if(checkCollision()){
      piece.position.x--
    }
  }
    if (event.key === "ArrowDown") {
    piece.position.y++
    collisionButtom()
  }

     if (event.key === "ArrowUp") {
      const rotated = []
      
      for (let i = 0; i < piece.shape[0].length; i++ ) {
        const row = []
        for (let j = piece.shape.length - 1; j >= 0; j-- ) {
          row.push(piece.shape[j][i])
        }
        rotated.push(row)
      }
      const previousPiece = piece.shape
      piece.shape = rotated 
      if(checkCollision()) {  // funciona con las piezas pequeñas, no el palo largo
        piece.shape = previousPiece
        piece.position.x--
        piece.shape = rotated
        if(checkCollision()) { // vuelve a repetir la consulta de colision por el palo largo
          piece.shape = previousPiece
          piece.position.x =  piece.position.x - 2
          piece.shape = rotated
        }
      }
    }

})

const checkCollision = () => {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0 
      )
    })
  })
}

const solidifyPiece = () => {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  

  // reset position
  piece.position.y = 0
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2 )

  
  // random piece
  piece.shape = pieces[Math.floor(Math.random() * pieces.length)]

  // game over
  if (checkCollision()) {
    window.alert("Game over!!")
    board.forEach(row => row.fill(0))
  }

}

const removeRows = () => {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if(row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    score += 100 
  })


}


update()

