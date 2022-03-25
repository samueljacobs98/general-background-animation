// Get the Canvas
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// // Canvas Size
// const resizeCanvas = () => {
//   let width = window.innerWidth;
//   let height = window.innerHeight;
//   canvas.width = width;
//   canvas.height = height;
// };

// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// Circle class
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  // Initialise Gradient
  initializeGrad() {
    let gradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "red");
    return gradient;
  }

  // Draw circle
  drawCircle() {
    context.globalCompositeOperation = "destination-over";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.initializeGrad();
    context.fill();
  }
}

// const circle = new Circle(50, 50, 50);
// circle.drawCircle();

// Create circles array function
const createCirclesArray = () => {
  // Create Array
  const circlesArray = [];
  // Choose number of circles
  const numberOfCircles = 30;

  for (let i = 0; i < numberOfCircles; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const maxR = 300;
    const r = maxR - (Math.random() * maxR) / 2;
    circlesArray.push(new Circle(x, y, r));
  }
  return circlesArray;
};

// create circles array
const circlesArray = createCirclesArray();
// console.log(circlesArray);
circlesArray.forEach((circle) => {
  console.log(circle);
  circle.drawCircle();
});

// class Agent {
//   constructor(x, y) {
//     this.pos = new Vector(x, y);
//     this.vel = new Vector(-1 + Math.random() * 2, -1 + Math.random() * 2);
//     this.radius = 40 + Math.random() * 80;
//   }

//   bounce(width, height) {
//     if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
//     if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
//   }

//   update() {
//     this.pos.x += this.vel.x;
//     this.pos.y += this.vel.y;
//   }

//   draw(context) {
//     context.save();
//     context.translate(this.pos.x, this.pos.y);

//     context.lineWidth = 4;

//     context.beginPath();
//     context.arc(0, 0, this.radius, 0, Math.PI * 2);
//     context.fill();
//     context.stroke();

//     context.restore();
//   }
// }
