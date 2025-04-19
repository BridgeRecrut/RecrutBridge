import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAuthHeaders } from '../utils';

const Apply = () => {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const keywords = params.get("keywords")?.toLowerCase() || "";
  const city = params.get("location")?.toLowerCase() || "";

  // 🔁 Charger les offres d’emploi
  useEffect(() => {
    axios.get('http://localhost:5000/jobs')
      .then(response => {
        setJobs(response.data || []);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des offres :', error);
      });
  }, []);

  // ✅ Postuler à une offre
  const postuler = async (jobId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/apply/${jobId}`,
        {},
        getAuthHeaders()
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de la candidature.");
    }
  };

  // 🔍 Filtrage local
  const filteredJobs = jobs.filter((job) => {
    const matchKeyword =
      keywords === "" ||
      job.title.toLowerCase().includes(keywords) ||
      job.description.toLowerCase().includes(keywords) ||
      job.skills.toLowerCase().includes(keywords);

    const matchLocation =
      city === "" || job.location.toLowerCase().includes(city);

    return matchKeyword && matchLocation;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span role="img" aria-label="briefcase" className="mr-2">📝</span>
        Offres d'emploi
      </h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded shadow">
          {message}
        </div>
      )}

      {filteredJobs.length === 0 ? (
        <p className="text-gray-500 mt-6">Aucune offre ne correspond à votre recherche.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-xl p-5 border">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-sm text-gray-600 mb-1">📍 {job.location}</p>
              <p className="text-sm text-gray-600 mb-1">🛠️ {job.skills}</p>
              <p className="text-gray-700 mt-2 mb-4">{job.description}</p>
              <button
                onClick={() => postuler(job.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Postuler
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Apply;
