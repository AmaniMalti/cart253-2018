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
// Variable for ball object
var ball;
var ball1;
var ball2;
var ball3;
var ball4;
var ball5;
// Variable that defines max speed
var maxSpeed = 15;
// Variable that calculates the angle (in radians) from the ball position to the coordinate origin as measured from the positive x-axis
var a = 0;
// A fraction of the distance between the ball and the the center of the canvas
var length = 0;

function preload() {
  // Adding image of fly to replace the ball
  img1 = loadImage('assets/images/blackFly.png');
  img2 = loadImage('assets/images/greyFly.png');
  img3 = loadImage('assets/images/greenFly.png');
  img4 = loadImage('assets/images/redFly.png');
  img5 = loadImage('assets/images/purpleFly.png');

}

function setup() {
  // Create a canvas the size of the window
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
  // Create the balls
  ball1 = new Ball(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img1);
  ball2 = new Ball(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img2);
  ball3 = new Ball(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img3);
  ball4 = new Ball(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img4);
  ball5 = new Ball(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img5);

}

// Draw something so we can see it in the background
function draw() {
  background(255);
  strokeWeight(4);
  drawFace_closedJaw();
  //drawFace_openJaw();
  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();

  // Vx and Vy are randomly defined as the perlin noise algorithme
  ball1.calculateVelocity();
  ball2.calculateVelocity();
  ball3.calculateVelocity();
  ball4.calculateVelocity();
  ball5.calculateVelocity();

  // Updating the balls position
  ball1.update();
  ball2.update();
  ball3.update();
  ball4.update();
  ball5.update();

  // Adding Proportional distance between the balls and the eyes
  length1 = ball1.howFarIs();
  length2 = ball2.howFarIs();
  length3 = ball3.howFarIs();
  length4 = ball4.howFarIs();
  length5 = ball5.howFarIs();

  length = min(length1,length2,length3,length4,length5);
  if(length == length1) {
	ball = ball1;
  }
  else if(length == length2) {
	  ball = ball2;
  }
  else if(length == length3) {
	  ball = ball3;
  }
  else if(length == length4) {
	  ball = ball4;
  }
  else ball = ball5;

  // Angle calculation
  a = atan2(ball.y - height/2, ball.x - width/2);

  // Rotating the eyes so it follows the ball
  leftEye.rotate(a, length);
  rightEye.rotate(a, length);
  // Displaying the ball
  //image(img,this.x, this.y, this.size, this.size);
  ball1.display();
  ball1.tx += 0.03;
  ball1.ty += 0.02;

  ball2.display();
  ball2.tx += 0.02;
  ball2.ty += 0.01;

  ball3.display();
  ball3.tx += 0.03;
  ball3.ty += 0.01;

  ball4.display();
  ball4.tx += 0.02;
  ball4.ty += 0.02;

  ball5.display();
  ball5.tx += 0.01;
  ball5.ty += 0.01;
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
