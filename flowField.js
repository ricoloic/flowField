function FlowField(_scl = 15, _flows) {
  this.xoff = 0;
  this.yoff = 0;
  this.zoff = 0;
  this.inc = 0.05;
  this.incZ = 0.001;
  this.scl = _scl;
  this.cols = Math.floor(_width / scl);
  this.rows = Math.floor(_height / scl);
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
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let flow = this.flows[index];
        flow.update(this.xoff, this.yoff, this.zoff);
      }
    }
  }

  this.forFlow = function (func) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let index = x + y * this.cols;
        let flow = this.flows[index];
        return func(flow, { index, x, y });
      }
    }
  }

  this.increment = function () {
    this.yoff = 0;
    for (let y = 0; y < this.rows; y++) {
      this.xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        this.xoff += this.inc;
      }
      this.yoff += this.inc;
    }
    this.zoff += this.incZ;
  }
}