import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const suggestions = [
  'Développeur React',
  'Data Scientist',
  'Chef de projet',
  'Designer UI/UX',
  'Analyste business',
];

const cities = ['Casablanca', 'Rabat', 'Tanger', 'Marrakech', 'Agadir'];

const SearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    const matches = suggestions.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(matches);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Champ mot-clé */}
        <div className="relative flex-1">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un métier ou mot-clé"
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {keyword && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border mt-1 w-full rounded shadow">
              {filteredSuggestions.map((s, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setKeyword(s);
                    setFilteredSuggestions([]);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Champ ville */}
        <div className="relative flex-1">
          <FaMapMarkerAlt className="absolute top-3.5 left-3 text-gray-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Ville</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bouton */}
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
          POSTULER
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
