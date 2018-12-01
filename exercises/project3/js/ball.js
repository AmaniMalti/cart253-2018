// Ball
// A class to define how a ball behaves when reaching the edges of the canvas: it will just bounce

// Ball constructor
// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.fill = 100;
}

// update()
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
    // Check for touching left or right edge and reverse velocity if so
  if (this.x === 0 || this.x + this.size === width) {
    this.vx = -this.vx;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
  ellipse(this.x, this.y, this.size, this.size);
}
