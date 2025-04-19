from flask import Blueprint, request, jsonify
from app.models import db, Job
from app.utils import token_required

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/jobs', methods=['POST'])
@token_required
def create_job(current_user):
    if current_user.role != 'recruiter':
        return jsonify({'message': 'Seuls les recruteurs peuvent créer une offre'}), 403

    data = request.get_json()
    new_job = Job(
        title=data.get('title'),
        description=data.get('description'),
        location=data.get('location'),
        skills=data.get('skills'),
        recruiter_id=current_user.id
    )
    db.session.add(new_job)
    db.session.commit()
    return jsonify({'message': 'Offre créée avec succès'}), 201

@jobs_bp.route('/jobs', methods=['GET'])
@token_required
def list_jobs(current_user):
    jobs = Job.query.all()
    return jsonify([
        {
            'id': job.id,
            'title': job.title,
            'description': job.description,
            'location': job.location,
            'skills': job.skills,
            'recruiter_id': job.recruiter_id
        } for job in jobs
    ])
