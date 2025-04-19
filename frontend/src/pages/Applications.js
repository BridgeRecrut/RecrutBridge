import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../utils';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/applications', getAuthHeaders())
      .then(res => {
        setApplications(res.data.applications || []);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des candidatures", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span role="img" aria-label="apply" className="mr-2">📨</span>
        Mes candidatures
      </h1>

      {loading ? (
        <p>Chargement...</p>
      ) : applications.length === 0 ? (
        <p>Aucune candidature pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white shadow-md rounded-xl p-5 border">
              <h2 className="text-xl font-semibold mb-2">{app.job_title}</h2>
              <p className="text-sm text-gray-600">📍 Lieu : {app.job_location}</p>
              <p className="text-sm text-gray-600">📅 Date : {new Date(app.date_applied).toLocaleDateString()}</p>
              <p className="text-sm mt-2">
                🔎 Statut : <strong>{app.status || 'En attente'}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
