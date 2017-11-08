var parent = document.getElementById("parent");
var speed = 1;
var MAX_BOX_BOUNDARY = 370;
var MIN_BOX_BOUNDARY = 10;
var MAX_BOX_BOUNDARY = 370;

var getRandom = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}
function Ant(elementId){
	this.element=document.getElementById(elementId);

	this.x=getRandom(0,380);
	console.log(this.x);
	this.y=getRandom(0,380);
	console.log(this.y);
  var that = this;

	this.dx=getRandom(-5,5);
	this.dy=getRandom(-5,5);

	this.updatePosition=function(){
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;

		this.element.style.top=this.y+"px";

		this.element.style.left=this.x+"px";

		if(this.x >= MAX_BOX_BOUNDARY){
			this.dx=-speed;
		}
		if(this.x < MIN_BOX_BOUNDARY){
			this.dx=speed;
		}

		if(this.y > MAX_BOX_BOUNDARY){
			this.dy=-speed;
		}
		if(this.y < MIN_BOX_BOUNDARY){
			this.dy=speed;
		}
		//
		// this.resetX();
		// this.resetY();
	}


	setInterval(function(){
		that.updatePosition();
		// console.log(ant.x);
	},10);


}


function Obstacle(){};


for (var i = 0; i < 10; i++) {
	var child = document.createElement("div");
	child.className = "child";
	parent.appendChild(child);

	child.setAttribute("id","child"+i);

	var ant=new Ant("child"+i);

  child.style.top=ant.y+"px";

	child.style.left=ant.x+"px";

  child.onclick =function(){
    parent.removeChild(this);
  };

}

// document.onkeydown = function(event) {
//     console.log(event.keyCode);
// 		if(event.keyCode == 39){
// 			ant.moveRight();
// 		}
// 		if(event.keyCode == 40){
// 			ant.moveDown();
// 		}
// 		if(event.keyCode == 37){
// 			ant.moveLeft();
// 		}
// 		if(event.keyCode == 38){
// 			// ant.dy = -10;
// 			ant.moveUp();
// 		}
// };
