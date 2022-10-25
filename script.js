let starField;
let starField2;

function setup() {
  createCanvas(400, 400);
  starField2 = new StarField(4, 1, 3, 1);
  starField = new StarField(8, 1, 4, 2);
}

function draw() {
  background(0);
  starField2.draw();
  starField.draw();
}
