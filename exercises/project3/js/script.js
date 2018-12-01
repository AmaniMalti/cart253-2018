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
// Variable for new the new ball object
var ball;
// Variable that calculates the angle (in radians) from the ball position to the coordinate origin as measured from the positive x-axis
var a = 0;
// A fraction of the distance between the ball and the the center of the canvas
var length = 0;

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
  // Create a ball
  ball = new Ball(width / 2, height / 2, 20, 25, 40, 150);

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
  // Updating the ball position
  ball.update();
  // Angle calculation
  a = atan2(ball.y - height/2, ball.x - width/2);
  // Proportional distance
  length = dist(ball.x, ball.y, width/2, height/2)/15;
  // Rotating the eyes so it follows the ball
  leftEye.rotate(a, length);
  rightEye.rotate(a, length);
  // Displaying the ball
  ball.display();
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
