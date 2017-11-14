
const utils = {
  getRandom: (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
}

let wrapper = document.getElementById('wrapper');
const KEY_CODES = {
  SPACE: 32
}
const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 500;


class Game {
  constructor(myCanvasId) {
    let canvas = document.getElementById(myCanvasId);
    canvas.style.margin = 'auto';
    canvas.style.border = '#000 1px solid';
    this.ctx = canvas.getContext('2d');
    this.ctx.font = "bold 45px Arial";
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000"
    this.bgX = 0;
    this.dxBg = 1;
    this.bgimg = new Image();
    this.bgimg.style.width = CANVAS_WIDTH+'px';
    this.bgimg.style.height = '500px';
    this.bgimg.src = 'images/background.png';

    let startButton = new Image();
    startButton.src = "images/start.png";

    startButton.onclick = () => {
      this.reset();
      this.init();
    }



    this.bgimg.onload = () => {
      // this.bgimg.src = '';

      this.ctx.clearRect(0, 0, canvas.height, canvas.width);
      this.ctx.drawImage(this.bgimg, this.bgX, 0, this.bgimg.width, this.bgimg.height);
      this.ctx.drawImage(startButton,230,150,200,112.5);
      this.ctx.fillText("Press Space To Begin...",100,108)
      this.ctx.strokeText("Press Space To Begin...",100,108)


      // console.log(this.bgimg);

    }
    this.isStarted = false;
    this.bestScore = 0;

    this.resetButton = new Image();
    this.resetButton.src = "images/restart.png";


    this.resetButton.onclick = () => {


      this.reset();

      this.init();

    }


    this.gameOverImage = new Image();
    this.gameOverImage.src = 'images/score.png';

    this.obstacles = [];
  }

  init() {
    this.isStarted = true;

    this.bird = new Bird(this.ctx);
    wrapper.appendChild(this.resetButton);

    this.score = 0;
    let loopCounter = 0;

    this.drawLoop = setInterval(() => {
      this.draw();

      if (loopCounter % 200 === 0) {
        let obstacle = new Obstacle(this.ctx, this.dxBg);
        this.obstacles.push(obstacle);
      }

      if (this.bird.y >= 370) {
        clearInterval(this.drawLoop);
        this.over();
      }
      loopCounter++;
    }, 10);

  }

  draw() {
    this.drawBackground();
    this.bird.moveDown();
    this.bird.drawBird(this.ctx);
    this.obstacles.forEach((obstacle) => {
      obstacle.updatePosition();
      this.checkCollision(obstacle);
      obstacle.drawObstacle();
      if (obstacle.x < 125 && !obstacle.isCrossed) {
        this.score += 1;
        obstacle.isCrossed = true;
      }
    })
    this.ctx.strokeText(this.score,15,40)

    this.ctx.fillText(this.score,15,40);
    if (this.obstacles.length > 0 && this.obstacles[0].x < -70) this.obstacles.splice(0, 1);
    // console.log(this.obstacles);
  }

  checkCollision(obstacle) {
    if (this.bird.x + this.bird.img.width > obstacle.x && this.bird.y < obstacle.y + 294 && this.bird.x < obstacle.x + 66 || this.bird.x + this.bird.img.width > obstacle.x && this.bird.y + this.bird.img.height > obstacle.y + 416 && this.bird.x < obstacle.x + 66) {
      console.log('over');

      clearInterval(this.drawLoop);
      this.over();
    }
  }

  drawBackground() {
    this.bgX -= this.dxBg;
    this.ctx.clearRect(0, 0, this.ctx.canvas.height, this.ctx.canvas.width);
    this.ctx.drawImage(this.bgimg, this.bgX, 0, this.bgimg.width, this.bgimg.height);

    if (this.bgX <= 0) this.ctx.drawImage(this.bgimg, this.bgX + this.bgimg.width, 0, this.bgimg.width, this.bgimg.height);

    if (this.bgX <= -(this.bgimg.width)) this.bgX = 0;
    // console.log(this.bgimg);

  }
  over() {
    this.isStarted = false;
    clearInterval(this.drawLoop);
     this.ctx.drawImage(this.gameOverImage,250,125,this.gameOverImage.width,this.gameOverImage.height);
     this.ctx.fillText(this.score,325,230);

     this.ctx.strokeText(this.score,325,230)
     if(this.bestScore < this.score) this.bestScore = this.score;
     this.ctx.fillText(this.bestScore,325,320);
     this.ctx.strokeText(this.bestScore,325,320)
     this.ctx.fillText("Press Space To Restart...",100,400)

     this.ctx.strokeText("Press Space To Restart...",100,400)

  }
  reset() {
    this.bird = null;

    clearInterval(this.drawLoop);

    this.obstacles = [];
    wrapper.children[1] == this.resetButton && wrapper.removeChild(this.resetButton);
  }
}

class Bird {
  constructor(ctx) {
    this.x = ctx.canvas.width / 2 - 200;
    this.y = 200;
    this.dy = 0.5;
    this.img = new Image();
    this.img.src = 'images/bird.png';
    this.img.style.width = '40px';
    this.img.style.height = '30px';
    this.img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.width);
      // console.log(this.img);
      ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    }
    this.ctx = ctx;
  }
  moveDown() {
    // this.img.src = 'images/birdDown.png';
    // this.img.onload = () => {
    this.y += this.dy;
    this.dy = this.dy * 1.07;
    // }
  }

  moveUp() {
    // this.img.src = 'images/birdUp.png';
    // this.img.onload = () => {
    this.y -= 30;
    this.dy = 0.5;
    // }
  }

  drawBird() {
    // console.log(this.y);
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
  }
}

class Obstacle {
  constructor(ctx, dx) {
    this.img = document.createElement('img');
    this.img.src = 'images/obstacle.png';
    this.dx = dx;
    this.ctx = ctx;
    this.isCrossed = false;
    this.img.onload = () => {
      this.y = utils.getRandom(-180, -10);
      this.x = 700;
      this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }
  }

  drawObstacle() {
    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
  }

  updatePosition() {
    this.x -= this.dx;
  }
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
      case KEY_CODES.SPACE:
      if (game.isStarted) {
        // game.drawBackground();
        game.bird.moveUp();

        break;
    }
    else {
        game.reset();
        game.init();
    }

  }
};

let game = new Game('myCanvas');
