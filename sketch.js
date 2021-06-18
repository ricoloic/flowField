const
	scl = 10;

let
	fs,
	particles = [],
	flowField,
	graphics,
	_width = 1200,
	_height = 600;


function getSize() {
	const _widthToRemove = (window.innerWidth - 50) % scl;
	const _heightToRemove = (window.innerHeight - 30) % scl;
	const _w = window.innerWidth - 50 - _widthToRemove;
	const _h = window.innerHeight - 30 - _heightToRemove;
	return {_w, _h};
}

function setSize() {
	const {_w, _h} = getSize();
	_width = _w;
	_height = _h;
}

function setup() {
	setSize();
	const canvas = createCanvas(_width, _height, P2D);
	const mainNodeDOM = canvas.parent();
	canvas.parent("canvas-container");
	mainNodeDOM.remove();
	// fps = createP('');

	setCondition();
	flowField = new FlowField(scl, setFlowGrid());

	for (let i = 0; i < 1000; i++) {
		const v = createVector(random(_width), random(_height));
		particles.push(new Particle(v));
	}
}

function draw() {
	// background(225);

	flowField.update();
	// flowField.show();

	particles.map((p) => {
		p.follow(flowField);
		p.show();
	});

	// fps.html(floor(frameRate()));
	// noLoop();
}

function setCondition() {
	background(255);
	strokeWeight(1);
	stroke(0, 3);
	noiseDetail(35, 0.3);
}

function setFlowGrid() {
	let flows = [];
	rows = floor(_height / scl) + 1;
	cols = floor(_width / scl) + 1;

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			flows.push(new Flow());
		}
	}
	return flows;
} 