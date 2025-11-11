// =======================
// T21 PlayZone Frontend
// =======================

console.log("T21 PlayZone Loaded ✅");

// === GLOBAL STATE ===
let balance = 0;
let playCount = 0;
let playLimit = 100;
let timerActive = false;

// === API URL ===
const API_URL = "https://t21-playzone-api.t21playzone.workers.dev";


// === LOAD STATE ===
async function loadState() {
  try {
    const res = await fetch(`${API_URL}/state`);
    const data = await res.json();
    balance = data.balance ?? 0;
    playCount = data.plays ?? 0;
    playLimit = data.limit ?? 100;
    updateUI();
  } catch (err) {
    console.error("State load error:", err);
  }
}

// === WATCH ADS ===
async function watchAd(amount) {
  try {
    const res = await fetch(`${API_URL}/ad?amount=${amount}`);
    const data = await res.json();
    balance = data.balance;
    updateUI();
  } catch (err) {
    console.error("Ad error:", err);
  }
}

// === PLAY GAME ===
async function play(number) {
  if (timerActive) return;
  timerActive = true;

  updateTimer();

  try {
    const res = await fetch(`${API_URL}/play?number=${number}`);
    const data = await res.json();

    balance = data.balance;
    playCount = data.playCount;

    if (data.win) {
      alert(`🎉 You WIN: ${data.reward} T21`);
    } else {
      alert("❌ You lose!");
    }

    updateUI();

  } catch (err) {
    console.error("Play error:", err);
  }

  setTimeout(() => { timerActive = false; }, 1000);
}

// === TIMER ===
function updateTimer() {
  const timerEl = document.getElementById("timer");
  timerEl.innerText = "⏳ 1s cooldown...";
  setTimeout(() => { timerEl.innerText = ""; }, 1000);
}

// === UPDATE UI ===
function updateUI() {
  document.getElementById("balance").innerText = balance;
  document.getElementById("playCount").innerText = playCount;
  document.getElementById("limit").innerText = playLimit;
}

// === SHARE BUTTON ===
function share() {
  if (navigator.share) {
    navigator.share({
      title: "T21 Play Zone",
      text: "🔥 Try to win free T21 tokens!",
      url: window.location.href
    });
  } else {
    alert("Your browser does not support Share API");
  }
}

// INIT
loadState();
