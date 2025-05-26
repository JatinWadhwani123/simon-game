let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function playSound(type) {
  const sound = document.getElementById(`sound-${type}`);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  playSound("click");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  playSound("click");
  setTimeout(() => btn.classList.remove("userflash"), 150);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);

  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound("wrong");
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  let color = btn.getAttribute("id");
  userSeq.push(color);
  userFlash(btn);
  checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) =>
  btn.addEventListener("click", btnPress)
);

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
