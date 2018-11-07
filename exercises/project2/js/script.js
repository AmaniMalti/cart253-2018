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

///////// NEW /////////
var winnerIs;
var loserScore;
// adding variable to control game started
var gameStarted;
var gameEnded;
// Adding sound variables
var cheerSound;
var racquetHitSound;
///////// END NEW /////////

function preload() {
  ///////// NEW /////////
  // Preloading background image
  img = loadImage('assets/images/bg.jpg');
  // Adding  winning sound
  cheerSound = new Audio("assets/sounds/cheer.wav");
  // Adding Paddle hit sound
  racquetHitSound = new Audio("assets/sounds/racquetHit.wav");
  ///////// END NEW /////////
}


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);

  gameStarted = false;
  gameEnded = false;

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
  if (gameEnded){
    showGameOver();
    if (keyIsDown(13))
      //gameStarted = true;
      setup();
  }
  else {

  // Game is not started yet, Displaying start page
  if (!gameStarted){
    showStartPage();
    // Setting variable when enter key is pressed to start the game
    if (keyIsDown(13))
      gameStarted = true;
  }
    // Executed only when game is started
    else {
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

  ///////// NEW /////////
  //Adding sound when the Paddle hits the ball
  if (ball.handleCollision(leftPaddle)){
    racquetHitSound.play();
  };
  if (ball.handleCollision(rightPaddle)){
    racquetHitSound.play();
  };
  ///////// END NEW /////////

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  ///////// NEW /////////
  // Calling function that displays the score
  rightPaddle.displayScore();
  leftPaddle.displayScore();
  ///////// END NEW /////////

  ///////// NEW /////////
  if (rightPaddle.score == 5){
    cheerSound.play();
    winnerIs = "Player2";
    loserScore = leftPaddle.score;
    gameEnded = true;
    }
    //gameStarted = false;


  if (leftPaddle.score == 5){
    cheerSound.play();
    winnerIs = "Player1";
    loserScore = rightPaddle.score;
    gameEnded = true;
    }
    //gameStarted = false;

  ///////// END NEW /////////

    }
  }
}
  ///////// NEW /////////
  function showStartPage(){
    textSize(32);
    textAlign(CENTER,CENTER);
    text('Futura');
    fill(255);
    var title = "WELCOME TO PINGPONG IN SPACE\n";
    text(title,width/2,height/2);
    textSize(16);
    var title2 = "Hit Enter key to start the game";
    text(title2,width/2,height/2+100);
  }

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  text('Futura');
  fill(255);
  var gameOverText = "GAME OVER\n";
  gameOverText += winnerIs + " wins  ";
  gameOverText += "5 - " + loserScore;
  text(gameOverText,width/2,height/2);
  textSize(16);
  var title2 = "Hit Enter key to start the game";
  text(title2,width/2,height/2+100);
}
  ///////// END NEW /////////
