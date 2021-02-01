const
  scl = 50,
  _width = 1200,
  _height = 600;

let
  fs,
  particles = [],
  flowField,
  graphics;

function setup() {
  createCanvas(_width, _height, P2D);
  fps = createP('');

  setCondition();
  flowField = new FlowField(scl, setFlowGrid());

  for (let i = 0; i < 5; i++) {
    const v = createVector(0, 0);
    console.log('before: ', v)
    particles.push(new Particle(v));
  }
}

function draw() {
  // background(225);

  flowField.update();
  // flowField.show();
  flowField.increment();

  particles.map((p) => {
    p.follow(flowField);
    p.show();
  });

  fps.html(floor(frameRate()));
}

function setCondition() {
  background(255);
  strokeWeight(4);
  stroke(0, 3);
  noiseDetail(10, 0.6);
}

function setFlowGrid() {
  let flows = [];
  cols = floor(width / scl);
  rows = floor(height / scl);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      flows.push(new Flow());
    }
  }
  return flows;
} 