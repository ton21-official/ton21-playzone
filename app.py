# app.py — Ton21 PlayZone Backend
import os
import json
import requests
from flask import Flask, request, jsonify

# ─────────────────────────────
# Flask app init
# ─────────────────────────────
app = Flask(__name__)

# ─────────────────────────────
# Load ENV variables
# ─────────────────────────────
TONCENTER_API_KEY = os.environ.get("TONCENTER_API_KEY")
T21_WALLET_SEED = os.environ.get("T21_WALLET_SEED")
T21_JETTON = "EQBLgiPMly982IMGqauqdX0Fe_N01arD-LhlKSfxBd8rzYRG"  # твой Ton21 Jetton
OWNER_WALLET = "UQAqZ3e_Qf1zX3AxcaLyjf7mOSDa-yfCi9ee9shKXIskdUs2"  # твой основной кошелёк

# ─────────────────────────────
# Simple home route
# ─────────────────────────────
@app.route("/")
def home():
    return jsonify({
        "status": "ok",
        "message": "✅ Ton21 PlayZone API active",
        "jetton": T21_JETTON
    })

# ─────────────────────────────
# /send — handle payout requests
# ─────────────────────────────
@app.route("/send", methods=["POST"])
def send_jetton():
    try:
        data = request.get_json()
        address = data.get("address")
        amount = float(data.get("amount", 0))

        if not address or amount <= 0:
            return jsonify({"status": "error", "error": "invalid address or amount"}), 400

        # Convert T21 amount to nanoJettons (1 T21 = 10^9 nano)
        nano_amount = int(amount * 1_000_000_000)

        # Send transaction via Toncenter API
        payload = {
            "to": address,
            "value": str(nano_amount),
            "comment": "Ton21 PlayZone reward 🎯",
            "jetton_wallet": T21_JETTON,
            "from_seed": T21_WALLET_SEED,
            "api_key": TONCENTER_API_KEY
        }

        # Simulate sending (for testing phase)
        # Later this will call a real TON send endpoint
        print(f"Sending {amount} T21 to {address} ...")

        # Dummy success
        return jsonify({"status": "ok", "sent": amount, "to": address})

    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

# ─────────────────────────────
# Run local (Render auto runs via gunicorn)
# ─────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
