//licensed under CC-BY, created by francis porter 2019
var pressed = 0;
var canvas = document.getElementById('main');
var scoreText = document.getElementById('score');
var score = 0;
//0 = blank
//1 = down
//2 = up
//3 = left
//4 = right
//use event.which for keyboard events
function kill() {
  alert("you died!");
  location.reload();
}
document.addEventListener("keydown", function(event) {
	if (event.which == 40 || event.which == 38 || event.which == 37 || event.which == 39){
  pressed = 0;
  }
  //down
  if (event.which == 40) {
    pressed = 1;
  }
  //up
  if (event.which == 38) {
    pressed = 2;
  }
  //left
  if (event.which == 37) {
    pressed = 3;
  }
  //right
  if (event.which == 39) {
    pressed = 4;
  }
});
//variables for tail
var tail = [];

function check(num1, num2, arr, tailcalc) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == num1 && arr[i + 1] == num2) {
      if (tailcalc == false) {
        return true;
      } else {
        //making sure it starts on an even number
        if (i / 2 == Math.floor(i / 2)) {
          return true;
        }
      }
    }
  }
  return false;
}
//variables for apple
var apple = [0, 0];
var head = [0, 0];

function newapple() {
  apple[0] = Math.floor(Math.random() * 10);
  apple[1] = Math.floor(Math.random() * 10);
  if (check(apple[0], apple[1], tail, true) || apple == head) {
    newapple();
  }
}
//canvas code (will run on a 10x10 grid)
//https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
function run() {
  var ctx = canvas.getContext('2d');
  //background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //apple
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(apple[0] * canvas.width / 10, apple[1] * canvas.height / 10, canvas.width / 10, canvas.height / 10);
  //tail
  tail.push(head[0], head[1]);
  //head movement
  if (pressed == 1) {
    head[1] += 1;
  }
  if (pressed == 2) {
    head[1] -= 1;
  }
  if (pressed == 3) {
    head[0] -= 1;
  }
  if (pressed == 4) {
    head[0] += 1;
  }
  //wall collision check
  if (head[0] < 0 || head[0] > 9 || head[1] < 0 || head[1] > 9) {
    kill();
  }
  //apple collision check
  if (head[0] == apple[0] && head[1] == apple[1]) {
    score += 1;
    newapple();
    //redrawing apple
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(apple[0] * canvas.width / 10, apple[1] * canvas.height / 10, canvas.width / 10, canvas.height / 10);
  } else {
    tail.splice(0, 2);
  }
  //drawing head
  ctx.fillStyle = "#489130";
  ctx.fillRect(head[0] * canvas.width / 10, head[1] * canvas.height / 10, canvas.width / 10, canvas.height / 10);
  //drawing tail
  ctx.fillStyle = "#397326";
  for (var i = 0; i < tail.length; i += 2) {
    ctx.fillRect(tail[i] * canvas.width / 10, tail[i + 1] * canvas.height / 10, canvas.width / 10, canvas.height / 10);
  }
  //checking for tail collision, https://stackoverflow.com/questions/48116183/javascript-check-if-array-contains-multiple-elements-in-a-row
  if (check(head[0], head[1], tail, true)) {
    kill();
  }
  //score
  scoreText.innerHTML = "score: " + score;
  //repeat
  setTimeout(run, 300);
}
newapple();
run();
