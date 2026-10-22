
const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const timerDisplay = document.getElementById("timer");
const comboDisplay = document.getElementById("combo");
const statusDisplay = document.getElementById("status");
const levelDisplay = document.getElementById("level");
const messageDisplay = document.getElementById("message");

const startButtonId = "start-btn";

let score = 0;
let combo = 0;
let timeLeft = 30;
let level = 1;
let playing = false;

let gameTimer;
let targetTimer;
let comboTimer;

let highScore = Number(localStorage.getItem("neonRushHighScore")) || 0;

highScoreDisplay.textContent = highScore;

// Start or restart the game
document.addEventListener("click", function (event) {
  if (event.target.id === startButtonId && !playing) {
    startGame();
  }
});

function startGame() {
  score = 0;
  combo = 0;
  timeLeft = 30;
  level = 1;
  playing = true;

  clearInterval(gameTimer);
  clearTimeout(targetTimer);
  clearTimeout(comboTimer);

  updateDisplay();

  statusDisplay.textContent = "GAME IN PROGRESS";
  messageDisplay.textContent = "Go! Hit those targets!";
  levelDisplay.textContent = "LEVEL 1";

  board.innerHTML = "";

  spawnTarget();

  // Countdown timer
  gameTimer = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Create a random target
function spawnTarget() {
  if (!playing) return;

  clearTimeout(targetTimer);

  const target = document.createElement("button");
  target.classList.add("target");
  target.type = "button";
  target.setAttribute("aria-label", "Hit target");

  const colors = [
    "#4d8dff",
    "#b56aff",
    "#4bf2b0",
    "#ffcc4d",
    "#ff5478"
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  // Targets shrink as your score increases
  const size = Math.max(27, 60 - Math.floor(score / 5) * 3);

  const maxX = Math.max(0, board.clientWidth - size);
  const maxY = Math.max(0, board.clientHeight - size);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  target.style.width = size + "px";
  target.style.height = size + "px";
  target.style.left = x + "px";
  target.style.top = y + "px";
  target.style.setProperty("--target-color", color);

  // Handle a successful hit
  target.addEventListener("click", function () {
    if (!playing) return;

    combo++;

    // Every fifth consecutive hit earns a bonus
    const points = combo % 5 === 0 ? 3 : 1;
    score += points;

    messageDisplay.textContent =
      points === 3 ? "COMBO BONUS! +3" : "Nice hit! +" + points;

    // Show floating points
    const pop = document.createElement("div");
    pop.classList.add("pop");
    pop.textContent = "+" + points;
    pop.style.left = x + "px";
    pop.style.top = y + "px";
    board.appendChild(pop);

    setTimeout(function () {
      pop.remove();
    }, 600);

    target.remove();

    clearTimeout(comboTimer);

    comboTimer = setTimeout(function () {
      combo = 0;
      updateDisplay();
    }, 1800);

    updateDisplay();

    // Level increases every 10 points
    const newLevel = Math.floor(score / 10) + 1;

    if (newLevel > level) {
      level = newLevel;
      messageDisplay.textContent = "LEVEL UP! Level " + level;
      levelDisplay.textContent = "LEVEL " + level;
    }

    // A new target appears immediately
    spawnTarget();
  });

  board.appendChild(target);

  // Missed targets disappear more quickly at higher levels
  const targetLifetime = Math.max(450, 1500 - (level - 1) * 100);

  targetTimer = setTimeout(function () {
    target.remove();

    combo = 0;
    updateDisplay();

    spawnTarget();
  }, targetLifetime);
}

// Update the HUD
function updateDisplay() {
  scoreDisplay.textContent = score;
  highScoreDisplay.textContent = highScore;
  timerDisplay.textContent = timeLeft;
  comboDisplay.textContent = "x" + combo;
}

// Finish the game
function endGame() {
  playing = false;

  clearInterval(gameTimer);
  clearTimeout(targetTimer);
  clearTimeout(comboTimer);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("neonRushHighScore", highScore);
    messageDisplay.textContent = "NEW PERSONAL BEST!";
  } else {
    messageDisplay.textContent = "Time's up! Try again.";
  }

  highScoreDisplay.textContent = highScore;
  statusDisplay.textContent = "GAME OVER";

  board.innerHTML = `
    <div class="welcome">
      <div class="welcome-icon">🏆</div>
      <h2>Time's up!</h2>
      <p>You scored <strong>${score}</strong> points.</p>
      <p>Best score: <strong>${highScore}</strong></p>
      <button id="start-btn">PLAY AGAIN →</button>
    </div>
  `;
}
