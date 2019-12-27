//assigning variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3');
var notes = "FEDCBAG";
//for drawing lines
function drawline(context, x1, y1, x2, y2) {
  // Make the line THICC
  context.lineWidth = 4;
  // Reset the current path
  context.beginPath();
  // Staring point (x1, y1)
  context.moveTo(x1, y1);
  // End point (x2, y2)
  context.lineTo(x2, y2);
  // Make the line visible
  context.stroke();
}
//for debugging
function log(tolog) {
  document.getElementById('debug').innerHTML = tolog;
}
//to get bullshit answers
var randrand = 0;
function bullshit(correct, avoid, avoid2){
randrand = notes.charAt(Math.floor(Math.random() * 6));
while(randrand == correct || randrand == avoid || randrand == avoid2){
randrand = notes.charAt(Math.floor(Math.random() * 6));
}
return randrand;
}
//to draw a circle
function drawcircle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.lineWidth = 3;
  context.fillStyle = "000000";
  context.fill();
  context.stroke();
}
//to draw the bars and the clef
function drawclef(height) {
  //bottom
  drawline(ctx, 0, 90 + height, 30, 65 + height);
  //top
  drawline(ctx, 30, 40 + height, 10, 25 + height);
  //middle
  drawline(ctx, 30, 67 + height, 30, 40 + height);
  //top
  drawcircle(ctx, 10, 34 + height, 9);
  //f circles
  drawcircle(ctx, 40, 40 + height, 5);
  drawcircle(ctx, 40, 60 + height, 5);
  //bar
  drawline(ctx, 0, 30 + height, 9999, 50 + height);
  drawline(ctx, 0, 50 + height, 9999, 50 + height);
  drawline(ctx, 0, 70 + height, 9999, 50 + height);
  drawline(ctx, 0, 90 + height, 9999, 50 + height);
  drawline(ctx, 0, 110 + height, 9999, 50 + height);
}
//to get the note from a number
var count = 0;

function getnote(num) {
  if (num == 0) {
    return 'F';
  }
  //below main f
  if (num > 0) {
    count = 0;
    for (var i = 0; i < num; i++) {
      count += 1;
      if (count > 6) {
        count -= 6;
      }
    }
    return notes.charAt(count);
  }
  //above main f
  if (num < 0) {
    count = 0;
    for (var i = 0; i > num; i--) {
      count -= 1;
      if (count < 0) {
        count += 7;
      }
    }
    return notes.charAt(count);
  }
}
//to add functionality to the buttons
b1.onclick = function(){click(0)};
b2.onclick = function(){click(1)};
b3.onclick = function(){click(2)};
function click(num){
if(randrand == num){
window.location.href = "incorrect.html";
}else{
window.location.href = "correct.html";
}
}
//some variables
var rand = 0;
var height = 50;
//main run function
function run() {
  drawclef(height);
  rand = Math.floor(Math.random() * 11) - 3;
  drawcircle(ctx, 70, (rand * 10) + height + 50, 5);
  //filling all with bullshit answers
  b1.innerHTML = bullshit(getnote(rand), -9999, -9999);
  b2.innerHTML = bullshit(getnote(rand), -9999, b1.innerHTML);
  b3.innerHTML = bullshit(getnote(rand), b1.innerHTML, b2.innerHTML);
  //determining which button holds the right answer
  randrand = Math.floor(Math.random() * 3);
  switch (randrand) {
    case 0:
      b1.innerHTML = getnote(rand);
      break;
    case 1:
      b2.innerHTML = getnote(rand);
      break;
    case 2:
      b3.innerHTML = getnote(rand);
      break;
  }
}
run();
