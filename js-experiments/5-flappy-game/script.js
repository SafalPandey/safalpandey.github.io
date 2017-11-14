let getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let wrapper = document.getElementById("wrapper");


class Game {
  constructor(myCanvasId) {
    let canvas = document.getElementById(myCanvasId);
    canvas.style.margin = "auto";
    canvas.style.border = "#000 1px solid";
    this.ctx = canvas.getContext("2d");
    this.bgX = 0;
    this.dxBg = 5;
    this.bgimg = new Image();
    this.bgimg.style.width = "650px";
    this.bgimg.style.height = "500px";
    this.bgimg.src = "images/background.png";
    // console.log(this.bgimg);
    this.bgimg.onload = () => {
      // this.bgimg.src = "";

      this.ctx.clearRect(0, 0, canvas.height, canvas.width);
      this.ctx.drawImage(this.bgimg, this.bgX, 0, this.bgimg.width, this.bgimg.height);
      // console.log(this.bgimg);

    }
    this.isStarted = false;

    this.resetButton = document.createElement('button');
    this.resetButton.style.border = 'none';
    this.resetButton.style.width = '70px';
    this.resetButton.style.height = '3em';
    this.resetButton.style.backgroundColor = 'yellow';
    this.resetButton.innerHTML = '<strong>Reset Game</strong>';
    // this.resetButton.style.position = 'absolute';
    this.resetButton.style.left = '0';
    this.resetButton.style.borderRadius = '10px';

    this.resetButton.onclick = () => {


      this.reset();

      this.init();

    }

    this.startGameDiv = document.createElement('div');
    this.startGameDiv.style.position = 'fixed';
    this.startGameDiv.style.left = '0';
    this.startGameDiv.style.top = '0';
    this.startGameDiv.style.width = '50%';
    this.startGameDiv.style.minWidth = '500px';
    // this.startGameDiv.style.height = '50vh';
    this.startGameDiv.style.left = '25%';
    this.startGameDiv.style.top = '20vh'
    this.startGameDiv.style.margin = 'auto';
    this.startGameDiv.style.padding = "0.5em 0";
    this.startGameDiv.innerHTML = 'Welcome to Flappy Bird!<br />';
    this.startGameDiv.style.backgroundColor = 'blue';
    this.startGameDiv.style.fontSize = '4.5em';
    this.startGameDiv.style.textAlign = 'center';
    this.startGameDiv.style.borderRadius = '15px';

    let startButton = this.resetButton.cloneNode(true);
    startButton.innerHTML = 'Begin Game';
    startButton.style.left = '45%';
    startButton.style.top = '50%';
    startButton.style.backgroundColor = 'green';
    startButton.style.fontSize = '20px';
    startButton.style.width = '100px';

    startButton.onclick = () => {


      this.reset();

      this.init();

    }


    this.startGameDiv.appendChild(startButton);

    wrapper.appendChild(this.startGameDiv);

    this.gameOver = document.createElement('div');
    this.gameOver.style.position = 'fixed';
    this.gameOver.style.left = '0';
    this.gameOver.style.top = '0';
    this.gameOver.style.width = '80%';
    this.gameOver.style.minWidth = '500px';
    this.gameOver.style.height = '50vh';
    this.gameOver.style.left = '10%';
    this.gameOver.style.top = '20vh'
    this.gameOver.innerHTML = 'Oops!<br /> GAME OVER!!!<br/>';
    this.gameOver.style.backgroundColor = 'yellow';
    this.gameOver.style.fontSize = '4.5em';
    this.gameOver.style.textAlign = 'center';
    this.gameOver.style.borderRadius = '15px';

    let restartButton = startButton.cloneNode(true);
    restartButton.innerHTML = 'Restart Game';
    restartButton.onclick = () => {
      this.reset();
      this.init();
    }

    this.gameOver.appendChild(restartButton);

    //
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
      if (loopCounter % 50 == 0) {

        let obstacle = new Obstacle(this.ctx, this.dxBg);
        this.obstacles.push(obstacle);

      }

      if (this.bird.y >= 370) {
        clearInterval(this.drawLoop);
        this.over();
      }
      loopCounter++;
    }, 25);

  }

  draw() {
    this.drawBackground();
    this.bird.moveDown();
    this.bird.drawBird(this.ctx);
    this.obstacles.forEach((obstacle) => {
      obstacle.updatePosition();
      this.checkCollision(obstacle);
      obstacle.drawObstacle();
      if(obstacle.x < 125 && !obstacle.isCrossed) {
        this.score += 1;
         obstacle.isCrossed = false;
      }
      if (obstacle.x < -70) this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
    })
    // console.log(this.obstacles);
  }

  checkCollision(obstacle) {
    if (this.bird.x + this.bird.img.width > obstacle.x && this.bird.y < obstacle.y + 294 && this.bird.x < obstacle.x + 66 || this.bird.x + this.bird.img.width > obstacle.x && this.bird.y + this.bird.img.height > obstacle.y + 416 && this.bird.x < obstacle.x + 66) {
      console.log("over");
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
    // console.log();
    this.gameOver.innerHTML = "<br/>Your Score: "+Math.round(this.score/39);
    wrapper.appendChild(this.gameOver)
  }
  reset() {
    this.bird = null;
    clearInterval(this.drawLoop);

    this.obstacles = [];
    wrapper.children[1] == this.startGameDiv && wrapper.removeChild(this.startGameDiv);
    wrapper.children[1] == this.resetButton && wrapper.removeChild(this.resetButton);

    wrapper.children[1] == this.gameOver && wrapper.removeChild(this.gameOver);

  }
}

class Bird {
  constructor(ctx) {
    this.x = ctx.canvas.width / 2 - 200;
    this.y = 200;
    this.dy = 1;
    this.img = new Image();
    this.img.src = "images/bird.png";
    this.img.style.width = "40px";
    this.img.style.height = "30px";
    this.img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.width);
      // console.log(this.img);
      ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    }
    this.ctx = ctx;
  }
  moveDown() {
    // this.img.src = "images/birdDown.png";
    // this.img.onload = () => {
    this.y += this.dy;
      this.dy = this.dy * 1.07;
    // }
  }

  moveUp() {
    // this.img.src = "images/birdUp.png";
    // this.img.onload = () => {
    this.y -= 25;
    this.dy = 2;
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
    this.isisCrossed = false;
    this.img.onload = () => {

      this.y = getRandom(-180, -10);

      this.x = 700;
      this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);

    }

  }
  drawObstacle() {

    this.ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
  }

  updatePosition() {
    this.x -= this.dx;
    // if(this.x < 125) this.isCrossed = true;
  }
}

document.onkeydown = function(event) {
  if (game.isStarted) {
    switch (event.keyCode) {

      case 32:
        game.drawBackground();
        game.bird.moveUp();
        game.bird.drawBird();
        game.obstacles.forEach(function(obstacle) {
          obstacle.updatePosition();
          obstacle.drawObstacle();
        })
        break;
    }
  }
};

let game = new Game("myCanvas");
