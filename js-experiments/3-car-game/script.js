var getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Car(road) {

  var carElement = document.createElement('div');
  carElement.style.height = '80px';
  carElement.style.width = '50px';
  carElement.style.position = 'absolute';
  carElement.style.top = '85%';
  carElement.style.left = '60px';
  carElement.style.backgroundImage = "url('images/car-top.png')";

  this.element = carElement;
  this.parent = road;
  this.element.style.width = '50px';
  this.x = 225;
  this.y = 550;
  this.by = 0;
  this.dy = 6;

  this.updatePosition = function() {
    this.by = this.by + this.dy;
    this.parent.style.backgroundPosition = 'center ' + this.by + 'px';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';

    // if(this.x >= parseInt(this.parent.style.getPropertyValue('width'))-20){
    // 	this.dx=-10;
    // }

    if (this.x < 10) {
      this.dx = 10;
    }


    //
    // this.resetX();
    // this.resetY();
  }

  this.resetX = function() {
    this.dx = 0;
  };
  this.resetY = function() {
    this.dy = 0;
  };

  this.moveLeft = function() {
    this.x -= 125;
    if (this.x < 100) {
      this.x = 100;
    }
    // this.resetY();

  }
  this.moveRight = function() {
    this.x += 125;
    if (this.x > 350) {
      this.x = 350;
    }

    // this.resetY();

  }
  this.moveUp = function() {
    this.y = 545;
    this.dy += 2;
    if (this.dy >= 8) {
      this.dy = 8;
      // console.log('max speed!!!');
    }


  }
  this.moveDown = function() {
    this.y = 555;
    this.dy -= 2;
    if (this.dy <= 2) {
      this.dy = 2;
    }

  }
}


function Bullet(carX, carY) {
  this.x = carX
  this.y = carY;
  var that = this;

  this.element = document.createElement('div');
  this.element.style.height = '20px';
  this.element.style.width = '6px';
  this.element.style.position = 'absolute';
  this.element.style.top = this.y + 'px';
  this.element.style.left = this.x + 25 + 'px';

  this.element.style.backgroundColor = 'red';



  this.updatePosition = function() {
    this.element.style.top = that.y + 'px';
  }

  // this.destroy = function() {
  //     this
  // }

}


function Obstacle() {
  this.x = 0;
  this.y = -100;
  Obstacle.possibleX = [90, 210, 340];
  this.image = getRandom(1, 3);
  var lane = getRandom(0, 2);
  this.x = Obstacle.possibleX[lane];
  this.img = document.createElement('img');
  this.img.src = 'images/obstacles/' + this.image + '.png';

  this.img.style.position = 'absolute';
  this.img.style.top = this.y + 'px';
  this.img.style.left = this.x + 'px';
  this.img.style.display = 'block';

  this.updatePosition = function() {
    this.img.style.top = this.y + 'px';
  }

};

