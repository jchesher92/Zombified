import movingDirection from './movingDirection.js'

export default class Jeff {
  constructor(x, y, tileSize, velocity, tileMap, lives) {
    this.x = x
    this.y = y
    this.tileSize = tileSize
    this.velocity = velocity
    this.tileMap = tileMap
    this.lives = lives

    this.currentMovingDirection = null
    this.requestedMovingDirection = null

    this.jeffAnimationTimerDefault = 10
    this.jeffAnimationTimer = null

    this.jeffRotation = this.Rotation.right
    this.wakaSound = new Audio('./sounds/waka.wav')

    

    this.powerPotionSound1 = new Audio('./sounds/power_dot.wav')
    this.powerPotionSound2 = new Audio('./sounds/zombie-growl-3-6863.mp3')
    this.powerPotionActive = false
    this.powerPotionAboutToExpire = false
    this.timers = []

    this.defeatZombieSound1 = new Audio('./sounds/eat_ghost.wav')
    this.defeatZombieSound2 = new Audio('./sounds/zombie-6851.mp3')

    this.madeFirstMove = false

    document.addEventListener('keydown', this.#keydown)

    this.#loadJeffImages()
  }

  Rotation = {
    right: 0,
    down: 0,
    left: -1,
    up: 0
  }


  draw(context, pause, zombies) {
    if (!pause) {
      this.#move()
      this.#animate()
    }
    
    this.#pickupPotion()
    this.#pickupPowerPotion()
    this.#defeatZombie(zombies)

    const size = this.tileSize / 2

    

    context.save()
    context.scale(1 * (this.jeffRotation * 2 + 1), 1)
    context.translate(this.x * (this.jeffRotation * 2 + 1) + size * (this.jeffRotation * 2 + 1), this.y + size)
    

    if (this.currentMovingDirection === movingDirection.up) {
      context.drawImage(this.jeffWalkUpImages[this.jeffImageIndex], -size, -size, this.tileSize, this.tileSize)
    } else {
      context.drawImage(this.jeffImages[this.jeffImageIndex], -size, -size, this.tileSize, this.tileSize)
    }
    
    context.restore()

  }

  #keydown = (event) => {
    // up
    if (event.keyCode === 38) {
      if (this.currentMovingDirection === movingDirection.down) 
        this.currentMovingDirection = movingDirection.up
      this.requestedMovingDirection = movingDirection.up
      this.madeFirstMove = true
    }
    // down
    if (event.keyCode === 40) {
      if(this.currentMovingDirection === movingDirection.up) 
        this.currentMovingDirection = movingDirection.down
      this.requestedMovingDirection = movingDirection.down
      this.madeFirstMove = true
    }
    // left
    if (event.keyCode === 37) {
      if(this.currentMovingDirection === movingDirection.right) 
        this.currentMovingDirection = movingDirection.left
      this.requestedMovingDirection = movingDirection.left
      this.madeFirstMove = true
    }
    // right
    if (event.keyCode === 39) {
      if(this.currentMovingDirection === movingDirection.left) 
        this.currentMovingDirection = movingDirection.right
      this.requestedMovingDirection = movingDirection.right
      this.madeFirstMove = true
    }
  }

  #loadJeffImages() {
    const jeffImage1 = new Image()
    jeffImage1.src = 'images/julesFrame1.png'

    const jeffImage2 = new Image()
    jeffImage2.src = 'images/jules-frame-2.png'

    const jeffImage3 = new Image()
    jeffImage3.src = 'images/jules-frame-3.png'
    
    const jeffImage4 = new Image()
    jeffImage4.src = 'images/jules-frame-4.png'

    const jeffImage5 = new Image()
    jeffImage5.src = 'images/jules-frame-5.png'

    const jeffImage6 = new Image()
    jeffImage6.src = 'images/jules-frame-6.png'

