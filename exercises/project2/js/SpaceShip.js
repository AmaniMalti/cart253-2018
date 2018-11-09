// SpaceShip
//
// A class to define how a SpaceShip behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function SpaceShip(x,y,vx,vy,w,h,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.w = w;
  this.h = h;
  this.speed = speed;

}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
SpaceShip.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.h);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.h === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.

///////// NEW /////////
SpaceShip.prototype.isOffScreen = function () {
 // Keep the SpaceShip inside the canvas
 if (this.x + this.w > width){
   // Incrementing score
   return (2);
 }
  else if (this.x + this.w < 0 ) {
    return (1);
  }
  else {
    return (0);
  }
}
///////// END NEW /////////

// display()
//
// Draw the SpaceShip as a rectangle on the screen
SpaceShip.prototype.display = function () {
  imageMode(CORNER);
  image(img3, this.x,this.y,75,75);
}


// reset()
//
// Set position back to the middle of the screen
SpaceShip.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
