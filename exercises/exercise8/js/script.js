var canvas;

var eyeSize = 100;
var eyeBallSize = 50;
var eyeShapeSize = 110;
var eyeBallColour = 255;

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
