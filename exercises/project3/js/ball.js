// Ball
// A class to define how the balls would behave when reaching the edges of the canvas: they will just bounce

// Ball constructor
// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed,tx,ty,imgfly) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = 60;
  this.speed = speed;
  this.tx = tx;
  this.ty = ty;
  this.fill = 100;
  this.imgfly = imgfly;
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
  this.x = constrain(this.x, 0, width - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
    if (this.x < 0) {
          this.vx = -this.vx;
  }
    else if (this.x > width) {
	            this.vx = -this.vx;
  }
    if (this.y < 0) {
	       this.vy = -this.vy;
  }
    else if (this.y > height) {
              this.vy = -this.vy;
  }
}

// display()
//
// Draw the ball
Ball.prototype.display = function() {
  image(this.imgfly,this.x, this.y, this.size, this.size);
}

// Angle calculation
Ball.prototype.followMe = function() {
  a = atan2(this.y - height/2, this.x - width/2);
  return a;
}

// Proportional distance
Ball.prototype.howFarIs = function() {
  length = dist(this.x, this.y, width/2, height/2)/15;
  return length;
}

Ball.prototype.calculateVelocity = function() {
  this.vx = map(noise(this.tx),0,1,-maxSpeed,maxSpeed);
  this.vy = map(noise(this.ty),0,1,-maxSpeed,maxSpeed);
}
