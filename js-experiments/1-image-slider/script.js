var maindiv = document.getElementById('main');

maindiv.style.position = "relative";

var imageContainer = document.getElementById('wrapper')

var imgUL = document.createElement('ul');


var buttonDiv = document.createElement('div');
buttonDiv.style.display = 'table';
buttonDiv.style.width = "80%";
buttonDiv.style.margin = 'auto';
buttonDiv.style.position = "absolute";
buttonDiv.style.top = "50%";
buttonDiv.style.left = "10%";

var previous = document.createElement('button');
previous.style.height = "50px";
previous.innerHTML = "&lt;&lt;";
previous.style.float ="left";

var next = document.createElement('button');
next.style.height = "50px";
  next.innerHTML = "&gt;&gt;";
next.style.float="right";


imageContainer.style.margin = "auto";
imageContainer.style.width = "890px";
imgUL.style.height = '500px';
imgUL.style.width = "9000px";
imgUL.style.padding = "0 0 0 0";
imgUL.style.position = "relative";
imgUL.style.left = "0%";
imageContainer.style.overflow = "hidden";


buttonDiv.appendChild(previous);
buttonDiv.appendChild(next);


maindiv.appendChild(buttonDiv);

imageContainer.appendChild(imgUL);






function loadImages() {



  for (i = 1; i < 10; i++) {
    var imgli = document.createElement('li')
    var img = document.createElement('img');
    img.style.height = '500px';
    imgli.style.display = "inline-block";
    imgli.style.height = '500px';

    img.src = "images/" + i + ".jpg";
    imgli.style.margin=' 0 10px;';
    imgli.appendChild(img);
    imgUL.appendChild(imgli);
  }

}


// function getCurrent(){
//   return ((-1* parseInt(imgUL.style.left)) /100) ;
// }


function previousImage(index) {
  start= -(index)*100;
  end = -(index+1)*100;

  i=end;
  var animate = setInterval(function() {

    i++;
    if (i >= start) {
      clearInterval(animate);
    }

    console.log(i);
    imgUL.style.left = i + "%";
  }, 10);
};


function nextImage(index) {

  start=(index-1)*100;
  end = (index)*100;

  i=start;
  var animate = setInterval(function() {

    i++;
    if (i >= end) {
      clearInterval(animate);
    }

    console.log(i);
    imgUL.style.left = "-" + i + "%";
  }, 10);
};

function gotoImage(index){

  imgUL.style.left = "-"+ index*100 + "%";
  console.log(  imgUL.style.left);
};


var currentIndex = 0;

loadImages();

previous.onclick = function(){
  if(currentIndex == 0){
    console.log(currentIndex);

    current = 0;
    gotoImage(0)
  }
  else {

  currentIndex -=1;
  console.log(currentIndex);
  previousImage(currentIndex);
}
};

next.onclick =function(){
  if(currentIndex == 8){
    console.log(currentIndex);

    currentIndex = 8;
    gotoImage(8);
  }
  else {

  currentIndex +=1;
  console.log(currentIndex);
  nextImage(currentIndex);
}
};
