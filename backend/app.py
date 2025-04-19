from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configuration de base
    app.config['SECRET_KEY'] = 'super-secret-key'  # À remplacer avec une vraie clé secrète
    app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'

    # Importation et enregistrement des blueprints
    from auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
