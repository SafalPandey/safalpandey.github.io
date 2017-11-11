var profile = [
  {

    name:"Safal Raj Pandey",
    dob:"1995-12-18",
    age:22,
    interest:["Movies","Games","Tech"],
    image:"/users/sushilpandey/desktop/safal.jpg"

  }
]

var buildPage = function(prof){
  var mainDiv = document.getElementById('main');
  var name = document.getElementById('name');
  var dob = document.getElementById('dob');
  var image = document.getElementById('image');
  var age = document.getElementById('age');
  // console.log(prof.name)
  // mainDiv.innerHTML +=
  name.innerHTML += prof.name;
  dob.innerHTML += prof.dob;
  image.src = prof.image;
  age.innerHTML += prof.age;
};


buildPage(profile[0])
