// Setting variables for eye size and eye ball size
var eyeSize = 100;
var eyeBallSize = 50;
var eyeShapeSize = 110;
var eyeBallColour = 255;

function setup() {
  // Make the canvas fullscreen
  createCanvas(windowWidth, windowHeight);
  // Create left eye
  leftEye = new Eyes(width/2 - 80);
  // Create right eye
  rightEye = new Eyes(width/2 + 80);

}
function draw() {
  background('#fae');
  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();
  // showing the text
  showText();
}
// Display the text
function showText(){
  push();
  textAlign(CENTER, CENTER);
  textSize(25);
  text('Futura');
  fill(255);
  text("Click mouse to make my eyes blink", width / 2, height / 2 + 150);
  pop();
}
