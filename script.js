const words = [
  "apple","banana","orange","grape","cherry","mango","lemon","watermelon",
  "keyboard","monitor","python","javascript","unity","elephant","rocket",
  "computer","internet","cloud","mouse","guitar","school","coding","gamer",
  "elijah","creative","planet","dream","future","happy","energy","ocean"
];

const container = document.getElementById("word-container");
const input = document.getElementById("input-field");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentIndex = 0;
let timeLeft = 60;
let timer = null;
let correctWords = 0;
let totalWords = 0;

function initWords() {
  container.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = words[Math.floor(Math.random() * words.length)];
    container.appendChild(span);
  }
  container.children[0].classList.add("current");
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

input.addEventListener("input", () => {
  startTimer();
  const wordSpans = container.children;
  const currentWord = wordSpans[currentIndex];
  const typed = input.value.trim();

  if (event.inputType === "insertText" && event.data === " ") {
    if (typed === currentWord.textContent) {
      currentWord.classList.add("correct");
      correctWords++;
    } else {
      currentWord.classList.add("incorrect");
    }
    totalWords++;
    currentWord.classList.remove("current");
    currentIndex++;
    if (wordSpans[currentIndex]) {
      wordSpans[currentIndex].classList.add("current");
      input.value = "";
    }
  }

  const wpm = Math.round((correctWords / ((60 - timeLeft) / 60)) || 0);
  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 100;
  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
});

function endGame() {
  clearInterval(timer);
  input.disabled = true;
  const finalWPM = wpmEl.textContent;
  const finalAcc = accuracyEl.textContent;
  container.innerHTML = `<h2>Test Finished!</h2>
  <p>Your speed: <strong>${finalWPM} WPM</strong></p>
  <p>Your accuracy: <strong>${finalAcc}%</strong></p>`;
}

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  currentIndex = 0;
  timeLeft = 60;
  correctWords = 0;
  totalWords = 0;
  input.disabled = false;
  input.value = "";
  timeEl.textContent = "60";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "100";
  initWords();
});
initWords();
