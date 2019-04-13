var canvas = document.getElementById("canvas");
// установка размеров равным размеру экрана
const width = document.body.clientWidth;
const height = document.documentElement.scrollHeight;
canvas.width = width;
canvas.height = height;

//ой плохие глобальные переменные
let timerId;
let startX = width / 2 - 50;
let startY = height - 50;

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

let context = canvas.getContext("2d");

context.fillStyle = "green";
context.fillRect(startX, startY, 50, 50);

function draw(endX, endY, speed) {
  // console.log(arguments);
  // Очистить холст
  context.clearRect(startX, startY, 50, 50);

  context.fillStyle = "green";
  // startX += 1;

  startX += speed[0];
  startY -= speed[1];
  context.fillRect(startX, startY, 50, 50);
  console.log(startX, endX);
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
  // if (endX < startX) {
  //   console.log("зашли");
  //   let temp = speedX * -1;
  //   speedX = temp;
  // }
  let speedY = speed * sin;
  console.log("math", speedX, speedY);
  return [speedX, speedY];
};
