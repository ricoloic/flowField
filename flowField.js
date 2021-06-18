function FlowField(_scl = 15, _flows) {
	this.xoff = 0;
	this.yoff = 0;
	this.zoff = 0;
	this.inc = 0.1;
	this.incZ = 0.003;
	this.scl = _scl;
	this.cols = Math.floor(_width / scl) + 1;
	this.rows = Math.floor(_height / scl) + 1;
	this.flows = _flows;

	this.show = function () {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				let index = x + y * this.cols;
				let flow = this.flows[index];
				flow.show(x, y);
			}
		}
	}

	this.update = function () {
		this.yoff = 0;
		for (let y = 0; y < this.rows; y++) {
			this.xoff = 0;
			for (let x = 0; x < this.cols; x++) {
				this.xoff += this.inc;
				let index = x + y * this.cols;
				let flow = this.flows[index];
				flow.update(this.xoff, this.yoff, this.zoff);
			}
			this.yoff += this.inc;
		}
		this.zoff += this.incZ;
	}
}