function Car(car, road) {
  this.element = car;
  this.parent = road;
  this.element.style.width = "50px";
  this.x = 225;
  this.y = 6;
  this.by = 0;
  this.dy = 6;

  this.updatePosition = function() {
    this.by = this.by + this.dy;
    this.parent.style.backgroundPosition = "center " + this.by + "px";
    this.element.style.left = this.x + "px";
    this.element.style.bottom = this.y + "%";

    // if(this.x >= parseInt(this.parent.style.getPropertyValue("width"))-20){
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
    this.y = 7;
    this.dy += 2;
    if (this.dy >= 10) {
      this.dy = 10;
      // console.log("max speed!!!");
    }
    this.resetX();


  }
  this.moveDown = function() {
    this.y = 5;
    this.dy -= 2;
    if (this.dy <= 2) {
      this.dy = 2;
    }
    this.resetX();

  }
}


function Bullet() {
  this.y = -10;
  var that = this;

  this.element = document.createElement("div");
  this.element.style.height = "20px";
  this.element.style.width = "6px";
  this.element.style.position = "absolute";
  this.element.style.top = this.y + "px";
  this.element.style.left = "22px";

  this.element.style.backgroundColor = "red";



  this.updatePosition = function() {
    console.log(that.y);
    this.element.style.top = that.y + "px";
  }

  // this.destroy = function() {
  //     this
  // }

}


function Obstacle() {

};

function carGame(carId, roadId) {

  var that = this;
  this.bullets = [];


  var startGameDiv = document.createElement("div");

  startGameDiv.style.position = "fixed";
  startGameDiv.style.left = "0";
  startGameDiv.style.top = "0";
  startGameDiv.style.width = "100%";
  startGameDiv.style.height = "100vh";
  startGameDiv.innerHTML = "Welcome to Car Game!!!<br/>";
  startGameDiv.style.backgroundColor = "yellow";
  startGameDiv.style.fontSize = "5em";
  startGameDiv.style.textAlign = "center";



  var roadElement = document.createElement('div');
  roadElement.style.height = "650px";
  roadElement.style.width = "500px";
  roadElement.style.backgroundImage = "url('images/2d-road.png')";
  roadElement.style.position = "relative";
  roadElement.style.backgroundRepeat = " repeat-y";
  roadElement.style.display = "inline-block";

  var carElement = document.createElement('div');
  carElement.style.height = "80px";
  carElement.style.width = "50px";
  carElement.style.position = "absolute";
  carElement.style.bottom = "7%";
  carElement.style.left = "60px";
  carElement.style.backgroundImage = " url('images/car-top.png')";

  roadElement.appendChild(carElement);

  var resetButton = document.createElement("button");
  resetButton.style.border = "none";
  resetButton.style.width = "70px";
  resetButton.style.height = "3em";
  resetButton.style.backgroundColor = "yellow";
  resetButton.innerHTML = "<strong>Reset Game</strong>";
  resetButton.style.position = "absolute";
  resetButton.style.left = "0";

  resetButton.onclick = function(_that) {
    return function(){

      var game = _that;

      game.reset();
      game.init();

    };
    // console.log(parseInt(numberInput.value))
    // wrapper.removeChild();
    // createScene(antNum);
  }(that);

  roadElement.appendChild(resetButton);




  this.init = function() {

    this.car = new Car(carElement, roadElement);
    wrapper.appendChild(roadElement);
    this.interval = setInterval(function() {
      that.car.updatePosition();
      // console.log(box.x);
      that.bullets.forEach(function(bullet) {
        bullet.y -= 10;
        bullet.updatePosition();
        if (bullet.y <= -550) {
          console.log(that.bullets.indexOf(bullet));
          that.car.element.removeChild(bullet.element);
          that.bullets.splice(that.bullets.indexOf(bullet), 1);
          // clearInterval(bullRepeat);
        }
      })
    }, 10);

  };

  this.reset = function() {
    // cars = [];
    this.car = null;
    clearInterval(this.interval);
    console.log('aa');
    wrapper.removeChild(roadElement);

  };


};

var carGames = [];

var wrapper = document.getElementById("wrapper");






var game1 = new carGame("car1", "road1");
game1.init();

carGames.push(game1);
//
// var game2 = new carGame("car2","road2");
// game2.init();
// game2
// carGames.push(game2);


document.onkeydown = function(event) {

  carGames.forEach(function(carGame) {

    if (event.keyCode == 39) {
      // console.log("pressed right");
      carGame.car.moveRight();
    }
    if (event.keyCode == 40) {
      // console.log("pressed down ");
      carGame.car.moveDown();
    }
    if (event.keyCode == 37) {
      // console.log("pressed left" );
      carGame.car.moveLeft();
    }
    if (event.keyCode == 38) {
      // box.dy = -10;
      // console.log("pressed up" );
      carGame.car.moveUp();
    }

    if (event.keyCode == 32) {
      var bullet = new Bullet();
      carGame.bullets.push(bullet);
      console.log(carGame.bullets)

      carGame.car.element.appendChild(bullet.element);

      // box.dy = -10;
      // console.log("pressed up" )
    }
  })
};

// console.log(parseInt(car.parent.style.getPropertyValue("width")))
