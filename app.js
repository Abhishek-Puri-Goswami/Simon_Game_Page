let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];

let level = 0;
let started = false;
let highScore = 0;
let h2 = document.querySelector("h2");

alert("Toggle Fullscreen (Press F11) for better experience.");

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 300);
}

function levelUp() {
  userSeq = [];

  level++;
  h2.innerText = `Level ${level}`;

  let interval = 350; // interval in milliseconds
  let timeout = 0;

  for (let i = 0; i < gameSeq.length; i++) {
    timeout += interval;
    setTimeout(function (color) {
      color = gameSeq[i];
      let btn = document.querySelector(`.${color}`);
      gameFlash(btn);
    }, timeout);
  }

  timeout += interval;
  setTimeout(function () {
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    let btn = document.querySelector(`.${randColor}`);
    gameFlash(btn);
  }, timeout);
}

// any key pressed
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("Game has started!");
    levelUp();
  }
});

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function wrongFlash() {
  let body = document.querySelector("body");
  body.classList.add("wrongFlash");
  setTimeout(function () {
    body.classList.remove("wrongFlash");
  }, 300);
}

// button press event
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  if (userSeq.length === gameSeq.length) {
    console.log("Game :", ...gameSeq);
    console.log("User :", ...userSeq);

    for (let i = 0; i < gameSeq.length; i++) {
      if (userSeq[i] !== gameSeq[i]) {
        h2.innerHTML = `Game Over! Your score was <b>${
          level - 1
        }</b><br>Press any key to restart`;
        wrongFlash();
        if (level - 1 > highScore) {
          highScore = level - 1;
          document.querySelector(".score").innerText = `${highScore}`;
        }
        resetGame();
        return;
      }
    }
    setTimeout(levelUp, 1000);
  }
}
