function Particle(vec) {
	this.pos = vec;
	this.prevPos = this.pos.copy();
	this.vel = p5.Vector.random2D();
	this.acc = createVector(0, 0);
	this.limitVel = 4;
}

Particle.prototype.update = function () {
	this.updatePrev();
	this.vel.add(this.acc);
	this.vel.limit(this.limitVel);
	this.pos.add(this.vel);
	this.acc.mult(0);
}

Particle.prototype.applyForce = function (force) {
	this.acc.add(force);
}

Particle.prototype.show = function () {
	line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
}

Particle.prototype.updatePrev = function () {
	this.prevPos.x = this.pos.x;
	this.prevPos.y = this.pos.y;
}

Particle.prototype.wrapAround = function () {
	if (this.pos.x > _width) {
		this.pos.x = 0;
		this.updatePrev();
	} else if (this.pos.x < 0) {
		this.pos.x = _width;
		this.updatePrev();
	}

	if (this.pos.y > _height) {
		this.pos.y = 0;
		this.updatePrev();
	} else if (this.pos.y < 0) {
		this.pos.y = _height;
		this.updatePrev();
	}
}

Particle.prototype.follow = function (flowField) {
	this.wrapAround();
	const x = floor(this.pos.x / scl);
	const y = floor(this.pos.y / scl);
	const index = x + y * flowField.cols;
	const force = flowField.flows[index].vec;

	this.applyForce(force);
	this.update();
}
