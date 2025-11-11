// =================== CONFIG ===================
const API = "https://t21-playzone-api.t21playzone.workers.dev";

// =============== WALLET ===============
function getWallet() {
  let w = localStorage.getItem("t21_wallet");
  if (!w) {
    w = "guest_" + Math.floor(Math.random() * 99999999);
    localStorage.setItem("t21_wallet", w);
  }
  return w;
}

// ================= STATE ==================
async function loadState() {
  try {
    const wallet = getWallet();
    const res = await fetch(`${API}/state?wallet=${wallet}`);
    const data = await res.json();

    document.getElementById("balance").textContent = data.balance;
    document.getElementById("playCount").textContent = data.plays;
    document.getElementById("limit").textContent = data.limit;

  } catch (err) {
    console.error("STATE ERROR:", err);
  }
}

// ================= WATCH AD ==================
async function watchAd(amount) {
  try {
    const wallet = getWallet();
    const res = await fetch(`${API}/watch/${amount}?wallet=${wallet}`);
    const data = await res.json();

    document.getElementById("balance").textContent = data.balance;

  } catch (err) {
    console.error("WATCH ERROR:", err);
  }
}

// ================= PLAY ==================
async function play(num) {
  try {
    const wallet = getWallet();
    const res = await fetch(`${API}/play/${num}?wallet=${wallet}`);
    const data = await res.json();

    document.getElementById("balance").textContent = data.balance;
    document.getElementById("playCount").textContent = data.plays;

    alert(
      data.win
        ? `✅ Победа! Награда: ${data.reward} T21`
        : `❌ Проигрыш. Выпало: ${data.winning}`
    );

  } catch (err) {
    console.error("PLAY ERROR:", err);
  }
}

// ================= INIT ==================
window.onload = () => {
  loadState();
};
