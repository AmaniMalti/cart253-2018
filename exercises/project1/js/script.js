/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;


// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 350;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
//var preyFill = 20;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

// Create a obstacle for player
var obstacleX;
var obstacleY;
var obstacleRadius = 15;
var obstacleVX = 0;
var obstacleVY = 0;
var obstacleMaxSpeed = 5;

// Adding sounds
var coinsSound;
var gameoverSound;

// Create parameter variable for noise function
var t = 0.01;

function preload() {
  coinsSound = new Audio("assets/sounds/coins.wav");
  gameoverSound = new Audio("assets/sounds/gameover.wav");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();
  setupObstacle();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// setupObstacle()
//
// Initialises obstacle's position and velocity
function setupObstacle() {
  obstacleX = width/5;
  obstacleY = height/2;
  obstacleVX = -obstacleMaxSpeed;
  obstacleVY = obstacleMaxSpeed;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background('#b3d4fc');


  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    moveObstacle();

    updateHealth();
    checkEating();
    checkHunted();

    drawPrey();
    drawPlayer();
    drawObstacle();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  // adding control for shift key for horizontal movement
  if (keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed * 2;
    playerHealth = playerHealth - 0.5;
  }
  else if (keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed * 2;
    playerHealth = playerHealth - 0.5;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }
  // adding shift key for vertical movement for ability to sprint
  if (keyIsDown(SHIFT) && keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed * 2;
    playerHealth = playerHealth - 0.5;
  }
  else if (keyIsDown(SHIFT) && keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed * 2;
    playerHealth = playerHealth - 0.5;
  }
  // vertical movement resets to original speed
  else if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
    // Play sound
    gameoverSound.play();
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  //if (random() < 0.05)
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey

    // replace random by noise function
    preyVX = map(noise(t),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(2*t),0,1,-preyMaxSpeed,preyMaxSpeed);
    t += 0.01;


  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// moveObstacle()
//
// Moves the obstacle randomly
function moveObstacle() {

    // replace random by noise function
    obstacleVX = map(noise(1.5*t),0,1,-obstacleMaxSpeed,obstacleMaxSpeed);
    obstacleVY = map(noise(1.5*t),0,2,-obstacleMaxSpeed,obstacleMaxSpeed);
    t += 0.01;


  // Update obstacle position based on velocity
  obstacleX = obstacleVX + obstacleX + 2;
  obstacleY = obstacleVY + obstacleY + 2;

  // Screen wrapping
  if (obstacleX < 0) {
    obstacleX += width;
  }
  else if (obstacleX > width) {
    obstacleX -= width;
  }

  if (obstacleY < 0) {
    obstacleY += height;
  }
  else if (obstacleY > height) {
    obstacleY -= height;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Play sound
    coinsSound.play();
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Increase player size
    if (playerRadius < 40) {
      playerRadius += 0.1;
      }
    //  console.log (playerRadius);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    // Decrease prey size
    if (preyRadius > 10) {
        preyRadius -= 0.1;
        }
    //  console.log (preyRadius);
    // Increse prey speed with noise
    t += 0.2;
    console.log (preyVX);
    console.log (preyVY);



    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// checkHunted()
//
// Check if the player overlaps the obstacle, it's game over
function checkHunted() {
  // Get distance of player to obstacle
  var d = dist(playerX,playerY,obstacleX,obstacleY);
  // Check if it's an overlap
  if (d < playerRadius + obstacleRadius) {
    gameOver = true;
    // Play sound
    gameoverSound.play();
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  //fill(preyFill,preyHealth);
  fill(255,204,0,preyHealth);
  ellipse(preyX,preyY,preyRadius*2);

}

// drawObstacle()
//
// Draw the obstacle as an ellipse and add color
function drawObstacle() {
  fill('rgba(100%,0%,100%,0.5)');
  ellipse(obstacleX,obstacleY,obstacleRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  ellipse(playerX,playerY,playerRadius*2);
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
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
