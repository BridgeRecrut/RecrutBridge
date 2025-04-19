from app import create_app, db
from app.models import Job, User
from werkzeug.security import generate_password_hash

app = create_app()

def create_sample_data():
    with app.app_context():
        db.create_all()

        # Crée un recruteur test s'il n'existe pas
        recruiter = User.query.filter_by(email="recruteur@test.com").first()
        if not recruiter:
            recruiter = User(
                email="recruteur@test.com",
                password=generate_password_hash("recruteur123", method="sha256"),  # ✅ sécurisé
                role="recruteur"
            )
            db.session.add(recruiter)
            db.session.commit()

        # Crée des offres si aucune n'existe
        if not Job.query.first():
            job1 = Job(
                title="Développeur React",
                description="Développe des interfaces modernes.",
                location="Paris",
                skills="React, JavaScript",
                recruiter_id=recruiter.id
            )
            job2 = Job(
                title="Data Scientist",
                description="Analyse de données massives.",
                location="Lyon",
                skills="Python, Machine Learning",
                recruiter_id=recruiter.id
            )
            db.session.add_all([job1, job2])
            db.session.commit()

        print("✅ Données de test insérées avec succès (recruteur + offres d’emploi)")

if __name__ == "__main__":
    create_sample_data()
    app.run(debug=True)
