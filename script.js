const character = document.querySelector(".character");
const obstacle = document.querySelector(".obstacle");

function jump() {
  const jumpInterval = setInterval(() => {
    const characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    if (characterTop > 320) {
      character.style.top = characterTop - 8 + "px";
    } else {
      clearInterval(jumpInterval);
      const fallInterval = setInterval(() => {
        const characterTop = parseInt(
          window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop < 450) {
          character.style.top = characterTop + 8 + "px";
        } else {
          clearInterval(fallInterval);
        }
      }, 20);
    }
  }, 20);
}
function gameLoop() {
  setInterval(() => {
    const obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );
    if (obstacleLeft < -50) {
      obstacle.style.transition = "none";
      obstacle.style.left = "100%";
    } else if (conditions()) {
      alert("game Over");
    } else {
      obstacle.style.transition = "left 2s ease";
      obstacle.style.left = obstacleLeft - 2500 + "px";
    }
  }, 30);
}
function conditions() {
  const characterRect = character.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return !(
    characterRect.bottom < obstacleRect.top ||
    characterRect.top > obstacleRect.bottom ||
    characterRect.right < obstacleRect.left ||
    characterRect.left > obstacleRect.right
  );
}
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});
gameLoop();
