from flask import Blueprint, request, jsonify
from app.models import db, Application, Job
from app.utils import token_required

apply_bp = Blueprint('apply', __name__)

@apply_bp.route('/apply/<int:job_id>', methods=['POST'])
@token_required
def apply_to_job(current_user, job_id):
    if current_user.role != 'candidate':
        return jsonify({'message': 'Seuls les candidats peuvent postuler'}), 403

    existing = Application.query.filter_by(candidate_id=current_user.id, job_id=job_id).first()
    if existing:
        return jsonify({'message': 'Déjà postulé à cette offre'}), 409

    application = Application(candidate_id=current_user.id, job_id=job_id, status='en attente')
    db.session.add(application)
    db.session.commit()
    return jsonify({'message': 'Candidature envoyée'}), 201

@apply_bp.route('/applications', methods=['GET'])
@token_required
def get_applications(current_user):
    if current_user.role == 'candidate':
        apps = Application.query.filter_by(candidate_id=current_user.id).all()
    elif current_user.role == 'recruiter':
        apps = Application.query.join(Job).filter(Job.recruiter_id == current_user.id).all()
    else:
        return jsonify({'message': 'Rôle invalide'}), 403

    return jsonify([
        {
            'id': app.id,
            'job_id': app.job_id,
            'candidate_id': app.candidate_id,
            'status': app.status
        } for app in apps
    ])
