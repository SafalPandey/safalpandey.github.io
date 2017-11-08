function Box(elementId){
	this.element=document.getElementById(elementId);
	this.parent = document.getElementById("parent");
	this.x=0;
	this.y=0;
	this.dx=0;
	this.dy=0;

	this.updatePosition=function(){
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;
		this.element.style.top=this.y+"px";
		this.element.style.left=this.x+"px";

		if(this.x >= parseInt(this.parent.style.getPropertyValue("width"))-20){
			this.dx=-10;
		}
		if(this.x < 10){
			this.dx=10;
		}

		if(this.y > 370){
			this.dy=-10;
		}
		if(this.y < 10){
			this.dy=10;
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
		this.dx = -10;
		this.resetY();

	}
	this.moveRight = function(){
		this.dx = 10;
		this.resetY();

	}
	this.moveUp = function(){
		this.dy = -10;
		this.resetX();


	}
	this.moveDown = function(){
		this.dy = 10;
		this.resetX();

	}


}


function Obstacle(){};


var box=new Box("child");
setInterval(function(){
	box.updatePosition();
	// console.log(box.x);
},200);


console.log(parseInt(box.parent.style.getPropertyValue("width")))


document.onkeydown = function(event) {
    console.log(event.keyCode);
		if(event.keyCode == 39){
			box.moveRight();
		}
		if(event.keyCode == 40){
			box.moveDown();
		}
		if(event.keyCode == 37){
			box.moveLeft();
		}
		if(event.keyCode == 38){
			// box.dy = -10;
			box.moveUp();
		}
};
