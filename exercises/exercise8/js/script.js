// Setting variables for eye size and eye ball size
var eyeSize = 100;
var eyeBallSize = 50;
var eyeShapeSize = 110;
var eyeBallColour = 255;
// Adding variable for new the new ball object
var ball;


function setup() {
  // Make the canvas fullscreen
  createCanvas(windowWidth, windowHeight);
  // Create left eye
  leftEye = new Eyes(width/2 - 80);
  // Create right eye
  rightEye = new Eyes(width/2 + 80);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 20, 25, 40, 150);

}
function draw() {
  background('#fae');
  // Updating the ball position
  ball.update();
  // Drawing the eyes in their position
  strokeWeight(1);
  leftEye.drawEyes();
  rightEye.drawEyes();
  // showing the text
  showText();
  // Displaying the ball
  ball.display();
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
