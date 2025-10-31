from flask import Flask, request, jsonify
import os, requests

app = Flask(__name__)

TONCENTER_API_KEY = os.getenv("TONCENTER_API_KEY")
T21_WALLET_SEED = os.getenv("T21_WALLET_SEED")

# 🔹 Твой Jetton (Ton21)
JETTON_WALLET = "EQBLgiPMly982IMGqauqdX0Fe_N01arD-LhlKSfxBd8rzYRG"

@app.route("/")
def home():
    return "✅ Ton21 PlayZone API active"

@app.route("/send", methods=["POST"])
def send_t21():
    data = request.json
    address = data.get("address")
    amount = data.get("amount")  # в T21
    if not address or not amount:
        return jsonify({"error": "Missing address or amount"}), 400

    # 🔹 Здесь можно подключить реальную отправку через toncenter API
    # пока просто имитация
    print(f"Would send {amount} T21 to {address}")

    return jsonify({"status": "ok", "message": f"{amount} T21 sent to {address}"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
