/************************************************************************
  Feast!
  By Amani Malti

  This is a funny animation about a Chameleon that is following flys with his eyes and wants to eat them when they get closer

  Chase ball: Mouse moved close to ball
  Eyes blink: Mouse click

************************************************************************/
// Setting variables
var canvas;

// Variables for eyes
		var eyeSize = 100;
		var eyeBallSize = 50;
		var eyeShapeSize = 110;
		var eyeBallColour = 255;

// An array of ball objects
var balls = [];

// Number of balls
var num_balls = 10;

		var img = [];

// balls max speed
var maxSpeed = 12;

// balls distances from the chameleon
var distances = [];

// ball angle (in radians) as measured from the x-axis
var a = 0;

// ball distance from the chameleon
var length = 30;

var j=0;

// Image to display when game ends
var full;

// Tracking the current state of the program (title screen to begin)
var state = "TITLE";

// Sounds variable
var fliesSound;
var slurpSound;

// preload()
//
// Loads the image of the chameleon
function preload() {
  full = loadImage("assets/images/full.png");
  start = loadImage("assets/images/start.jpg");
// loads the sounds
	fliesSound = new Audio("./assets/sounds/flies.wav");
  slurpSound = new Audio("./assets/sounds/slurp.mp3");
}

// setup()
//
// Create the canvas
function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth,windowHeight);
  // Style it so that it sits behind the main HTML in a fixed position that ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");

  // Create left eye
  leftEye = new Eyes(0,width/2 - 80,height/2,width/2 - 80,height/2,eyeBallSize,eyeBallSize,eyeShapeSize,eyeShapeSize,eyeBallColour,0);
  //leftEye = new Eyes(width/2 - 80);

  // Create right eye
  rightEye = new Eyes(0,width/2 + 80,height/2,width/2 - 80,height/2,eyeBallSize,eyeBallSize,eyeShapeSize,eyeShapeSize,eyeBallColour,0);
  //rightEye = new Eyes(width/2 + 80);

  // Create the balls
  for (var i = 0; i < num_balls; i++) {
    balls.push(new ball(random(0,width),random(0,height),20,25,40,150,random(0,1000),random(0,1000),getRandomInt(255),getRandomInt(255),getRandomInt(255),0));
  }
}
console.log(state);

// draw()
//
// Set the background and then based on the current state
// display the appropriate information on screen (the title, the game, the game over)
function draw() {
  background(81,181,210);
  strokeWeight(4);

  // Checks the value of the variable "state" to execute either the TITLE page, the GAME or the GAME OVER page
  switch (state) {
    case "TITLE":
      displayTitle();
      break;

    case "GAME":
      if (balls.length == 0) {
				// Sound does not play when there are no balls
				fliesSound.pause();
        // if no more balls display GAME OVER page
        state = "GAME OVER";
      }
      else {
				// Sound plays when there are balls
				 fliesSound.play();
        // case "GAME"
        // when a ball gets close, the chameleon opens the mouth otherwise his mouth is closed
        if (length < 18) {
	      drawFace_openJaw(15,15);
        }
        else drawFace_openJaw(1,1);

      // Drawing the eyes in their position
      strokeWeight(1);
      leftEye.drawEyes();
      rightEye.drawEyes();

      for (var i = 0; i < balls.length; i++) {
        // Moving the balls randomly (as the perlin noise algorithme)
	    balls[i].calculateVelocity();
	    balls[i].update();
	    balls[i].display();
	    // required for the perlin algorithm
	    balls[i].tx += random(0.01,0.02);
	    balls[i].ty += random(0.01,0.03);

	    // calculate distance of each ball from the chameleon
	    balls[i].dist = balls[i].howFarIs();

	    // array used to get the closest ball
	    distances[i] = balls[i].dist;

	    // Ball is chased when mouse is close
	    if(dist(balls[i].x, balls[i].y, mouseX, mouseY) < 70) {
	      balls[i].mouzeover();
	    }
      }
      // find the closest ball
      length = min(distances);
      j = 0;
      while ((distances[j] != length) && (j < num_balls)) {
	    j= j+1;
      }

      // Angle calculation
      a = atan2(balls[j].y - height/2, balls[j].x - width/2);

      // Rotating the eyes so it follows the fly
      leftEye.rotate(a, length);
      rightEye.rotate(a, length);

      // Chameleon's tongue reaches ball when it is very close
      if (length < 15) {
			// Sound plays when the chameleon eats the ball
			slurpSound.play();
	    // Open mouth further
	    drawFace_openJaw(37,37);
	    // draw tongue to reach ball
	    push();
	    fill(255,0,0);
	    strokeWeight(40);
        line(width/2, 6.2 *height/8, balls[j].x, balls[j].y);
	    pop();
	    // remove ball from game
	    balls.splice(j,1);
		if (balls.length == 0) {
          state = "GAME OVER";
		  }
	    // Reinitialise game variables
	    distances = [];
	    length = 30;
        }
      }
    break;

	case "GAME OVER":
      displayGameOver();
    break;
 }
}

// displayTitle()
//
// Displays the title and controls on the screen
function displayTitle() {
  // Set up all the styling elements
  push();
  textAlign(CENTER,CENTER);
  textSize(32);
  //fill(255);
  //stroke(255);
  // Display the text
  text("Chameleon at lunch!",width/2,height/2);
  image(start,width/25,height/25,300,300);
  // Font size goes down
  textSize(12);
  // Display the instructions
  text("Press SPACE to play\nUse Mouse to chase insects\nclick Mouse to blink eyes",width/2,3*height/4);
  pop();

  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
  // ... if it was, change the state to "GAME" so the switch statement in draw()
  // will display the game instead
  state = "GAME";
  }
}

// displayGameOver()
//
// Displays Game Over text
function displayGameOver() {
  push();
  textAlign(CENTER,CENTER);
  textSize(40);
  fill(0);
  //stroke(255);
  text("I'm full!",width/2-30,3*height/4);
  textSize(12);
  text("Press SPACE to play again.",width/2-20,3*height/4+30);
  image(full,width/2,height/3,200,200);
  pop();
  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
  // ... if it was, change the state to "GAME" so the switch statement in draw()
  // will display the game instead
  state = "GAME";
  // run setup to have new balls for the game
  setup();
  }
}

function drawFace_openJaw(a,b){
  // Drawing Chameleon's face
  fill('hsb(160, 100%, 50%)');
  triangle(3*width/8,3*height/4,width/2,3*height/8,5*width/8,3*height/4);
  // Drawing Chameleon's jaw
  fill('hsl(160, 100%, 50%)');
  triangle(3*width/8+30,3*height/4+a,width/2,7*height/8+a,5*width/8-30,3*height/4+b);

}

// windowResized() is called by p5 whenever the window is resized!
function windowResized() {
  // We can use the resizeCanvas() function to resize our canvas to the new window dimensions
  resizeCanvas(windowWidth,windowHeight);
  }
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
