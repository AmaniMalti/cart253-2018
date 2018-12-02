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
var fly;
var fly1;
var fly2;
var fly3;
var fly4;
var fly5;
// Variable that defines max speed
var maxSpeed = 15;
// Variable that calculates the angle (in radians) from the fly position to the coordinate origin as measured from the positive x-axis
var a = 0;
// A fraction of the distance between the fly and the the center of the canvas
var length = 0;

function preload() {
  // Adding image of fly to replace the fly
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
  // Create the flys
  fly1 = new fly(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img1);
  fly2 = new fly(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img2);
  fly3 = new fly(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img3);
  fly4 = new fly(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img4);
  fly5 = new fly(width / 2, height / 2, 20, 25, 40, 150,random(0,1000), random(0,1000),img5);

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
  fly1.calculateVelocity();
  fly2.calculateVelocity();
  fly3.calculateVelocity();
  fly4.calculateVelocity();
  fly5.calculateVelocity();

  // Updating the flys position
  fly1.update();
  fly2.update();
  fly3.update();
  fly4.update();
  fly5.update();

  // Adding Proportional distance between the flys and the eyes
  length1 = fly1.howFarIs();
  length2 = fly2.howFarIs();
  length3 = fly3.howFarIs();
  length4 = fly4.howFarIs();
  length5 = fly5.howFarIs();

  length = min(length1,length2,length3,length4,length5);
  if(length == length1) {
	fly = fly1;
  }
  else if(length == length2) {
	  fly = fly2;
  }
  else if(length == length3) {
	  fly = fly3;
  }
  else if(length == length4) {
	  fly = fly4;
  }
  else fly = fly5;

  // Angle calculation
  a = atan2(fly.y - height/2, fly.x - width/2);

  // Rotating the eyes so it follows the fly
  leftEye.rotate(a, length);
  rightEye.rotate(a, length);

  // Displaying the fly
  fly1.display();
  fly1.tx += 0.03;
  fly1.ty += 0.02;

  fly2.display();
  fly2.tx += 0.02;
  fly2.ty += 0.01;

  fly3.display();
  fly3.tx += 0.03;
  fly3.ty += 0.01;

  fly4.display();
  fly4.tx += 0.02;
  fly4.ty += 0.02;

  fly5.display();
  fly5.tx += 0.01;
  fly5.ty += 0.01;
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
