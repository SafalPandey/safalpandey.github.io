var data = [{
  tagName: 'div',
  className: 'test-class',
  styles: {
    width: "100px",
    height: "100px",
    backgroundColor: 'red',
  },
  children: [{
      tagName: 'div',
      className: 'box',
      styles: {
        width: "50px",
        height: "50px",
        backgroundColor: 'blue'
      },
    },
    {
      tagName: 'div',
      className: 'box',
      styles: {
        width: "50px",
        height: "50px",
        backgroundColor: 'brown',
        float: 'right'
      },
    }
  ]
}];


var parseForCss = function(camelStr) {
  cssString = [];
  camelStr = camelStr.split("");
  camelStr.forEach(function(char) {
    if (char == char.toUpperCase()) {
      cssString.push("-" + char.toLowerCase());
    } else {
      cssString.push(char);
    }
  })
  return cssString.join("");
}

var makeElement = function(dataElement) {
  var element = document.createElement(dataElement.tagName);
  element.className = dataElement.className;
  var styleString = "";
  for (styleKey in dataElement.styles) {
    styleString += parseForCss(styleKey) + ":" + dataElement.styles[styleKey] + "; ";
  }
  element.setAttribute("style", styleString);
  dataElement.children && dataElement.children.forEach(function(child) {
    var child = makeElement(child);
    element.appendChild(child);
  });
  return element;
};


var wrapper = document.getElementById("wrapper");
data.forEach(function(parent) {
  var mainElement = makeElement(parent);
  wrapper.appendChild(mainElement);
})
