// Setting variables for eye size and eye ball size
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
  // Angle calculation
  a = atan2(ball.y - height/2, ball.x - width/2);
  // Proportional distance
  length = dist(ball.x, ball.y, width/2, height/2)/15;
  // Rotating the eyes so it follows the ball
  leftEye.rotate(a, length);
  rightEye.rotate(a, length);
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
