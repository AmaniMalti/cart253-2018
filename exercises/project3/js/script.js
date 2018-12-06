//This is a project that is just fun
// It is an animation about a Chameleon that is following flys with his eyes and wants to eat them when they get closer
// By Amani Malti

// Setting variables
var canvas;
// Variables for eyes
var eyeSize = 100;
var eyeBallSize = 50;
var eyeShapeSize = 110;
var eyeBallColour = 255;
// Variable for fly object
var balls = [];
var num_balls = 25;
var img = [];
var distances = [];
var j=0;

// Variable that defines max speed
var maxSpeed = 15;
// Variable that calculates the angle (in radians) from the fly position to the coordinate origin as measured from the positive x-axis
var a = 0;
// A fraction of the distance between the fly and the the center of the canvas
var length = 30;


function setup() {
  // Create a canvas the size of the window
  //createCanvas(windowWidth,windowHeight);
  canvas = createCanvas(windowWidth,windowHeight);
  // Style it so that it sits behind the main HTML in a fixed position that ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  // Create left eye
  leftEye = new Eyes(width/2 - 80);
  // Create right eye
  rightEye = new Eyes(width/2 + 80);
    // Create the colored balls
  for (var i = 0; i < num_balls; i++) {
    balls.push(new ball(random(0,width),random(0,height),20,25,40,150,random(0,1000),random(0,1000),getRandomInt(255),getRandomInt(255),getRandomInt(255),0));
  }
  	console.log(balls[1].r,balls[1].g,balls[1].b);
}

// Draw something so we can see it in the background
function draw() {
  background(255);
  strokeWeight(4);
  // Blink eyes when all the balls are eaten
  if (balls.length == 0){
	  leftEye.eyeBallColour = 0;
      leftEye.lashes = 1;
	  rightEye.eyeBallColour = 0;
      rightEye.lashes = 1
	  drawFace_closedJaw();
  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();
  }
  else{
  if (length < 18) {
	drawFace_openJaw();
  }
  else drawFace_closedJaw();
  //

  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();

  // Vx and Vy are randomly defined as the perlin noise algorithme
  for (var i = 0; i < balls.length; i++) {
    	balls[i].calculateVelocity();
		balls[i].update();
		balls[i].dist = balls[i].howFarIs();
		distances[i] = balls[i].dist;
		balls[i].display();
		balls[i].tx += random(0.01,0.02);
		balls[i].ty += random(0.01,0.03);
  }

  length = min(distances);
  j = 0;
  while ((distances[j] != length) && (j < num_balls)) {
	j= j+1;
  }

  // Angle calculation
  a = atan2(balls[j].y - height/2, balls[j].x - width/2);

  // Rotating the eyes so it follows the fly
  leftEye.rotate(a, length);
  rightEye.rotate(a, length);


  //tongue
  if (length < 15) {
	//drawFace_openJaw();
  push();
  stroke('#fae');
	strokeWeight(40);
    line(width/2, 6.2 *height/8, balls[j].x, balls[j].y);
  pop();
	balls.splice(j,1);
	distances = [];
	length = 30;
  }
  }
}

function drawFace_closedJaw(){
  // Drawing Chameleon's face
  fill('hsb(160, 100%, 50%)');
  triangle(3*width/8,3*height/4,width/2,3*height/8,5*width/8,3*height/4);
  // Drawing Chameleon's jaw
  fill('hsl(160, 100%, 50%)');
  triangle(3*width/8+30,3*height/4,width/2,7*height/8,5*width/8-30,3*height/4);

}

function drawFace_openJaw(){
  // Drawing Chameleon's face
  fill('hsb(160, 100%, 50%)');
  triangle(3*width/8,3*height/4,width/2,3*height/8,5*width/8,3*height/4);
  // Drawing Chameleon's jaw
  fill('hsl(160, 100%, 50%)');
  triangle(3*width/8+30,3*height/4+30,width/2,7*height/8+30,5*width/8-30,3*height/4+30);
}

// windowResized() is called by p5 whenever the window is resized!
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
  }
// function to return a random integer(for the colors)
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
