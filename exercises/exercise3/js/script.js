/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
var targetImageBgd;

// Velocity and speed target image
var speed = 2;
var targetVX = 5;
var targetVY = 0;


// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
// Added more Decoy images from 100 to 500
var numDecoys = 500;

// Keep track of whether they've won
var gameOver = false;

// Size of decoy image
var widthD;
var heightD;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  // Added the image in the corner
  targetImageBgd = loadImage("assets/images/animals-target-bgd.png");


  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background('#fae');
  imageMode(CENTER);

  // Reduce size of decoy image
  var widthD = decoyImage1.width/2;
  var heightD = decoyImage1.height/2;



  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,widthD,heightD);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,widthD,heightD);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,widthD,heightD);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,widthD,heightD);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,widthD,heightD);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,widthD,heightD);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,widthD,heightD);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,widthD,heightD);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,widthD,heightD);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,widthD,heightD);
    }



  }
  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  //Adding while loop to make sure the sausage dog doesn't go underneath the targetImageBgd
  while ((targetX < ((targetImageBgd.width) * 1.5)) && (targetY < ((targetImageBgd.height) * 1.5))) {
  // Choose another location
  targetX = random(0,width);
  targetY = random(0,height);
}

  /*  console.log(targetX);
    console.log(targetX < (targetImageBgd.width) * 1.5);
    console.log(targetY < (targetImageBgd.height) * 1.5);*/

    // And draw it (this means it will always be on top)
    image(targetImage,targetX,targetY,targetImage.width/2,targetImage.height/2);
}

function draw() {
  if (gameOver) {
    // Change background color if it's gameover
    background('rgba(100%,0%,100%,0.5)');

    // Make the sausage dog run on the x axis
    targetX += targetVX;
    // And draw it (this means it will always be on top)
    image(targetImage,targetX,targetY);

     if (targetX > width + targetImage.width/2) {
        targetX = - targetImage.width/2
         }

         // Make the sausage dog run on the Y axis
         targetY += targetVY;
         // And draw it (this means it will always be on top)
         image(targetImage,targetX,targetY,targetImage.width*2,targetImage.height*2);

          if (targetY > height + targetImage.height/2) {
             targetY = - targetImage.height/2
           }


  // Prepare our typography
    textFont("FUTURA");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WON!!!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    /*ellipse(targetX,targetY,targetImage.width,targetImage.height);*/

  }

  //image background added
    image(targetImageBgd,targetImageBgd.width/2,targetImageBgd.height/2,targetImageBgd.width,targetImageBgd.height);
}


// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      var widthD = decoyImage1.width/2;
      var heightD = decoyImage1.height/2;
      gameOver = true;

    }
  }
}
