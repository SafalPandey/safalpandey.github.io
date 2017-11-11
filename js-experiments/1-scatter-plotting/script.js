var parent = document.getElementById("parent");

parent.style.listStyle = "none";

var getRandom = function(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function Box(elementId) {
  this.element = document.getElementById(elementId);

  this.x = getRandom(0, 370);
  this.y = getRandom(0, 370);
  var that = this;

  this.infoElement = document.createElement('h3');
  this.infoElement.textAlign = "center";
  this.infoElement.innerHTML = "Clicked on box at x = " + Math.floor(this.x)+ "and y =  "+Math.floor(this.y);
}




for (var i = 0; i < 10; i++) {
  var child = document.createElement("li");
  child.className = "child";
  parent.appendChild(child);
  child.setAttribute("id", "child" + i);

  var box = new Box("child" + i);


  child.style.top = box.y + "px";
  child.style.left = box.x + "px";

  console.log(111, box);
  child.onclick = function(_box) {
    return function() {
      console.log(222, _box);
      box = _box;
      parent.removeChild(this);
      this.onclick = "";
      wrapper.appendChild(box.infoElement)
    }

  }(box);

}