function CarGame(carId, roadId) {

  this.isStarted = false;
  var that = this;
  var resetButton = document.createElement('button');
  resetButton.style.border = 'none';
  resetButton.style.width = '70px';
  resetButton.style.height = '3em';
  resetButton.style.backgroundColor = 'yellow';
  resetButton.innerHTML = '<strong>Reset Game</strong>';
  resetButton.style.position = 'absolute';
  resetButton.style.left = '0';
  resetButton.style.borderRadius = '10px';

  resetButton.onclick = function(_that) {
    return function() {

      var game = _that;

      game.reset();
      game.init();
    };
  }(that);


  var startGameDiv = document.createElement('div');

  startGameDiv.style.position = 'fixed';
  startGameDiv.style.left = '0';
  startGameDiv.style.top = '0';
  startGameDiv.style.width = '100%';
  startGameDiv.style.height = '100vh';
  startGameDiv.innerHTML = 'Welcome to Car Game!!!<br/>';
  startGameDiv.style.backgroundColor = '#00dd00';
  startGameDiv.style.fontSize = '5em';
  startGameDiv.style.textAlign = 'center';

  var startButton = resetButton.cloneNode(true);
  startButton.innerHTML = 'Begin Game';
  startButton.style.left = '45%';
  startButton.style.top = '50%';
  startButton.style.backgroundColor = 'green';
  startButton.style.fontSize = '20px';
  startButton.style.width = '100px';

  startButton.onclick = function(_that) {
    return function() {

      var game = _that;

      game.reset();
      game.init();
    };
  }(that);

  startGameDiv.appendChild(startButton);

  var gameOver = document.createElement('div');

  gameOver.style.position = 'fixed';
  gameOver.style.left = '0';
  gameOver.style.top = '0';
  gameOver.style.width = '80%';
  gameOver.style.minWidth = '500px';
  gameOver.style.height = '50vh';
  gameOver.style.left = '10%';
  gameOver.style.top = '20vh'
  gameOver.innerHTML = 'Oops!<br /> GAME OVER!!!<br/>';
  gameOver.style.backgroundColor = 'yellow';
  gameOver.style.fontSize = '4.5em';
  gameOver.style.textAlign = 'center';
  gameOver.style.borderRadius = '15px';

  var restartButton = startButton.cloneNode(true);
  restartButton.innerHTML = 'Restart Game';
  restartButton.onclick = function(_that) {
    return function() {

      var game = _that;

      game.reset();
      game.init();
    };
  }(that);

  gameOver.appendChild(restartButton);


  wrapper.appendChild(startGameDiv);
  var roadElement = document.createElement('div');
  roadElement.style.height = '650px';
  roadElement.style.width = '500px';
  roadElement.style.backgroundImage = "url('images/2d-road.png')";
  roadElement.style.position = 'relative';
  roadElement.style.backgroundRepeat = ' repeat-y';
  roadElement.style.display = 'inline-block';
  roadElement.style.overflow = 'hidden';
  this.element = roadElement;



  this.init = function() {
    this.isStarted = true;
    this.bullets = [];
    this.shootDelay = false;
    this.obstacles = [];
    this.car = new Car(roadElement);
    roadElement.appendChild(this.car.element);

    roadElement.appendChild(resetButton);

    wrapper.appendChild(roadElement);

    this.interval = setInterval(function() {
      that.car.updatePosition();
      that.bullets.forEach(function(bullet) {
        bullet.y -= 3;
        bullet.updatePosition();
        if (bullet.y <= -6) {
          that.element.removeChild(bullet.element);
          that.bullets.splice(that.bullets.indexOf(bullet), 1);
        } else {

          checkBulletCollision(bullet);
        }
      })


      that.obstacles.forEach(function(obstacle) {
        obstacle.y += that.car.dy;
        obstacle.updatePosition();
        if (obstacle.y > 465 && obstacle.x < that.car.x && obstacle.x + 80 > that.car.x) {

          if (obstacle.image == 3) {
            console.log("Powered Up!!!");
            that.car.moveUp();

          } else {

            console.log('carllided');
            // that.car.element.style.width = '80px';
            obstacle.img.src = 'images/explosionCar.png';
            that.element.removeChild(that.car.element);

            // that.car.element.style.backgroundImage= 'url('images/explosionCar.png')';
            clearInterval(that.interval);
            clearInterval(that.obstacleInterval);
            setTimeout(function() {
              wrapper.appendChild(gameOver)
              that.isStarted = false;
            })
          }

        }
        if (obstacle.y >= 580) {
          that.element.removeChild(obstacle.img);
          that.obstacles.splice(that.obstacles.indexOf(obstacle), 1);
        }
      })
    }, 10);

    this.obstacleInterval = setInterval(function() {
      that.shootDelay = false;
      var numberOfObstacles = getRandom(1, 2);
      var lastX = 0;
      for (i = 0; i < numberOfObstacles; i++) {
        var obstacle = new Obstacle;
        if (obstacle.x != lastX) {
          that.element.appendChild(obstacle.img)
          that.obstacles.push(obstacle);
          lastX = obstacle.x;

        }
      }
      lastX = 0;
    }, 500)
  };

  this.reset = function() {
    // cars = [];
    this.isStarted = false;
    this.car = null;
    clearInterval(this.interval);
    clearInterval(this.obstacleInterval);

    while (roadElement.childNodes[0]) {
      roadElement.removeChild(roadElement.childNodes[0]);
    }
    while (wrapper.childNodes[0]) {
      wrapper.removeChild(wrapper.childNodes[0]);
    }

  };

  var checkBulletCollision = function(bullet) {
    that.obstacles.forEach(function(obstacle) {

      if (bullet.y < obstacle.y + 80 && bullet.x < obstacle.x + 80 && bullet.x > obstacle.x) {

        console.log('collided');
        that.element.removeChild(bullet.element);
        that.bullets.splice(that.bullets.indexOf(bullet), 1);

        obstacle.img.src = 'images/explosion' + obstacle.image + '.png';
        that.obstacles.splice(that.obstacles.indexOf(obstacle), 1);

        setTimeout(function() {
          that.element.removeChild(obstacle.img);

        }, 100)
        return true;
      }

    })
  };

};



var carGames = [];

var wrapper = document.getElementById('wrapper');

var game1 = new CarGame('car1', 'road1');
carGames.push(game1);

document.onkeydown = function(event) {

  carGames.forEach(function(carGame) {

    if (carGame.isStarted) {
      switch (event.keyCode) {
        case 39:
          carGame.car.moveRight();

          break;
        case 40:
          carGame.car.moveDown();

          break;
        case 37:
          carGame.car.moveLeft();

          break;
        case 38:
          carGame.car.moveUp();

          break;
        case 32:
          if (!carGame.shootDelay) {
            var bullet = new Bullet(carGame.car.x, carGame.car.y);
            carGame.shootDelay = true;
            carGame.bullets.push(bullet);
            carGame.element.appendChild(bullet.element);
          }
          break;

      }

    }
  })
};
