let inputDir = { x: 0, y: 0 };
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
const board = document.getElementById('board');

// 🎵 Audio setup
const foodSound = new Audio("food.mp3.mp3");
const gameOverSound = new Audio("gameover.mp3.mp3");
const moveSound = new Audio("move.mp3.mp3");
const musicSound = new Audio("music.mp3.mp3");

musicSound.loop = true;
musicSound.play();

// 🎮 Game loop
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
}

// 💥 Collision check
function isCollide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  if (
    snake[0].x <= 0 || snake[0].x >= 18 ||
    snake[0].y <= 0 || snake[0].y >= 18
  ) return true;
  return false;
}

// 🧠 Game logic
function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over Bhai! Press OK to restart.");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.currentTime = 0;
    musicSound.play();
    return;
  }

  // 🍎 Food khaya?
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y
    });

    let a = 2, b = 16;
    food = {
      x: Math.floor(a + Math.random() * (b - a)),
      y: Math.floor(a + Math.random() * (b - a))
    };
  }

  // 🐍 Snake movement
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // 🎨 Draw on board
  board.innerHTML = "";
  snakeArr.forEach((e, i) => {
    let element = document.createElement("div");
    element.style.gridRowStart = e.y;
    element.style.gridColumnStart = e.x;
    element.classList.add(i === 0 ? "head" : "snake");
    board.appendChild(element);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// ⌨️ Controls
window.addEventListener("keydown", (e) => {
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      break;
  }
});

// ✅ Start game
window.requestAnimationFrame(main);
