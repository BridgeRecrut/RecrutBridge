import React from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();

  const handlePostulerClick = () => {
    navigate("/jobs"); // ou "/offres" si ta route s'appelle comme ça
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
      <input
        type="text"
        placeholder="Ex : Développeur, Designer…"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      <input
        type="text"
        placeholder="Ville ou code postal"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
      />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition duration-200">
        Rechercher
      </button>
      <button
        onClick={handlePostulerClick}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition duration-200"
      >
        Postuler
      </button>
    </div>
  );
};

export default SearchForm;
