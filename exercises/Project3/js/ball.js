// ball
// A class to define how the balls would behave when reaching the edges of the canvas: they will just bounce

// ball constructor
// Sets the properties with the provided arguments
function ball(x,y,vx,vy,size,speed,tx,ty,r,g,b,dist) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.tx = tx;
  this.ty = ty;
  this.r = r;
  this.g = g;
  this.b = b;
  this.dist = dist;
}

// update()
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, this.size/2, height - this.size/2);
  this.x = constrain(this.x, this.size/2, width - this.size/2);

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
ball.prototype.display = function() {
  imageMode(CENTER);
  push();
  noStroke();  
  fill(this.r,this.g,this.b);
  //image(this.imgball,this.x, this.y, this.size, this.size);
  //image(this.imgball,0, 0, 10, 10);
  ellipse(this.x, this.y, this.size, this.size);
   pop();
}

// Angle calculation
ball.prototype.followMe = function() {
  a = atan2(this.y - height/2, this.x - width/2);
  return a;
}

// Proportional distance
ball.prototype.howFarIs = function() {
  length = dist(this.x, this.y, width/2, 6.2 *height/8)/15;
  return length;
}

ball.prototype.calculateVelocity = function() {
  this.vx = map(noise(this.tx),0,1,-maxSpeed,maxSpeed);
  this.vy = map(noise(this.ty),0,1,-maxSpeed,maxSpeed);
}
