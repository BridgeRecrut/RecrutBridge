# app/routes/jobs.py
from flask import Blueprint, jsonify, request
from app.models import Job

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/', methods=['GET'])  # <- ajoute bien le slash ici
def get_jobs():
    keyword = request.args.get('keyword', '').lower()
    location = request.args.get('location', '').lower()

    jobs = Job.query.all()
    filtered = []

    for job in jobs:
        if keyword in job.title.lower() or keyword in job.description.lower():
            if location in job.location.lower():
                filtered.append(job)

    return jsonify({
        "jobs": [
            {
                "id": job.id,
                "title": job.title,
                "description": job.description,
                "location": job.location,
                "skills": job.skills,
            } for job in filtered
        ]
    })
