import { globalCompositeOperationOptions, colorStopValues } from "./data.js";

export const resizeCanvas = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
};

export const setGlobalCompositeOperation = (option) => {
  return globalCompositeOperationOptions[option];
};

export const initializeGrad = (radius, context, invert) => {
  const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
  const colorStops = [];

  colorStopValues.forEach((stop) => {
    colorStops.push(`rgba(${stop.r}, ${stop.g}, ${stop.b}, ${stop.a})`);
  });

  invert = invert || false;
  if (invert) colorStops.reverse();

  colorStops.forEach((stop, index) => {
    gradient.addColorStop(index / colorStops.length, stop);
  });
  return gradient;
};

export const getNumberInRange = (min, max) => {
  const range = max - min;
  return min + range * Math.random();
};
