from flask import Blueprint, jsonify
from app.models import Job, CandidateProfile
from app.utils import token_required

match_bp = Blueprint('match', __name__)

@match_bp.route('/match', methods=['GET'])
@token_required
def get_matching_jobs(current_user):
    if current_user.role != 'candidate':
        return jsonify({'message': 'Seuls les candidats peuvent voir les offres correspondantes'}), 403

    profile = CandidateProfile.query.filter_by(user_id=current_user.id).first()
    if not profile:
        return jsonify({'message': 'Profil non trouvé'}), 404

    all_jobs = Job.query.all()
    matches = []

    for job in all_jobs:
        score = 0

        # Matching localisation
        if job.location.strip().lower() == (profile.location or "").strip().lower():
            score += 1

        # Matching compétences (très simple)
        job_skills = set((job.skills or "").lower().split(","))
        profile_skills = set((profile.skills or "").lower().split(","))
        common_skills = job_skills.intersection(profile_skills)
        score += len(common_skills)

        matches.append({
            "job_id": job.id,
            "title": job.title,
            "location": job.location,
            "score": score,
            "common_skills": list(common_skills)
        })

    # Tri par score décroissant
    matches.sort(key=lambda x: x["score"], reverse=True)

    return jsonify(matches)