    this.jeffImages = [
      jeffImage1,
      jeffImage2,
      jeffImage3,
      jeffImage4,
      jeffImage5,
      jeffImage6
    ]

    const jeffWalkUp1 = new Image()
    jeffWalkUp1.src = 'images/project/frame_0_delay-0.1s.png'

    const jeffWalkUp2 = new Image()
    jeffWalkUp2.src = 'images/project/frame_2_delay-0.1s.png'

    const jeffWalkUp3 = new Image()
    jeffWalkUp3.src = 'images/project/frame_3_delay-0.1s.png'
    
    const jeffWalkUp4 = new Image()
    jeffWalkUp4.src = 'images/project/frame_4_delay-0.1s.png'

    const jeffWalkUp5 = new Image()
    jeffWalkUp5.src = 'images/project/frame_5_delay-0.1s.png'

    const jeffWalkUp6 = new Image()
    jeffWalkUp6.src = 'images/project/frame_6_delay-0.1s.png'

    this.jeffWalkUpImages = [
      jeffWalkUp1,
      jeffWalkUp2,
      jeffWalkUp3,
      jeffWalkUp4,
      jeffWalkUp5,
      jeffWalkUp6
    ]

    this.jeffImageIndex = 0

  }

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if ( Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
        if (!this.tileMap.didWallCollide(this.x, this.y, this.requestedMovingDirection))
        this.currentMovingDirection = this.requestedMovingDirection
      }
    }

    if (this.tileMap.didWallCollide(this.x, this.y, this.currentMovingDirection)) {
      this.jeffAnimationTimer = null;
      this.jeffImageIndex = 1;
      return
    } else if (this.currentMovingDirection !== null && this.jeffAnimationTimer === null) {
      this.jeffAnimationTimer = this.jeffAnimationTimerDefault
    }


    switch (this.currentMovingDirection) {
      case movingDirection.up:
        this.y -= this.velocity
        this.jeffRotation = this.Rotation.up
        break
      case movingDirection.down:
        this.y += this.velocity
        this.jeffRotation = this.Rotation.down
        break
      case movingDirection.left:
        this.x -= this.velocity
        this.jeffRotation = this.Rotation.left
        break
      case movingDirection.right:
        this.x += this.velocity
        this.jeffRotation = this.Rotation.right
        break
    }
  }

  #animate() {
    if(this.jeffAnimationTimer === null) {
      return
    }
    this.jeffAnimationTimer--
    if (this.jeffAnimationTimer === 0){
      this.jeffAnimationTimer = this.jeffAnimationTimerDefault
      this.jeffImageIndex++
      if(this.jeffImageIndex === this.jeffImages.length) {
        this.jeffImageIndex = 0
      }
    }
  }

  #pickupPotion() {
    if (this.tileMap.pickupPotion(this.x, this.y) && this.madeFirstMove) {
      // play sound
      this.wakaSound.play()
    }
  }

  #pickupPowerPotion() {
    if (this.tileMap.pickupPowerPotion(this.x, this.y)) {
      this.powerPotionSound1.play();
      this.powerPotionSound2.play();
      this.powerPotionActive = true;
      this.powerPotionAboutToExpire = false;
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];

      let powerPotionTimer = setTimeout(() => {
        this.powerPotionActive = false;
        this.powerPotionAboutToExpire = false;
      }, 1000 * 6);

      this.timers.push(powerPotionTimer);

      let powerPotionAboutToExpireTimer = setTimeout(() => {
        this.powerPotionAboutToExpire = true;
      }, 1000 * 3);

      this.timers.push(powerPotionAboutToExpireTimer);
    }
  }

  #defeatZombie(zombies) {
    if (this.powerPotionActive) {
      const collideZombies = zombies.filter((zombie) => zombie.collideWith(this))
      collideZombies.forEach((zombie) => {
        zombies.splice(zombies.indexOf(zombie), 1)
        this.defeatZombieSound1.play()
        this.defeatZombieSound2.play()
      })
    }
  }


}

