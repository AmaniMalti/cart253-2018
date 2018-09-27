/*********************************************************

Exercise 2 - The chick danger
// Amani Malti

Starter code for exercise 2.

*********************************************************/
// The chick image
var kotImage;

// The position and size of the chick image
var kotImageX;
var kotImageY;
var kotImageSize = 50;

// The speed and velocity of our chick image
var kotImageSpeed = 10;
var kotImageVX = 0;
var kotImageVY = 0;

// The chick enemy image
var kotkotImage;

// The position and size of the enemy chick image
var kotkotImageX;
var kotkotImageY;
var kotkotImageSize = 50;

// How much bigger the enemy chick image gets with each successful dodge
var kotkotImageSizeIncrease = 5;

// The speed and velocity of our enemy chick image
var kotkotImageSpeed = 5;
var kotkotImageVX = 5;

// How much bigger the enemy chick image gets with each successful dodge
var kotkotImageSpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  kot = loadImage("assets/images/kot.png");
  kotkot = loadImage("assets/images/kotkot.png");
}

// setup()
//
// Make the canvas, position the kot image and the kotkot image
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the kot image in the centre
  kotImageX = width/2;
  kotImageY = height/2;

  // Put the kotkot image to the left at a random y coordinate within the canvas
  kotkotImageX = 0;
  kotkotImageY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // Add light blue background
  background('#ccffff');

  // Add text
  text('DODGES '+dodges,400,50);
  textAlign(CENTER);
  textSize(20);
  textStyle(BOLD);
  textFont('FUTURA');



  // Default the kot image velocity to 0 in case no key is pressed this frame
  kotImageVX = 0;
  kotImageVY = 0;

  // Check which keys are down and set the kot image velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    kotImageVX = -kotImageSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    kotImageVX = kotImageSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    kotImageVY = -kotImageSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    kotImageVY = kotImageSpeed;
  }

  // Move the kot image according to its calculated velocity
  kotImageX = kotImageX + kotImageVX;
  kotImageY = kotImageY + kotImageVY;

  // The kotkot image always moves at enemySpeed (which increases)
  kotkotImageVX = kotkotImageSpeed;
  // Update the kotkot image position based on its velocity
  kotkotImageX = kotkotImageX + kotkotImageVX;

  // Check if the kotkot image and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the kotkot image
  // and the centre of the kot image is less that their combined radii
  if (dist(kotkotImageX,kotkotImageY,kotImageX,kotImageY) < kotkotImageSize/2 + kotkotImageSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the kot image's position
    kotkotImageX = 0;
    kotkotImageY = random(0,height);
    // Reset the kotkot image size and speed
    kotkotImageSize = 50;
    kotkotImageSpeed = 5;
    // Reset the kot image position
    kotImageX = width/2;
    kotImageY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the kot image has gone off the screen (cheating!)
  if (kotImageX < 0 || kotImageX > width || kotImageY < 0 || kotImageY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    kotkotImageX = 0;
    kotkotImageY = random(0,height);
    kotkotImageSize = 50;
    kotkotImageSpeed = 5;
    kotImageX = width/2;
    kotImageY = height/2;
    dodges = 0;
  }

  // Check if the kotkot image has moved all the way across the screen
  if (kotkotImageX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the kotkot image position to the left at a random height
    kotkotImageX = 0;
    kotkotImageY = random(0,height);
    // Increase the kotkot image speed and size to make the game harder
    kotkotImageSpeed = kotkotImageSpeed + kotkotImageSpeedIncrease;
    kotkotImageSize = kotkotImageSize + kotkotImageSizeIncrease;
  }

  // if you get 5 dodges you win //
  if (dodges > 5) {
  // This means you win//
  console.log("YOU WIN");
  dodges = 0;

  }

  // Display the current number of successful in the console
  console.log(dodges);

  // Display the kot image
  image(kot,kotImageX,kotImageY);

  // Display the kotkot image
  image(kotkot,kotkotImageX,kotkotImageY);

}
