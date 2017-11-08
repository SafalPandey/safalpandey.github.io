var parent = document.getElementById("parent");
var speed = 1;
var MAX_BOX_BOUNDARY = parseInt(parent.style.width)-30;
var MIN_BOX_BOUNDARY = 10;

var allAnts = [];


var getRandom = function(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}
function Ant(elementId){
	this.element=document.getElementById(elementId);

	this.x=getRandom(0,380);
	this.y=getRandom(0,380);
  var that = this;

	this.dx=getRandom(-2,2);
	this.dy=getRandom(-2,2);

	this.updatePosition=function(){
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;

		this.element.style.top=this.y+"px";

		this.element.style.left=this.x+"px";

		if(this.x >= MAX_BOX_BOUNDARY){
			this.dx=-this.dx;
		}
		if(this.x < MIN_BOX_BOUNDARY-10){
			this.dx=-this.dx;
		}

		if(this.y > MAX_BOX_BOUNDARY+10){
			this.dy=-this.dy;
		}
		if(this.y < MIN_BOX_BOUNDARY-10){
			this.dy=-this.dy;
		}

	}




}



function killAntObject(element){
  allAnts.forEach(function (ant){
    if(ant.element == element){
      ant.dx=0;
      ant.dy =0;
      console.log(ant);
      console.log(element);
      return ant;
    }
  });
};


for (var i = 0; i < 10; i++) {
	var child = document.createElement("div");
	child.className = "child";
	parent.appendChild(child);
	child.setAttribute("id","child"+i);

  var img = document.createElement("img");
  img.src = "images/ant.png";
	var ant=new Ant("child"+i);
  allAnts.push(ant);


  child.appendChild(img);
  child.style.top=ant.y+"px";
	child.style.left=ant.x+"px";

  child.onclick =function(){
    // this.style.backgroundC olor = "red";
    console.log(this.childNodes)
    img = this.childNodes[0];
    img.src = "images/dead-ant.png";
    ant = killAntObject(this);

    // parent.removeChild(this);
  };

}

setInterval(function(){
  allAnts.forEach(function (ant){

    ant.updatePosition();
    })

},10);
