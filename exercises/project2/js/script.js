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
///////// NEW /////////
// Added 2 objects
var balls = [];
var numBalls = 5;
var ball2;
var spaceShip;
///////// END NEW /////////
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
var fireSound;
var alienSound
///////// END NEW /////////

function preload() {
  ///////// NEW /////////
  // Adding background image
  img = loadImage('assets/images/bg.jpg');
  // Adding Ball2 image
  img2 = loadImage('assets/images/ball2.png');
  // Adding SpaceShip image
  img3 = loadImage('assets/images/spaceShip.png');
  console.log ("spaceShip");
  // Adding  winning sound
  cheerSound = new Audio("assets/sounds/cheer.wav");
  // Adding Paddle hit sound
  racquetHitSound = new Audio("assets/sounds/racquetHit.wav");
  // Adding Paddle fire ball sound
  fireSound = new Audio("assets/sounds/fire.ogg");
  // Adding Alien sound
  alienSound = new Audio("assets/sounds/alien.flac");
  ///////// END NEW /////////
}


// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640, 480);
  ///////// NEW /////////
  gameStarted = false;
  gameEnded = false;
  ///////// END NEW /////////

  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  ///////// NEW /////////
  ball2 = new Ball2(width / 3, height / 3, 5, 5, 10, 5);
  spaceShip = new SpaceShip(width / 2, height / 2, 2, 2, 75, 75, 1);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, 0, 580);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 10, 83, 87, 0, 50);

  ///////// NEW /////////
  // adding mutliple balls using arays
  for (var i = 0; i < numBalls; i++) {
    balls.push(new Ball5(width / 2, height / 2, random(-5, 5), random(-5, 5), 10, 5));
  }
  ///////// END NEW /////////
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  ///////// NEW /////////
  // Adding background Image
  background(img, 0);
  if (gameEnded) {
    showGameOver();
    if (keyIsDown(13))
      setup();
  } else {
    // Game is not started yet, Displaying start page
    if (!gameStarted) {
      showStartPage();
      // Setting variable when enter key is pressed to start the game
      if (keyIsDown(13))
        gameStarted = true;
    }
    // Executed only when game is started
    else {
      // Here the ball went off to the left side
      if ((ball.isOffScreen() === 1)) {
        ball.reset();
        ball.vx = ball.speed;
        ball.vy = random(-10, 10);
        // Incrementing score
        rightPaddle.score += 1;
      }
      // Here the ball went off to the right side
      if ((ball.isOffScreen() === 2)) {
        ball.reset();
        ball.vx = -ball.speed;
        ball.vy = random(-10, 10);
        // Incrementing score
        leftPaddle.score += 1;
      }
      ///////// END NEW /////////
      ///////// NEW /////////
      if ((ball2.isOffScreen() === 1)) {
        ball2.reset();
        ball2.vx = ball2.speed;
        ball2.vy = random(-10, 10);
        // Incrementing score
        //rightPaddle.score += 1;
      }
      // Here the ball2 went off to the right side
      if ((ball2.isOffScreen() === 2)) {
        ball2.reset();
        ball2.vx = -ball2.speed;
        ball2.vy = random(-10, 10);
        // Incrementing score
        //leftPaddle.score += 1;
      }
      ///////// END NEW /////////

      ///////// NEW /////////
      if ((spaceShip.isOffScreen() === 1)) {
        spaceShip.vx = spaceShip.speed;
      }
      // Here SpaceShip 2 went off to the right side
      if ((spaceShip.isOffScreen() === 2)) {
        spaceShip.vx = -spaceShip.speed;
      }
      ///////// END NEW /////////


      leftPaddle.handleInput();
      rightPaddle.handleInput();

      ball.update();
      ///////// NEW /////////
      ball2.update();
      spaceShip.update();
      ///////// END NEW /////////
      leftPaddle.update();
      rightPaddle.update();

      ///////// NEW /////////
      //Adding sound when the Paddle hits the ball
      if (ball.handleCollision(leftPaddle)) {
        racquetHitSound.play();
      };
      if (ball.handleCollision(rightPaddle)) {
        racquetHitSound.play();
      };

      if (ball2.handleCollision(leftPaddle)) {
        fireSound.play();
      };
      if (ball2.handleCollision(rightPaddle)) {
        fireSound.play();
      };

      if (ball.handleCollisionSpaceShip(spaceShip)) {
        alienSound.play();
      };
      ///////// END NEW /////////

      ball.display();
      ///////// NEW /////////
      ball2.display();
      spaceShip.display();
      ///////// END NEW /////////
      leftPaddle.display();
      rightPaddle.display();

      ///////// NEW /////////
      // Calling function that displays the score
      rightPaddle.displayScore();
      leftPaddle.displayScore();
      ///////// END NEW /////////

      ///////// NEW /////////
      if (rightPaddle.score == 10) {
        cheerSound.play();
        winnerIs = "Player2";
        loserScore = leftPaddle.score;
        gameEnded = true;
      }

      if (leftPaddle.score == 10) {
        cheerSound.play();
        winnerIs = "Player1";
        loserScore = rightPaddle.score;
        gameEnded = true;
      }
      ///////// END NEW /////////

      ///////// NEW /////////
      for (var i = 0; i < balls.length; i++) {
        balls[i].update();
        if (balls[i].isOffScreen()) {
          balls[i].reset();
        }
        balls[i].handleCollision(leftPaddle);
        balls[i].handleCollision(rightPaddle);
        balls[i].display();
      }
      ///////// END NEW /////////
    }
  }
}
///////// NEW /////////
// Display the title and controls on the screen
function showStartPage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  text('Futura');
  fill(255);
  // Display the text
  text("PINGPONG IN SPACE", width / 2, height / 2);
  // Font size for instructions
  textSize(20);
  // Display the instructions
  text("Hit Enter key to start the game\n Use the key W + S and the UP + DOWN Keys", width / 2, 3 * height / 4);
  pop();
}
// showGameOver()
// Display text about the game being over!
function showGameOver() {
  push()
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Futura');
  fill(255);
  text("GAME OVER\n" + winnerIs + " wins  ", width / 2, height / 2);
  text(" 10 - " + loserScore, width / 2, height / 2 + 65);
  textSize(16);
  text("Hit Enter key to start the game", width / 2, 3 * height / 4);
}
///////// END NEW /////////
