// === CONFIG ===
const API = "https://t21-playzone-api.t21playzone.workers.dev";


// === LOAD INITIAL STATE ===
async function loadState() {
  try {
    const res = await fetch(`${API}/state`);
    const data = await res.json();

    document.getElementById("balance").textContent = data.balance;
    document.getElementById("playCount").textContent = data.plays;
    document.getElementById("limit").textContent = data.limit;
  } catch (err) {
    console.error("STATE ERROR:", err);
  }
}


// === WATCH AD ===
async function watchAd(amount) {
  try {
    const res = await fetch(`${API}/ad/amount-${amount}`);
    const data = await res.json();

    document.getElementById("balance").textContent = data.balance;
    document.getElementById("playCount").textContent = data.plays;
    document.getElementById("limit").textContent = data.limit;
  } catch (err) {
    console.error("AD ERROR:", err);
  }
}


// === PLAY GAME ===
async function play(num) {
  try {
    const res = await fetch(`${API}/play/number-${num}`);
    const data = await res.json();

    // Лимит исчерпан
    if (data.error === "LIMIT_REACHED") {
      alert(`Лимит игр достигнут. Возвращайся позже! ⏳`);
      return;
    }

    // Показываем результат
    if (data.win) {
      alert(`🎉 Вы угадали! Вы выиграли ${data.reward} T21`);
    } else {
      alert(`😢 Ты выбрал ${data.guess}, а выпало ${data.winning}… Попробуй ещё!`);
    }

    // Обновить UI
    document.getElementById("balance").textContent = data.balance;
    document.getElementById("playCount").textContent = data.plays;
    document.getElementById("limit").textContent = data.limit;

  } catch (err) {
    console.error("PLAY ERROR:", err);
  }
}


// === SHARE ===
function shareWin() {
  try {
    const shareData = {
      title: "T21 Play Zone",
      text: "Try to win free T21 tokens!",
      url: window.location.href
    };
    navigator.share(shareData);
  } catch (err) {
    console.log("Share API not supported");
  }
}


// === INIT ON PAGE LOAD ===
window.addEventListener("DOMContentLoaded", loadState);
