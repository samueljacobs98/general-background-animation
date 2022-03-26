export const resizeCanvas = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
};

export const setGlobalCompositeOperation = (option) => {
  const options = [
    "source-over",
    "destination-over",
    "destination-atop",
    "xor",
    "darken",
    "difference",
    "hue",
    "saturation",
  ];

  return options[option];
};

export const initializeGrad = (radius, context) => {
  let gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.0)");
  gradient.addColorStop(0, `rgba(0, 0, 0, 0.8)`);
  gradient.addColorStop(0, `rgba(43, 38, 255, 0.01)`);
  gradient.addColorStop(1, `rgba(210, 209, 255, 1)`);
  return gradient;
};

export const getNumberInRange = (min, max) => {
  const range = max - min;
  return min + range * Math.random();
};
