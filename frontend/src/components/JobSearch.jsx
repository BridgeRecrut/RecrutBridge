import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const JobSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/jobs", {
        params: { keyword, location },
      });
      setResults(res.data.jobs || []);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      setError("Erreur lors de la recherche. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-2xl shadow-lg space-y-4"
      >
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Développeur, Designer, RH..."
            className="flex-1 outline-none text-sm"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <FaMapMarkerAlt className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Paris, Lyon, Casablanca..."
            className="flex-1 outline-none text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-full hover:bg-blue-700 transition"
        >
          Rechercher
        </button>
      </form>

      {error && (
        <div className="text-red-600 mt-4 bg-red-100 border border-red-200 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-10 space-y-4">
        {results.length > 0 ? (
          results.map((job) => (
            <div
              key={job.id}
              className="p-5 border rounded-xl bg-white shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">
            Aucune offre trouvée pour cette recherche.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
