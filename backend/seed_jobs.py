from app import app, db
from app.models import User, Job

with app.app_context():
    # Vérifie s'il y a déjà un recruteur
    recruiter = User.query.filter_by(email="recruteur@example.com").first()
    if not recruiter:
        recruiter = User(
            email="recruteur@example.com",
            password="hashed-password",  # Remplace ça par un hash réel si tu fais login
            role="recruiter"
        )
        db.session.add(recruiter)
        db.session.commit()
        print("👤 Recruteur créé avec l'email: recruteur@example.com")

    # Crée des offres
    jobs = [
        Job(title="Développeur React", description="Frontend moderne avec React", location="Paris", skills="React, JS", recruiter_id=recruiter.id),
        Job(title="Data Scientist", description="Analyse des données massives", location="Lyon", skills="Python, Machine Learning", recruiter_id=recruiter.id),
        Job(title="DevOps Engineer", description="CI/CD, Docker, AWS", location="Remote", skills="Docker, Kubernetes", recruiter_id=recruiter.id),
        Job(title="UX/UI Designer", description="Design d'interfaces web", location="Marseille", skills="Figma, UI/UX", recruiter_id=recruiter.id),
        Job(title="Développeur Backend", description="API REST avec Flask", location="Toulouse", skills="Flask, SQLAlchemy", recruiter_id=recruiter.id),
    ]

    db.session.add_all(jobs)
    db.session.commit()
    print("✅ 5 offres d'emploi ajoutées avec succès.")
