var canvas = document.getElementById("canvas");
// установка размеров равным размеру экрана
const width = document.body.clientWidth;
const height = document.documentElement.scrollHeight;
canvas.width = width;
canvas.height = height;

//ой плохие глобальные переменные
let timerId;
let startX = Math.round(width / 2) - 50;
let startY = height - 50;

let context = canvas.getContext("2d");

canvas.addEventListener("mousedown", event => {
  start = new Date();
});
canvas.addEventListener("mouseup", function() {
  let endX = event.clientX;
  let endY = event.clientY;

  end = new Date();
  let timeOfClick = end - start;
  let speed = mathPart(endX, endY, timeOfClick);
  timerId = setInterval(draw, 20, endX, endY, speed);
});

const mapGenerator = () => {
  /**условия
   * 1. центр планеты может находиться не ближе чем 1% от карты
   * 2.планеты не должны пересекаться
   */
  const radius = getRandomInt(10, 50);
  const mass = Math.pow(radius, 3);

  const X = getRandomInt(70, width - 70);
  const Y = getRandomInt(50, startY - 100);
  context.beginPath();
  context.arc(X, Y, radius, 0, 2 * Math.PI);
  context.stroke();
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

mapGenerator();
context.fillStyle = "green";
console.log("draw", startX, startY);
context.fillRect(startX, startY, 50, 50);

function draw(endX, endY, speed) {
  // Очистить квадрат
  console.log("clear", startX, startY);

  context.clearRect(startX - 1, startY - 1, 55, 55);

  context.fillStyle = "green";

  startX += speed[0];
  startY -= speed[1];
  console.log("draw", startX, startY);

  context.fillRect(startX, startY, 50, 50);

  if (Math.round(startX) === endX) {
    clearInterval(timerId);
  }
}

let detectOfSpeed = timeOfClick => {
  let roundedTime = Math.round(timeOfClick);
  if (roundedTime === 100) {
    return 1;
  }
  if (roundedTime >= 2000) {
    return 20;
  }
  return roundedTime / 100;
};

const mathPart = (endX, endY, timeOfClick) => {
  let speed = detectOfSpeed(timeOfClick);
  let deltaX = endX - startX;
  let deltaY = startY - endY;
  let hypotenuse = Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
  let cos = deltaX / hypotenuse;
  let sin = deltaY / hypotenuse;
  let speedX = speed * cos;
  let speedY = speed * sin;

  return [speedX, speedY];
};
