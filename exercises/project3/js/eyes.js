// Eyes
// A class that defines the eyes, the eyelashes and the blinking when you press your mouse
function Eyes(x) {
  this.click = 0;
  this.x = x;
  this.y = height/2;
  this.xb = x;
  this.yb = height/2;
  this.sizeX = eyeBallSize;
  this.sizeY = eyeBallSize;
  this.sizeShapeX = eyeShapeSize;
  this.sizeShapeY = eyeShapeSize;
  this.eyeBallColour = eyeBallColour;
  // Adding lashes property to the class
  this.lashes = 0;
}

  Eyes.prototype.drawUpperLashes = function() {
    // Drawing the upper eyelashes function of the left and the right eye
    strokeWeight(4);
    line(width/2 - 87, height/2 - 55, width/2 - 90, height/2 -90);
    strokeWeight(4);
    line(width/2 - 107, height/2 - 45, width/2 - 135, height/2 - 85);
    strokeWeight(4);
    line(width/2 - 122, height/2 - 34, width/2 - 180, height/2 - 80);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 90, height/2 - 90);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 135, height/2 - 85);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 180, height/2 - 80);
}

  Eyes.prototype.drawLowerLashes = function() {
    // Drawing the lower function eyelashes of the left and the right eye
    strokeWeight(4);
    line(width/2 - 80, height/2, width/2 - 90, height/2 +90);
    strokeWeight(4);
    line(width/2 - 80, height/2, width/2 - 135, height/2 + 85);
    strokeWeight(4);
    line(width/2 - 80, height/2, width/2 - 180, height/2 + 80);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 90, height/2 + 90);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 135, height/2 + 85);
    strokeWeight(4);
    line(width/2 + 80, height/2, width/2 + 180, height/2 + 80);
}

  Eyes.prototype.drawEyes = function() {
    // Controlling the drawing of the upper lashes or the lower lashes
    if (this.lashes == 0) {
   this.drawUpperLashes();
   }
   else {
   this.drawLowerLashes();
   }
    // Drawing the eyes
    fill(30);
    ellipse(this.x, this.y, this.sizeShapeX, this.sizeShapeY);
    fill(this.eyeBallColour);
  	ellipse(this.x, this.y, eyeSize, eyeSize);
    fill(0);
    ellipse(this.xb, this.yb, this.sizeX, this.sizeY);

    // Controlling the event of blinking by clicking the mouse
    if (mouseIsPressed) {
      this.eyeBallColour = 0;
      this.lashes = 1;
   } else {
      this.eyeBallColour = 255;
      this.lashes = 0;
    }
  }


  Eyes.prototype.rotate = function(angle, length) {
    //  Controlling the rotation of the eyes when following a target
    if (length < 20) this.xb = this.x + cos(angle)*length;
    else this.xb = this.x + cos(angle)*30;
    if (length < 20) this.yb = this.y + sin(angle)*length;
    else this.yb = this.y + sin(angle)*30;
    if (this.xb > this.x + 30 || this.xb < this.x - 30) this.xb = this.x + cos(angle)*30;
    if (this.yb > this.y + 30 || this.yb < this.y - 30) this.yb = this.y + sin(angle)*30;

}
