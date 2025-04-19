# seed_jobs.py

from app import app
from app.models import db, Job, User

with app.app_context():
    recruiter = User.query.filter_by(role='recruiter').first()

    if not recruiter:
        recruiter = User(email='recruteur@example.com', password='test123', role='recruiter')
        db.session.add(recruiter)
        db.session.commit()
        print("👤 Recruteur créé avec l'email: recruteur@example.com")

    jobs = [
        Job(title="Développeur Full Stack", description="Développement frontend/backend", location="Paris", skills="React, Node.js", recruiter_id=recruiter.id),
        Job(title="UX/UI Designer", description="Conception de maquettes web", location="Lyon", skills="Figma, UX research", recruiter_id=recruiter.id),
        Job(title="DevOps Engineer", description="CI/CD, infrastructure cloud", location="Remote", skills="Docker, Kubernetes, AWS", recruiter_id=recruiter.id),
        Job(title="Développeur Python", description="Développement backend avec Flask", location="Marseille", skills="Python, Flask", recruiter_id=recruiter.id),
        Job(title="Chef de Projet IT", description="Gestion de projet agile", location="Bordeaux", skills="Scrum, Jira", recruiter_id=recruiter.id),
    ]

    db.session.add_all(jobs)
    db.session.commit()
    print("✅ 5 offres d'emploi ajoutées avec succès.")
