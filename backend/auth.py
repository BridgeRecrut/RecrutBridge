from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Données reçues :", data)  # pour debug
    return jsonify({"message": "Inscription réussie"}), 201
