from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # Configuration de base
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recruitment.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "super-secret"  # à changer en prod

    # Initialisation des extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Import et enregistrement des blueprints
    from app.routes import auth, jobs, profile, apply, match

    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(jobs.jobs_bp, url_prefix="/jobs")  # optionnel mais bon pour clarté
    app.register_blueprint(profile.profile_bp)
    app.register_blueprint(apply.apply_bp)
    app.register_blueprint(match.match_bp)

    return app
