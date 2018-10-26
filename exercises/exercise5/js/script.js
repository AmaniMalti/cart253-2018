// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  ///////// NEW /////////
  // Created the paddle with score zero initially
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,0);
  ///////// END NEW /////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  ///////// NEW /////////
  // Here the ball went off to the left side
  if ((ball.isOffScreen()==1)) {
    ball.reset();
    ball.vx = ball.speed;
    ball.vy = random (-10,10);
  }
  // Here the ball went off to the right side
  if ((ball.isOffScreen()==2)) {
    ball.reset();
    ball.vx = -ball.speed;
    ball.vy = random (-10,10);
  }
  ///////// END NEW /////////
  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  ///////// NEW /////////
  // Calling function that displays the score
  displayScore();
  ///////// NEW /////////
}
///////// NEW  /////////
  function displayScore() {
  // Added text to show the score of Player A
  text('Player B   '+rightPaddle.score,530,50);
  textAlign(CENTER);
  textSize(20);
  textStyle(BOLD);
  textFont('FUTURA');
  // Added text to show the score of Player B
  text('Player A   '+leftPaddle.score,100,50);
  textAlign(CENTER);
  textSize(20);
  textStyle(BOLD);
  textFont('FUTURA');
 }
 ///////// END NEW /////////

///////// NEW /////////

///////// END NEW /////////
