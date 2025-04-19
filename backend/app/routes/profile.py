from flask import Blueprint, request, jsonify
from app.models import db, CandidateProfile
from app.utils import token_required

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    profile = CandidateProfile.query.filter_by(user_id=current_user.id).first()
    if not profile:
        return jsonify({'message': 'Aucun profil trouvé'}), 404

    return jsonify({
        'bio': profile.bio,
        'skills': profile.skills,
        'location': profile.location,
        'experience': profile.experience
    })

@profile_bp.route('/profile', methods=['POST'])
@token_required
def update_profile(current_user):
    data = request.get_json()
    profile = CandidateProfile.query.filter_by(user_id=current_user.id).first()

    if profile:
        profile.bio = data.get('bio', profile.bio)
        profile.skills = data.get('skills', profile.skills)
        profile.location = data.get('location', profile.location)
        profile.experience = data.get('experience', profile.experience)
    else:
        profile = CandidateProfile(
            user_id=current_user.id,
            bio=data.get('bio', ''),
            skills=data.get('skills', ''),
            location=data.get('location', ''),
            experience=data.get('experience', '')
        )
        db.session.add(profile)

    db.session.commit()
    return jsonify({'message': 'Profil mis à jour'})
@profile_bp.route('/debug-token', methods=['GET'])
@token_required
def debug_token(current_user):
    return jsonify({"user_id": current_user.id, "role": current_user.role})
@profile_bp.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"})
