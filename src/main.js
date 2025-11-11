const API = "https://t21-playzone-api.t21playzone.workers.dev";

// === загрузка начального состояния ===
async function loadState() {
  try {
    const res = await fetch(`${API}/state`);
    const data = await res.json();

    document.getElementById("balance").innerText = data.balance;
    document.getElementById("plays").innerText = data.plays;
    document.getElementById("limit").innerText = data.limit;

  } catch(e) {
    console.log("Ошибка:", e);
  }
}

// === реклама ===
async function watchAd(amount) {
  try {
    const res = await fetch(`${API}/ad/amount-${amount}`, { method: "POST" });
    const data = await res.json();

    document.getElementById("balance").innerText = data.balance;
    document.getElementById("plays").innerText = data.plays;
    document.getElementById("limit").innerText = data.limit;

  } catch(e) {
    alert("Ошибка");
  }
}

// === игра ===
async function play(num) {
  try {
    const res = await fetch(`${API}/play/${num}`, { method: "POST" });
    const data = await res.json();

    alert(data.message);

    document.getElementById("balance").innerText = data.balance;
    document.getElementById("plays").innerText = data.plays;
    document.getElementById("limit").innerText = data.limit;

  } catch(e) {
    alert("Ошибка");
  }
}

// авто-обновление при заходе
loadState();