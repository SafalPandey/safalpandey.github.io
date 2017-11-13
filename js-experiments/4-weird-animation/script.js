var canvas = document.getElementById('myCanvas');
canvas.style.margin = "auto";
canvas.style.border = "#000 1px solid"
var ctx = canvas.getContext("2d");

function Ball(i, j, k) {
  this.x = j * 70 + 30;
  if (i == 1) this.y = i * 180 - (-k * 50 + 10 * j + 60 * i);
  else this.y = k * 50 + 10 * j + 60 * i
  if (this.y < 0) this.y = 5
  this.dx = 1;
  this.dy = 1 + i * -2;
  this.r = 5;
  this.minY = k * 50;
  this.maxY = k * 50 + 180;
};


function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#" + (ball.y * 1).toString();
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(function(ballsK) {
    ballsK.forEach(function(ballsI) {
      ballsI.forEach(function(ball) {

        drawBall(ball);
        // x += dx;
        ball.y += ball.dy;
        // ball.x += ball.dx;
        if (ball.y < ball.minY + 100) ball.r = 0.25 * (ball.y - ball.minY)
        // else if (ball.y > ball.maxY - 20) ball.r = -(ball.maxY - ball.y) * 0.5 + 22.5
        if (ball.x > canvas.height || ball.x < 0) {
          ball.dx = -ball.dx;
        }
        if (ball.y > ball.maxY || ball.y <= ball.minY) {
          ball.dy = -ball.dy;
        }
      })
    })
  })
}
// setTimeout(
// function(){

setInterval(draw, 5);
// }
// ,2000)
balls = [];


for (i = 0; i < 2; i++) {
  balls.push([])
  for (j = 0; j < 9; j++) {
    balls[i].push([])
    for (k = 0; k < 10; k++) {
      balls[i][j].push(new Ball(i, j, k));
    }
  }
}
