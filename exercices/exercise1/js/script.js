// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The image of a zigzag
var zigzagImage;
// The current position of the zigzag image
var zigzagImageX;
var zigzagImageY;

// The image of the laughing face
var laughImage;
// The current position of the laughing face
var laughImageX;
var laughImageY;

// The image of the crying face
var cryImage;
// The current position of the laughing face
var cryImageX;
var cryImageY;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  zigzagImage = loadImage("assets/images/zigzag.png");
  laughImage = loadImage("assets/images/laugh.png");
  cryImage = loadImage("assets/images/cry.png");
}
// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the laughing image at the center of the canvas
  laughImageX = width/2;
  laughImageY = height/2;

  // Start the crying image at the center of the canvas
  cryImageX = width/2;
  cryImageY = height/2;



  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  //Start the zigzag image off screen
  zigzagImageX = 0 - zigzagImage.width/2;
  zigzagImageY = width/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
  // Move the zigzag image to the left
  zigzagImageX += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  //Display the zigzag image
  image(zigzagImage,zigzagImageX,zigzagImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y of the clownImage
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;

  // Calculate the distance in X and in Y of the laughing image
  var xDistance = mouseX - laughImageX;
  var yDistance = mouseY - laughImageY;

  // Calculate the distance in X and in Y of the crying image
  var xDistance = mouseX - cryImageX;
  var yDistance = mouseY - cryImageY;

  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Add 1/10th of the x and y distance to the laughing image current (x,y) location
  laughImageX = laughImageX + xDistance/10;
  laughImageY = laughImageY + yDistance/10;

  // Add 1/50th of the x and y distance to the laughing image current (x,y) location
  cryImageX = cryImageX + xDistance/50;
  cryImageY = cryImageY + yDistance/50;

  // Display the clown image, the laughing image and the crying image
  image(clownImage,clownImageX,clownImageY);
  image(laughImage,laughImageX,laughImageY);
  image(cryImage,cryImageX,cryImageY);
  

}
