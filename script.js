import {
  resizeCanvas,
  setGlobalCompositeOperation,
  initializeGrad,
  getNumberInRange,
} from "./assets/utils.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Circle {
  constructor(x, y, radius, maxSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vel = {
      x: getNumberInRange(-maxSpeed, maxSpeed),
      y: getNumberInRange(-maxSpeed, maxSpeed),
    };
    this.gradient = initializeGrad(radius, context);
  }

  drawCircle() {
    context.save();
    context.globalCompositeOperation = setGlobalCompositeOperation(4);
    context.translate(this.x, this.y);
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.gradient;
    context.fill();
    context.restore();
  }

  bounce() {
    if (this.x <= 0 || this.x >= width) this.vel.x *= -1;
    if (this.y <= 0 || this.y >= height) this.vel.y *= -1;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}

const createCirclesArray = () => {
  const circlesArray = [];
  const numberOfCircles = 10;

  for (let i = 0; i < numberOfCircles; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const maxR = 300;
    const r = maxR - (Math.random() * maxR) / 2;
    const maxSpeed = 5;
    circlesArray.push(new Circle(x, y, r, maxSpeed));
  }
  return circlesArray;
};

const circlesArray = createCirclesArray();

const sketch = () => {
  circlesArray.forEach((circle) => {
    circle.update();
    circle.drawCircle();
    circle.bounce();
  });
};

const animate = () => {
  context.clearRect(0, 0, width, height);
  sketch();
  requestAnimationFrame(animate);
};

animate();
