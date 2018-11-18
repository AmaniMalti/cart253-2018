// Setting variables for eye size and eye ball size
var eyeSize = 100;
var eyeBallSize = 50;

function setup() {
  // Make Canvas full screen
  createCanvas(windowWidth, windowHeight);
  // Create left eye
  leftEye = new Eyes(width/2 - 80);
  // Create right eye
  rightEye = new Eyes(width/2 + 80);
}

function draw() {
  // Drawing the eyes in their position
  strokeWeight(1);
  fill(30);
  ellipse(width/2 - 80, height/2, 110, 110);
  fill(30);
  ellipse(width/2 + 80, height/2, 110, 110);
  leftEye.drawEyes();
  rightEye.drawEyes();
}
