import TileMap from './tileMap.js'

const tileSize = 32
const velocity = 2
let lives = 3

const canvas = document.getElementById('gameCanvas')
const context = canvas.getContext('2d')
const tileMap = new TileMap(tileSize)
const jeff = tileMap.getJeff(velocity, lives)
const zombies = tileMap.getZombies(velocity)

let gameOver = false
let gameWin = false
const gameOverSound = new Audio('./sounds/growling-zombie-104988.mp3')
const gameWinSound = new Audio('./sounds/breeze-of-blood-122253.mp3')

function gameLoop() {
  tileMap.draw(context)
  drawGameEnd()
  jeff.draw(context, pause(), zombies)
  zombies.forEach((zombie) => zombie.draw(context, pause(), jeff))
  checkGameOver()
  checkGameWin()
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin()
    if (gameWin) {
      gameWinSound.play()
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver()
    if (gameOver) {
      gameOverSound.play()
    }
  }
}

function isGameOver() {
  return zombies.some(zombie => !jeff.powerPotionActive && zombie.collideWith(jeff))
}

function pause() {
  return !jeff.madeFirstMove || gameOver || gameWin
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = '     YOU WIN!'
    if (gameOver) {
      text = '      EATEN'
    }

    context.fillStyle = 'black'
    context.fillRect(0, canvas.height / 2.42, canvas.clientWidth, 140)

    context.font = '120px VT323'
    
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop('0', '#880808')

    context.fillStyle = gradient
    context.fillText(text, 10, canvas.height / 1.85)
    context.globalCompositeOperation='destination-over'
  }
}
tileMap.setCanvasSize(canvas)
setInterval(gameLoop, 1000 / 75)

