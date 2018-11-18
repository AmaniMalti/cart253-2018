// Eyes
// A class that defines the eyes and how to draw the eyes
function Eyes(x) {
  this.x = x;
  this.y = height/2;
  this.xb = x;
  this.yb = height/2;
  this.sizeX = eyeBallSize;
  this.sizeY = eyeBallSize;
  this.sizeShapeX = eyeShapeSize;
  this.sizeShapeY = eyeShapeSize;

// Drawing the eyes
  this.drawEyes = function() {
    fill(30);
    ellipse(this.x, this.y, this.sizeShapeX, this.sizeShapeY);
    fill(255);
  	ellipse(this.x, this.y, eyeSize, eyeSize);
    fill(0);
    ellipse(this.xb, this.yb, this.sizeX, this.sizeY);
  }
}
