import movingDirection from "./movingDirection.js"

export default class Zombie {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x
    this.y = y
    this.tileSize = tileSize
    this.velocity = velocity
    this.tileMap = tileMap

    this.#loadImages()

    this.movingDirection = Math.floor(Math.random() * Object.keys(movingDirection).length)

    this.directionTimerDefault = this.#random(10, 25)
    this.directionTimer = this.directionTimerDefault

    this.scaredAboutToExpireTimerDefault = 10
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
    
  }

  draw(context, pause, jeff) {
    if (!pause) {
      this.#move()
      this.#changeDirection()
    }
    this.#setImage(context, jeff)
  }

  collideWith(jeff) {
    const size = this.tileSize / 2
    if (this.x < jeff.x + size && this.x + size > jeff.x && this.y < jeff.y + size && this.y + size > jeff.y) {
      return true
    } else {
      return false
    }
  }

  #setImage(context, jeff) {
    // console.log(this.image)
    if (jeff.powerPotionActive) {
      this.#setImageWhenPowerPotionIsActive(jeff)
    } else {
      this.image = this.normalZombie
    }
    context.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
  }

  #setImageWhenPowerPotionIsActive(jeff) {
    if (jeff.powerPotionAboutToExpire) {
      this.scaredAboutToExpireTimer--
      if (this.scaredAboutToExpireTimer === 0) {
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault
        if (this.image === this.scaredZombie) {
          this.image = this.scaredZombie2
        } else {
          this.image = this.scaredZombie
        }
      }
    } else {
      this.image = this.scaredZombie
    }
  }

  #changeDirection(){
    this.directionTimer--
    let newMoveDirection = null
    if (this.directionTimer === 0) {
      this.directionTimer = this.directionTimerDefault
      newMoveDirection = Math.floor(Math.random() * Object.keys(movingDirection).length)
    }
    if (newMoveDirection !== null && this.movingDirection !== newMoveDirection) {
      if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
        if (!this.tileMap.didWallCollide(this.x, this.y, newMoveDirection)) {
          this.movingDirection = newMoveDirection
        }
      }
    }
  }

  #move() {
    if (!this.tileMap.didWallCollide(this.x, this.y, this.movingDirection)) {
      switch (this.movingDirection) {
        case movingDirection.up:
          this.y -= this.velocity
          break
        case movingDirection.down:
          this.y += this.velocity
          break
        case movingDirection.left:
          this.x -= this.velocity
          break
        case movingDirection.right:
          this.x += this.velocity
          break
      }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  #loadImages(){
    this.normalZombie = new Image()
    this.normalZombie.src = 'images/zombie.png'

    this.scaredZombie = new Image()
    this.scaredZombie.src = 'images/scaredZombie.png'

    this.scaredZombie2 = new Image()
    this.scaredZombie2.src = 'images/scaredZombie2.png'

    this.image = this.normalZombie
  }
}