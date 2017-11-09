function Car(element){
	this.element= element;
	this.parent = document.getElementById("road");
  this.element.style.width = "50px";

	this.x=100;
	this.y=0;
	this.dy=6;

	this.updatePosition=function(){
		this.y=this.y+this.dy;
		this.parent.style.backgroundPosition="center "+this.y+"px";
		this.element.style.left=this.x+"px";

		// if(this.x >= parseInt(this.parent.style.getPropertyValue("width"))-20){
		// 	this.dx=-10;
		// }

		if(this.x < 10){
			this.dx=10;
		}


		//
		// this.resetX();
		// this.resetY();
	}

	this.resetX = function(){
		this.dx = 0;
	};
	this.resetY = function(){
		this.dy=0;
	};

	this.moveLeft = function(){
		this.x -= 125;
    if(this.x<100){
      this.x=100;
    }
		// this.resetY();

	}
	this.moveRight = function(){
    this.x += 125;
    if(this.x>350){
      this.x=350;
    }

		// this.resetY();

	}
	this.moveUp = function(){
		this.dy +=2;
    if(this.dy >= 10){
      this.dy = 10;
      // console.log("max speed!!!");
    }
		this.resetX();


	}
	this.moveDown = function(){
		this.dy -=2;
    if(this.dy<=2){
      this.dy=2;
    }
		this.resetX();

	}
}

function Obstacle(){

};

var carDiv =document.getElementById("car");


var car=new Car(carDiv);
setInterval(function(){
	car.updatePosition();
	// console.log(box.x);
},10);


// console.log(parseInt(car.parent.style.getPropertyValue("width")))


document.onkeydown = function(event) {
		if(event.keyCode == 39){
      // console.log("pressed right");
			car.moveRight();
		}
		if(event.keyCode == 40){
      // console.log("pressed down ");
			car.moveDown();
		}
		if(event.keyCode == 37){
      // console.log("pressed left" );
			car.moveLeft();
		}
		if(event.keyCode == 38){
			// box.dy = -10;
      // console.log("pressed up" );
			car.moveUp();
		}
};
