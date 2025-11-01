from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# ───────────────────────────────
# Инициализация Flask
# ───────────────────────────────
app = Flask(__name__)
CORS(app)  # ✅ Разрешает запросы с фронта (HTML Mini App)

# ───────────────────────────────
# Тестовый эндпоинт
# ───────────────────────────────
@app.route("/")
def home():
    return "✅ T21 Play Zone API is live!"

# ───────────────────────────────
# Выплата (тест)
# ───────────────────────────────
@app.route("/send", methods=["POST"])
def send_tokens():
    try:
        data = request.get_json()
        address = data.get("address")
        amount = data.get("amount")

        print(f"💎 Запрос выплаты: {amount} T21 → {address}")

        # Здесь будет логика Toncenter (позже подключим)
        # Сейчас просто имитация успешного ответа:
        return jsonify({"status": "ok", "txid": "test_tx_123"})
    except Exception as e:
        print("❌ Ошибка:", e)
        return jsonify({"status": "error", "error": str(e)}), 500

# ───────────────────────────────
# Запуск (Render автоматически использует gunicorn)
# ───────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)