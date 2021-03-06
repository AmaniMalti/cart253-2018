// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = 15;
  this.speed = speed;
  this.fill = 100;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.

///////// NEW /////////
Ball.prototype.isOffScreen = function() {
  // Check for which side the ball went off screen
  if (this.x - this.size > width) {
    // Incrementing score
    return (2);
  } else if (this.x + this.size < 0) {
    return (1);
  } else {
    return (0);
  }
}
///////// END NEW /////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
  noStroke();
  fill(255);
  ellipse(this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      ///////// NEW /////////
      // play Racquet Hit Sound
      return true;
    }
  }
  // Do not play Racquet Hit Sound
  else return false;
  ///////// END NEW /////////
}
///////// NEW /////////
// handleCollision(SpaceShip)
//
// Check if this SpaceShip overlaps the ball
// and if so reverse x velocity to bounce
Ball.prototype.handleCollisionSpaceShip = function(SpaceShip) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > SpaceShip.x && this.x < SpaceShip.x + SpaceShip.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > SpaceShip.y && this.y < SpaceShip.y + SpaceShip.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      console.log("collisions");
      this.x -= 4 * this.vx;
      this.y -= 4 * this.vy;
      this.vx += 3;
      this.vy += 5;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      ///////// NEW /////////
      // play Racquet Hit Sound
      return true;
    }
  }
  // Do not play Racquet Hit Sound
  else return false;
  ///////// END NEW /////////
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
  this.x = width / 2;
  this.y = height / 2;
}
