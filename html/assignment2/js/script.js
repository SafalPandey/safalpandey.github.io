data = [{
    startFrom: 1,
    numberOfImages: 3,
    heading: 'Donex faucibus ultricles congue'
  },
  {
    startFrom: 4,
    numberOfImages: 2,
    heading: 'Ultricles congue'
  },
]

relatedData = [{
  images: ['fishtail.jpg', '2square.jpg', '3square.jpg', '4square.jpg'],
  desc: ['Mt. Fishtail', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum']
}, {
  images: ['5square.jpg', '6square.jpg', '7square.jpg', '8square.jpg'],
  desc: ['Lorem ipsum', 'Lorem ipsum', 'Mt. Fishtail', 'Lorem ipsum']
}]


function makeSlider(obj) {
  var startImageFrom = obj.startFrom;
  var numberOfImages = obj.numberOfImages;
  var headingContent = obj.heading;


  var heading = document.getElementById('heading');
  heading.innerHTML = headingContent;
  var imageContainer = document.getElementById('imageSlider');

  var imgUL = document.getElementById('imageUl');
  var slideUL = document.getElementById('slideUl');

  var previous = document.getElementById('previousImage')
  var next = document.getElementById('nextImage')
  imageContainer.style.width = "1170px";
  imgUL.style.width = (numberOfImages + 1) * 1170 + "px";
  imgUL.style.padding = "0 0 0 0";
  imgUL.style.position = "relative";
  imgUL.style.left = "0%";
  imageContainer.style.overflow = "hidden";

  function loadImages() {

    for (i = startImageFrom; i < startImageFrom + numberOfImages; i++) {
      var imgli = document.createElement('li')
      var img = document.createElement('img');
      var slideLi = document.createElement('li')
      var span = document.createElement('div')

      slideLi.style.padding = '0 5px'
      span.innerHTML = 'image number:' + i;
      span.style.width = "60px";
      slideLi.style.textIndent = "-10000px";
      // span.style.height = "5px";

      slideLi.appendChild(span);

      slideLi.style.float = 'left';
      slideLi.onclick = function(_i) {
        return function() {
          for (var i = 0; i < slideUl.children.length; i++) {
            slideUl.children[i].setAttribute('class', '');
          }


          this.setAttribute('class', 'active');
          gotoImage(_i - 1);
        };
      }(i);
      img.style.width = '1170px;'
      img.style.height = '700px';
      img.src = "images/jpg/" + i + ".jpg";
      imgli.style.display = "inline-block";
      imgli.style.height = '700px';
      imgli.style.width = '1170px'
      imgli.style.margin = ' 0 10px;';
      imgli.appendChild(img);
      imgUL.appendChild(imgli);
      slideUl.appendChild(slideLi);
    }

    slideUl.children[0].setAttribute('class', 'active');

    var imgli = document.createElement('li')
    var img = document.createElement('img');
    img.style.height = '700px';
    img.style.width = '1170px';
    img.src = "images/jpg/" + 1 + ".jpg";
    imgli.style.display = "inline-block";
    imgli.style.height = '700px';
    imgli.style.margin = ' 0 10px;';
    imgli.appendChild(img);
    imgUL.appendChild(imgli);
  }


  function previousImage(index) {
    if (index < 0) {
      index = -index;
      var multiple = Math.floor((index / numberOfImages) + 1) * numberOfImages;
      index = multiple - index;
    }
    start = -(index) * 100;
    console.log(start);
    console.log("current left", left);
    if (left > 0) {
      left = -left;

    }
    window.animatePrev = setInterval(function() {

      left++;
      if (left > 0) {
        left = -numberOfImages * 100;
      }
      if (left == start) {
        if (currentIndex < 0) {
          currentIndex = -currentIndex;
          var multiple = Math.floor((index / numberOfImages) + 1) * numberOfImages;
          currentIndex = multiple - currentIndex;
        } else {
          currentIndex = currentIndex % numberOfImages;
        }
        clearInterval(animatePrev);
      }
      imgUL.style.left = left + "%";
    }, 5);
  };


  function nextImage(index) {
    if (index < 0) {
      index = -index;
      var multiple = Math.floor((index / numberOfImages) + 1) * numberOfImages;
      index = multiple - index;
    }

    end = ((index) * 100);
    if (left < 0) {
      left = -left;
    }
    window.animateNext = setInterval(function() {
      left++;
      if (left == end) {
        if (currentIndex < 0) {
          currentIndex = -currentIndex;
          var multiple = Math.floor((index / numberOfImages) + 1) * numberOfImages;
          currentIndex = multiple - currentIndex;
        } else {
          currentIndex = currentIndex % numberOfImages;
        }
        clearInterval(animateNext);
      }

      if (left > numberOfImages * 100) {
        left = 0;
      }

      imgUL.style.left = "-" + left + "%";
    }, 5);
  };

  function gotoImage(index) {

    left = -1 * index * 100;
    currentIndex = index;
    imgUL.style.left = "-" + index * 100 + "%";
  };


  var currentIndex = 0;
  var left = 0;
  while (imgUL.children.length != [0]) {
    imageUl.removeChild(imageUl.children[0])
  }
  while (slideUl.children.length != [0]) {
    slideUl.removeChild(slideUl.children[0])
  }
  loadImages();

  previous.onclick = function() {
    clearInterval(window.animateNext);

    clearInterval(window.animatePrev);
    currentIndex -= 1;

    for (var i = 0; i < slideUl.children.length; i++) {
      slideUl.children[i].setAttribute('class', '');
    }

    slideUL.children[(currentIndex) % numberOfImages].setAttribute('class', 'active');

    console.log(currentIndex);
    previousImage(currentIndex);
  };

  next.onclick = function() {

    clearInterval(window.animateNext);

    clearInterval(window.animatePrev);

    currentIndex += 1;

    for (var i = 0; i < slideUl.children.length; i++) {
      slideUl.children[i].setAttribute('class', '');
    }

    slideUL.children[currentIndex % numberOfImages].setAttribute('class', 'active');
    console.log(currentIndex);
    nextImage(currentIndex);
  };
}

var prevObj = document.getElementById('previousObject')
var nextObj = document.getElementById('nextObject')

prevObj.onclick = function() {

  currentObj -= 1;
  if (currentObj < 0) {
    currentObj = 0;
    return 0;
  }

  makeSlider(data[currentObj]);
};

nextObj.onclick = function() {

  currentObj += 1;
  if (currentObj >= data.length) {
    currentObj = data.length - 1;
    return 0;
  }
  makeSlider(data[currentObj]);
};

var currentObj = 0;
makeSlider(data[0])

var isClicked = false;
var searchDiv = document.getElementById('search');
var searchUl = document.getElementById('searchUl');
searchUl.style.position = ' absolute';
searchUl.style.zIndex = '2';
searchUl.style.top = '33px';
searchUl.style.right = '0px';

searchDiv.onclick = function() {
  if (isClicked) {
    searchUl.style.display = 'none';

  } else {

    searchUl.style.display = 'block';
  }

  isClicked = !isClicked;

};

var relatedUl = document.getElementById('relatedUl');
currentRelated = 0;
makeRelated(relatedData[currentRelated], relatedUl);

function makeRelated(obj, relatedUl) {
  while(relatedUl.children.length != 0){
    relatedUl.removeChild(relatedUl.children[0]);
  }

  for (var i = 0; i < obj.images.length; i++) {
    var relatedLi = document.createElement('li');
    var img = document.createElement('img');
    var pDesc = document.createElement('p');
    var hoveredDiv = document.createElement('div');
    var actionsDiv = document.createElement('div');
    var actionsEye = document.createElement('p');
    var eyeI = document.createElement('i');
    var actionsLink = document.createElement('p');
    var linkI = document.createElement('i');

    actionsDiv.setAttribute('class', 'actions');
    eyeI.setAttribute('class', 'fa fa-eye fa-lg');
    linkI.setAttribute('class', 'fa fa-link fa-lg');

    actionsEye.appendChild(eyeI);
    actionsLink.appendChild(linkI);

    actionsDiv.appendChild(actionsEye);
    actionsDiv.appendChild(actionsLink);
    hoveredDiv.setAttribute('class', 'hovered');
    pDesc.setAttribute('class', 'description');

    img.src = 'images/jpg/' + obj.images[i];
    pDesc.innerHTML = obj.desc[i];

    hoveredDiv.appendChild(pDesc);
    hoveredDiv.appendChild(actionsDiv)
    relatedLi.appendChild(img);
    relatedLi.appendChild(hoveredDiv);

    relatedUl.appendChild(relatedLi);
  }
};

var relatedNext = document.getElementById('relatedNext');
var relatedPrev = document.getElementById('relatedPrev');

relateNext.onclick = function() {

  currentRelated += 1;
  if (currentRelated >= relatedData.length) {
    currentRelated = relatedData.length - 1;
    return 0;
  }
  makeRelated(relatedData[currentRelated], relatedUl);
};

relatedPrev.onclick = function() {

  currentRelated -= 1;
  if (currentRelated < 0) {
    currentRelated = 0;
    return 0;
  }
  makeRelated(relatedData[currentRelated], relatedUl);
};
