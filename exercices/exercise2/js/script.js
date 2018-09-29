/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;

// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;
// How much bigger the avatar rectangle gets with each successful dodge
var avatarSizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;

// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;
// How much bigger the enemy circle gets with each successful dodge
var avatarSpeedIncrease = 1;


// How many dodges the player has made
var dodges = 0;

// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0, height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A light blue

  background('#ccffff');

// Added text
text('DODGES '+dodges,400,50);
textAlign(CENTER);
textSize(20);
textStyle(BOLD);
textFont('FUTURA');

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0, height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the avatar size and speed
    avatarSize = 50;
    avatarSpeed = 10;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0, height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0, height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;

    // Change the Avatar speed to make the game harder
    avatarSpeed = avatarSpeed + (0.5-random(avatarSpeedIncrease));
    // The speed of the avatar must always be positive or 0
    if (avatarSpeed < 0){
    avatarSpeed = -avatarSpeed;
    }
    // Change the Avatar size to make the game harder
    avatarSize = avatarSize + (2-random(avatarSizeIncrease));
    // The size of the avatar must always be positive or 0
    if (avatarSize < 0){
    avatarSize = -avatarSize;
    }
  }

  // if you get 5 dodges you win //
  if (dodges > 20) {
  // This means you win//
  console.log("YOU WIN");
  dodges = 0;

  }
  // Display the current number of successful in the console
  console.log(dodges);

  // The player is black
  fill(0);
  // Draw the player as a circle
  rect(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a circle
  rect(enemyX,enemyY,enemySize,enemySize);

}
