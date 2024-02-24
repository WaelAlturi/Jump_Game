const character = document.querySelector(".character");
const obstacle = document.querySelector(".obstacle");
const start = document.querySelector(".startButton");

let playerSpeed = 18;
let enemySpeed = 35000;
let levelUp = 500;

const scoreBoreder = document.querySelector(".score");
let score = 0;

function jump() {
  const jumpInterval = setInterval(() => {
    const characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    if (characterTop > 220) {
      character.style.top = characterTop - 8 + "px";
    } else {
      clearInterval(jumpInterval);
      const fallInterval = setInterval(() => {
        const characterTop = parseInt(
          window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop < 350) {
          character.style.top = characterTop + 8 + "px";
        } else {
          clearInterval(fallInterval);
        }
      }, playerSpeed);
    }
  }, playerSpeed);
}
function gameLoop() {
  character.style.display = "unset";
  obstacle.style.display = "unset";
  start.style.display = "none";
  const game = setInterval(() => {
    const obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );
    if (obstacleLeft < -250) {
      obstacle.style.transition = "none";
      obstacle.style.left = "85%";
      if (score > levelUp) {
        enemySpeed += 20000;
        levelUp += 1000;
      }
    } else if (conditions()) {
      alert("game Over");
      score = 0;
      enemySpeed = 35000;
      start.style.display = "unset";
      clearInterval(game);
    } else {
      obstacle.style.transition = "left 10s ease";
      obstacle.style.left = obstacleLeft - enemySpeed + "px";
      scoreBoreder.style.display = "block";
      score++;
      scoreBoreder.innerHTML = "SCORE:" + score;
    }
  }, 10);
}
function conditions() {
  const characterRect = character.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return !(
    characterRect.bottom - 20 < obstacleRect.top ||
    characterRect.top > obstacleRect.bottom - 20 ||
    characterRect.right - 50 < obstacleRect.left ||
    characterRect.left > obstacleRect.right - 50
  );
}
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});
