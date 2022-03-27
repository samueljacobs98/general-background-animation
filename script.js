import {
  resizeCanvas,
  setGlobalCompositeOperation,
  initializeGrad,
  getNumberInRange,
} from "./assets/utils.js";

const gcoSelect = document.getElementById("local-composite-operation");
const numberOfCircles = document.getElementById("noc");
const maxR = document.getElementById("maxR");
const maxSpeed = document.getElementById("maxSpeed");
const bgColour = document.getElementById("bg-colour");
const invertBtn = document.getElementById("invert");
const menu = document.querySelector(".panel");
const hideBtn = document.getElementById("hide");
const showBtn = document.getElementById("show");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const properties = {
  GCO: 0,
  numberOfCircles: 20,
  maxR: 1000,
  maxSpeed: 0.5,
  invert: false,
};

class Circle {
  constructor(x, y, radius, maxSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vel = {
      x: getNumberInRange(-maxSpeed, maxSpeed),
      y: getNumberInRange(-maxSpeed, maxSpeed),
    };
    this.gradient = initializeGrad(radius, context, properties.invert);
  }

  drawCircle() {
    context.save();
    context.globalCompositeOperation = setGlobalCompositeOperation(
      properties.GCO
    );
    context.translate(this.x, this.y);
    context.beginPath();
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
  const r = properties.maxR - (Math.random() * properties.maxR) / 2;

  for (let i = 0; i < properties.numberOfCircles; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    circlesArray.push(new Circle(x, y, r, properties.maxSpeed));
  }
  return circlesArray;
};

let circlesArray = createCirclesArray();

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

gcoSelect.addEventListener("change", (newGCO) => {
  properties.GCO = newGCO.target.value;
});

numberOfCircles.addEventListener("change", (newNOC) => {
  properties.numberOfCircles = newNOC.target.value;
  circlesArray = createCirclesArray();
});

maxR.addEventListener("change", (newMaxR) => {
  properties.maxR = newMaxR.target.value;
  circlesArray = createCirclesArray();
});

maxSpeed.addEventListener("change", (newMaxSpeed) => {
  properties.maxSpeed = newMaxSpeed.target.value;
  circlesArray = createCirclesArray();
});

bgColour.addEventListener("change", (inputColour) => {
  const newColour = inputColour.target.value;
  const root = document.querySelector(":root");
  root.style.setProperty("--background-color", newColour);
});

invertBtn.addEventListener("click", () => {
  properties.invert = !properties.invert;
  circlesArray = createCirclesArray();
});

hideBtn.addEventListener("click", () => {
  menu.style.setProperty("display", "none");
  showBtn.style.setProperty("display", "block");
});

showBtn.addEventListener("click", () => {
  menu.style.setProperty("display", "block");
  showBtn.style.setProperty("display", "none");
});
