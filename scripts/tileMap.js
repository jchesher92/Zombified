import Jeff from './jeff.js'
import Zombie from './zombie.js'
import movingDirection from './movingDirection.js'

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize

    this.potion = new Image()
    this.potion.src = 'images/grass-tile-potion.png'

    this.emptyTile = new Image()
    this.emptyTile.src = 'images/grass-tile.png'

    this.bigPotion = new Image()
    this.bigPotion.src = 'images/grass-tile-powerPotion.png'

    this.powerPotion = this.bigPotion
    this.powerPotionAnimationDefault = 45
    this.powerPotionAnimationTimer = this.powerPotionAnimationDefault

    this.wall = new Image()
    this.wall.src = "images/darkBrick3.png"
  }

  // 0 - potions
  // 1 - wall
  // 4 - jeff
  // 5 - empty space
  // 6 - zombie
  // 7 - power potion
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 7, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 7, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 6, 6, 6, 6, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 7, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 7, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  

  draw(context) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column]
        if (tile === 1) {
          this.#drawWall(context, column, row, this.tileSize)
        } else if (tile === 0) {
          this.#drawPotion(context, column, row, this.tileSize)
        } else if (tile === 7) {
          this.#drawPowerPotion(context, column, row, this.tileSize)
        } else {
          this.#drawBlank(context, column, row, this.tileSize)
        }
      }
    }
  }

  #drawWall(context, column, row, size) {
    context.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size
    )
  }

  #drawPotion(context, column, row, size) {
    context.drawImage(this.potion, column * this.tileSize, row * this.tileSize, size, size)
  }

  #drawPowerPotion(context, column, row, size) {
    context.drawImage(this.bigPotion, column * this.tileSize, row * this.tileSize, size, size)
  }

  #drawBlank(context, column, row, size) {
    context.drawImage(this.emptyTile, column * this.tileSize, row * this.tileSize, size, size)
  }

  getJeff(velocity, lives) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column]
        if (tile === 4) {
          this.map[row][column] = 0
          return new Jeff(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this, lives)
        }
      }
    }
  }

  getZombies(velocity) {
    const zombies = []

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column]
        if (tile === 6) {
          this.map[row][column] = 5
          zombies.push(new Zombie(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
        }
      }
    }
    return zombies
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize
    canvas.height = this.map.length * this.tileSize
  }

  didWallCollide(x, y, direction) {
    if (direction === null) {
      return
    }

    if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)) {
      let column = 0
      let row = 0
      let nextColumn = 0
      let nextRow = 0

      switch (direction) {
        case movingDirection.right:
          nextColumn = x + this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break
        case movingDirection.left:
          nextColumn = x - this.tileSize
          column = nextColumn / this.tileSize
          row = y / this.tileSize
          break
        case movingDirection.up:
          nextRow = y - this.tileSize
          column = x / this.tileSize
          row = nextRow / this.tileSize
          break
        case movingDirection.down:
          nextRow = y + this.tileSize
          column = x / this.tileSize
          row = nextRow / this.tileSize
          break 
      }
      const tile = this.map[row][column]
      if (tile === 1) {
        return true
      }
    }
    return false
  } 

  didWin() {
    return this.#potionsLeft() === 0
  }

  #potionsLeft() {
    return this.map.flat().filter(tile => tile === 0).length
  }

  pickupPotion(x, y) {
    const row = y / this.tileSize
    const column = x / this.tileSize
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 0) {
        this.map[row][column] = 5
        return true
      }
    }
    return false
  }

  pickupPowerPotion(x, y) {
    const row = y / this.tileSize
    const column = x / this.tileSize
    if (Number.isInteger(row) && Number.isInteger(column)) {
      const tile = this.map[row][column]
      if (tile === 7 ) {
        this.map[row][column] = 5
        return true
      }
    }
    return false
  }
}



