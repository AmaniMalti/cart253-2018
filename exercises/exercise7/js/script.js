// Setting variables for eye size and eye ball size
var eyeSize = 100;
var eyeBallSize = 50;
var eyeShapeSize = 110;
var eyeBallColour = 255;

function setup() {
  // Make Canvas full screen
  createCanvas(windowWidth, windowHeight);
  // Create left eye
  leftEye = new Eyes(width/2 - 80);
  // Create right eye
  rightEye = new Eyes(width/2 + 80);

}

function draw() {
  background('#fae');
  // Drawing the eyelashes
  strokeWeight(4);
  line(width/2 - 80, height/2, width/2 - 90, height/2 - 90);
  strokeWeight(4);
  line(width/2 - 80, height/2, width/2 - 135, height/2 - 85);
  strokeWeight(4);
  line(width/2 - 80, height/2, width/2 - 180, height/2 - 80);
  strokeWeight(4);
  line(width/2 + 80, height/2, width/2 + 90, height/2 - 90);
  strokeWeight(4);
  line(width/2 + 80, height/2, width/2 + 135, height/2 - 85);
  strokeWeight(4);
  line(width/2 + 80, height/2, width/2 + 180, height/2 - 80);
  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();
  showText();
}
function showText(){
  push();
  textAlign(CENTER, CENTER);
  textSize(25);
  text('Futura');
  fill(255);
  // Display the text
  text("Click mouse to make my eyes blink", width / 2, height / 2 + 150);
  pop();
}
