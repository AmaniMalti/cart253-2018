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

var cheerSound;

function preload() {
  ///////// NEW /////////
  // Preloading background image
  img = loadImage('assets/images/bg.jpg');
  // Adding  winning sound
  cheerSound = new Audio("assets/sounds/cheer.wav");
}


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);

  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,0,580);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,0,50);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  ///////// NEW /////////
  // Adding background Image
  background(img,0)

  ////// NEW
  // Here the ball went off to the left side
  if ((ball.isOffScreen()===1)) {
    ball.reset();
    ball.vx = ball.speed;
    ball.vy = random (-10,10);
    // Incrementing score
    rightPaddle.score += 1;
  }
  // Here the ball went off to the right side
  if ((ball.isOffScreen()===2)) {
    ball.reset();
    ball.vx = -ball.speed;
    ball.vy = random (-10,10);
    // Incrementing score
    leftPaddle.score += 1;
  }
  ///////// END NEW /////////

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  /*if (ball.isOffScreen()) {
    ball.reset();
  }*/

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  ///////// NEW /////////
  // Calling function that displays the score
  rightPaddle.displayScore();
  leftPaddle.displayScore();
  ///////// END NEW /////////
}
