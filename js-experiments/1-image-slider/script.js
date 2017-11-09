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

  var imgli = document.createElement('li')
  var img = document.createElement('img');
  img.style.height = '500px';
  imgli.style.display = "inline-block";
  imgli.style.height = '500px';

  img.src = "images/" + 1 + ".jpg";
  imgli.style.margin=' 0 10px;';
  imgli.appendChild(img);
  imgUL.appendChild(imgli);

}


// function getCurrent(){
//   return ((-1* parseInt(imgUL.style.left)) /100) ;
// }


function previousImage(index) {
  if (index < 0 ) {
    index = -index;
    var multiple = Math.floor((index/9 )+ 1)*9;
    index = multiple - index;
    // console.log(index);

  }
  start= -(index)*100;
  // console.log(start);
  end = -(index+1)*100;
  // console.log("current left",left);
  if (left > 0){
    left=-left;

  }
  window.animatePrev = setInterval(function() {

    left++;
    if(left > 0){
      left=-900;
    }
    if (left == start) {
      if (currentIndex<0) {
        currentIndex = -currentIndex;
        var multiple = Math.floor((index/9 )+ 1)*9;
        currentIndex = multiple - currentIndex;
      }
      else {
        currentIndex = currentIndex%9;
      }
      // console.log(currentIndex);
      // console.log("left and start", left , start);
      clearInterval(animatePrev);
    }

    // console.log(left);
    imgUL.style.left = left + "%";
  }, 10);
};


function nextImage(index) {

  start=(index-1)*100;
  end = ((index)*100);
  if (left < 0) {
    left = -left;
  }
  // left=start;
    window.animateNext = setInterval(function() {
    left++;
    if (left == end) {
      currentIndex = currentIndex % 9;
      left = left%900;
      clearInterval(animateNext);
    }

    // console.log(left);
    imgUL.style.left = "-" + left%900 + "%";
  }, 10);
};

function gotoImage(index){

  left = -1 * index *100;
  currentIndex = index;
  imgUL.style.left = "-"+ index*100 + "%";
  // console.log(  imgUL.style.left);
};


var currentIndex = 0;
var left = 0;
loadImages();

previous.onclick = function(){


  // if(currentIndex <= 0){
  //   console.log(currentIndex);
  //
  //   current = 0;
  //   gotoImage(0)
  // }
  // else {
  clearInterval(window.animateNext);

  clearInterval(window.animatePrev);
  currentIndex -=1;
  console.log(currentIndex);
  previousImage(currentIndex);
// }
};

next.onclick =function(){
  // if(currentIndex == 9){
  //   console.log(currentIndex);
  //
  //   currentIndex = 9;
  //
  // }
  // else {
    clearInterval(window.animateNext);

    clearInterval(window.animatePrev);

  currentIndex +=1;
  // currentIndex = currentIndex % 9;
  console.log(currentIndex);
  nextImage(currentIndex);
// }
};
