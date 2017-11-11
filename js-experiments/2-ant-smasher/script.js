var wrapper = document.getElementById("wrapper");
var parent = document.getElementById("parent");

var speed = 1;
var MAX_BOX_BOUNDARY_X = parseInt(parent.style.width) - 55;
var MAX_BOX_BOUNDARY_Y = parseInt(parent.style.height) - 30;
var MIN_BOX_BOUNDARY = 10;




var getRandom = function(min, max) {
  return Math.random() * (max - min + 1) + min;
}


function Board(wrapper, parent) {

  var that = this;
  var allAnts = [];


  var startGameDiv = document.createElement("div");

  startGameDiv.style.position = "fixed";
  startGameDiv.style.left = "0";
  startGameDiv.style.top = "0";
  startGameDiv.style.width = "100%";
  startGameDiv.style.height = "100vh";
  startGameDiv.innerHTML = "Welcome to Ant-Smasher!!!<br/>";
  startGameDiv.style.backgroundColor = "yellow";
  startGameDiv.style.fontSize = "5em";
  startGameDiv.style.textAlign = "center";

  var numberInput = document.createElement('input');
  numberInput.style.width = "100%";
  numberInput.style.height = "30px";
  numberInput.style.textAlign = "center";
  numberInput.type = "number";
  numberInput.placeholder = "Enter Number of Ants Here";
  startGameDiv.appendChild(numberInput);



  var startButton = document.createElement("button");
  startButton.style.border = "none";
  startButton.style.width = "10em";
  startButton.style.height = "5em";
  startButton.innerHTML = "Begin Game";
  startButton.onclick = function() {
    // console.log(parseInt(numberInput.value))
    var antNum = ((numberInput.value) == "" ? 10 : numberInput.value);
    wrapper.removeChild(startGameDiv);
    createScene(antNum);
  };
  startGameDiv.appendChild(startButton)


  var gameOver = document.createElement("div");

  gameOver.style.position = "fixed";
  gameOver.style.left = "0";
  gameOver.style.top = "0";
  gameOver.style.width = "100%";
  gameOver.style.height = "100vh";
  gameOver.innerHTML = "Great Job!<br /> GAME OVER!!!<br/>";
  gameOver.style.backgroundColor = "yellow";
  gameOver.style.fontSize = "5em";
  gameOver.style.textAlign = "center";

  var restartButton = document.createElement("button");
  restartButton.style.border = "none";
  restartButton.style.width = "10em";
  restartButton.style.height = "5em";
  restartButton.innerHTML = "Play Again";
  restartButton.onclick = function() {

    // if(wrapper.children[1] == gameOver){
    //   console.log("removed gameOver");
    //   wrapper.removeChild(gameOver);
    // }

    that.reset();
  };
  gameOver.appendChild(restartButton)


  var resetButton = restartButton.cloneNode(true);

  resetButton.innerHTML = "Reset Game";
  resetButton.style.position = "absolute";
  resetButton.style.bottom = "0%";
  resetButton.onclick = function() {
    that.reset();
  };


  this.init = function() {

    wrapper.appendChild(startGameDiv)

    // createScene();

    that.repeat = setInterval(function() {
      allAnts.forEach(function(ant) {

        allAnts.forEach(function(other) {

          if (ant == other) {
            // console.log("Self", ant);

          } else if (ant.x < other.x + 55 && ant.x + 55 > other.x && ant.y < other.y + 30 && 30 + ant.y > other.y) {
            console.log("collided");

            // if()

            if (ant.x < other.x+55 || ant.x+55 > other.x) {
              ant.dx = -ant.dx;
              other.dx = -other.dx

            }

            if (ant.y < other.y+30 || ant.y+30 >other.y) {
              ant.dy = -ant.dy;
              other.dy = -other.dy

            }

            // if (ant.x+55 > other.x) {
            //   other.dx = -other.dx
            // }
            // else if (ant.y+30 >other.y) {
            //   other.dy = -other.dy
            // }
            // ant.updatePosition();

          }
        });
        ant.updatePosition();
      })

    }, 10);
  }

  var createScene = function(num_of_ants) {
    var children = document.createElement("div");
    children.appendChild(resetButton);
    parent.appendChild(children);

    for (var i = 0; i < num_of_ants; i++) {

      var child = document.createElement("div");
      child.className = "child";
      children.appendChild(child);
      child.setAttribute("id", "child" + i);

      var img = document.createElement("img");
      img.style.display = "block";
      img.src = "images/ant.png";
      var ant = new Ant("child" + i);
      allAnts.push(ant);


      child.appendChild(img);


      child.onclick = function(_ant, _i) {
        return function() {
          linkedAnt = _ant;
          var index = _i;
          // this.style.backgroundC olor = "red";
          img = this.childNodes[0];
          img.src = "images/dead-ant.png";
          linkedAnt.kill();
          allAnts.splice(allAnts.indexOf(linkedAnt), 1);

          if (allAnts.length == 0) {



            parent.removeChild(parent.children[0]);

            wrapper.appendChild(gameOver);

          }

          this.onclick = null;

        }

      }(ant);

    }
  }

  this.reset = function() {


    killAllAnts();
    clearInterval(that.repeat);

    if(parent.children.length != 0){
      console.log("removing",parent.children[0]);
      parent.removeChild(parent.children[0]);
    }

    for(i=1; i < wrapper.children.length;i++){
      console.log("deleting",wrapper.children[i]);
      wrapper.removeChild(wrapper.children[i]);
    }

    this.init(wrapper, parent);

  };


  var killAllAnts = function() {
    allAnts.forEach(function(ant) {
      ant.kill();

    })

    allAnts = [];
  };
};




function Ant(elementId) {
  this.element = document.getElementById(elementId);

  this.x = getRandom(0, MAX_BOX_BOUNDARY_X - 20);
  this.y = getRandom(0, MAX_BOX_BOUNDARY_Y - 20);
  var that = this;

  this.dx = getRandom(-1, 1);
  this.dy = getRandom(-1, 1);

  // this.dx = 3;
  // this.dy = 3;



  this.updatePosition = function() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    this.element.style.top = this.y + "px";

    this.element.style.left = this.x + "px";

    if (this.x >= MAX_BOX_BOUNDARY_X) {
      this.dx = -this.dx;
    }
    if (this.x < MIN_BOX_BOUNDARY - 10) {
      this.dx = -this.dx;
    }

    if (this.y > MAX_BOX_BOUNDARY_Y + 10) {
      this.dy = -this.dy;
    }
    if (this.y < MIN_BOX_BOUNDARY - 10) {
      this.dy = -this.dy;
    }



    // collision detected!
  }


  this.kill = function() {
    this.dx = 0;
    this.dy = 0;

  }
}

var board = new Board(wrapper, parent);

board.init();
