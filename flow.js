function Flow() {
  this.vec = 0;
}

Flow.prototype.update = function(xoff, yoff, zoff) {
  let noiseAngle = noise(xoff, yoff, zoff) * TWO_PI;
  let noiseVector = p5.Vector.fromAngle(noiseAngle).setMag(15);
  this.vec = noiseVector;
}

Flow.prototype.show = function(x, y) {
  push();
  translate(x * scl, y * scl);
  rotate(this.vec.heading());
  stroke(0);
  strokeWeight(1);
  line(0, 0, scl, 0);
  pop();
}