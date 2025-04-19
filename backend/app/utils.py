from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app.models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            verify_jwt_in_request()  # ✅ C'est ça qui vérifie la présence et la validité du token
            user_id = get_jwt_identity()
            current_user = User.query.get(user_id)
            if not current_user:
                return jsonify({"message": "Utilisateur non trouvé"}), 404
        except Exception as e:
            return jsonify({"message": "Token invalide ou manquant"}), 401

        return f(current_user, *args, **kwargs)

    return decorated
