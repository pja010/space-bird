class Star {
  constructor(x, y, maxSize) {
    this.x = x
    this.y = y
    this.maxSize = maxSize
    this.color = color(0,0,0)
    this.size = 0
    
    this.init()
  }
  
  init() {
    this.createRandomSize()
    this.createRandomColor()
  }
  
  createRandomSize() {
    this.size = Math.random() * this.maxSize / 2 + this.maxSize / 2
  }
  
  createRandomColor() {
    const availableColors = [
      color(255, 247, 222),
      color(230, 255, 253),
      color(255, 255, 250)
    ]
    const randomIndex = Math.floor(Math.random() * availableColors.length)
    
    this.color = availableColors[randomIndex]
  }
  
  draw() {
    fill(this.color)
    ellipse(this.x, this.y, this.size, this.size)
  }  
}

class StarField {
  constructor(rowsRequiredForANewStar, numOfStarsPerRow, starSize, speed) {
    this.pixelRowsCount = 0
    this.rowsRequiredForANewStar = rowsRequiredForANewStar;
    this.numOfStarsPerRow = numOfStarsPerRow;
    this.starSize = starSize;
    this.speed = speed;
    this.stars = [];
  }

  createStar() {
    const star = new Star(
      Math.random() * width,
      1,
      this.starSize
    )
    this.stars.push(star)
  }

  createStars() {
    if (
      this.rowsRequiredForANewStar > 1 &&
      this.pixelRowsCount % this.rowsRequiredForANewStar == 0
    ) {
      this.createStar()
    } else if (this.rowsRequiredForANewStar > 1) {
      return
    }

    for (let i = 0; i < this.numOfStarsPerRow; i++) {
      this.createStar()
    }

  }

  cleanUpStars() {
    let newStarSet = [];
    for (let s of this.stars) {
      if (s.y <= height) {
        newStarSet.push(s)
      }
    }
    this.stars = newStarSet;
  }

  draw() {
    this.createStars()
    for (let s of this.stars) {
      s.draw()
      s.y += this.speed;
    }
    this.cleanUpStars()
    this.pixelRowsCount += this.speed
  }
}