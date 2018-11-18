// Eyes
// A class that defines the eyes and how to draw the eyes
function Eyes(x) {
  this.x = x;
  this.y = height/2;
  this.xb = x;
  this.yb = height/2;
  this.sizeX = eyeBallSize;
  this.sizeY = eyeBallSize;

// Drawing the eyes
  this.drawEyes = function() {
    fill(255);
  	ellipse(this.x, height/2, eyeSize, eyeSize);
    fill(0);
    ellipse(this.xb, this.yb, this.sizeX, this.sizeY);
  }
}
