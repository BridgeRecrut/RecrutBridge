from app import db  # ✅ import de l'instance partagée

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    subscription_level = db.Column(db.String(20), default='free')

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    skills = db.Column(db.String(200))
    recruiter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recruiter = db.relationship('User', backref='jobs')

class CandidateProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    bio = db.Column(db.Text)
    skills = db.Column(db.String(200))
    location = db.Column(db.String(120))
    experience = db.Column(db.Text)
    user = db.relationship('User', backref='profile')

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    status = db.Column(db.String(50), default='en attente')
    candidate = db.relationship('User', backref='applications')
    job = db.relationship('Job', backref='applications')
