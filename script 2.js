const quoteDisplay = document.getElementById('quote');
const input = document.getElementById('input');
const result = document.getElementById('result');

const quotes = [
  "Typing fast is fun and builds skill over time.",
  "Elijah made this typing game with style and speed.",
  "Practice makes perfect in everything you do."
];

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
  input.value = '';
  result.textContent = '';
}

input.addEventListener('input', () => {
  const typed = input.value;
  const original = quoteDisplay.textContent;
  
  if (typed === original) {
    result.textContent = "✅ Perfect! You matched it!";
    result.style.color = "#66ff99";
  } else if (original.startsWith(typed)) {
    result.textContent = "⏳ Keep typing...";
    result.style.color = "#ffff66";
  } else {
    result.textContent = "❌ Mistake — try again.";
    result.style.color = "#ff6666";
  }
});

window.onload = newQuote;
