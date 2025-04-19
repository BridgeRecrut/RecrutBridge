import React, { useState } from "react";
import JobSearch from "../components/JobSearch";
import {
  FaUserTie,
  FaBullhorn,
  FaDatabase,
  FaMousePointer,
  FaSearch,
  FaBell,
  FaChartLine,
  FaRegSmileBeam,
} from "react-icons/fa";

const Home = () => {
  const [openSection, setOpenSection] = useState(null); // null | "recruteurs" | "candidats"

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 bg-gradient-to-b from-blue-50 to-gray-50 pb-12">
      <div className="text-center my-10">
        <p className="text-blue-600 font-semibold mt-2">
          Recherchez par titre, entreprise ou localisation
        </p>
      </div>

      <JobSearch />

      {/* Section Fonctionnalités */}
      <section className="mt-20 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Fonctionnalités principales
        </h2>

        {/* Recruteurs */}
        <div className="border-b mb-4">
          <button
            onClick={() => toggleSection("recruteurs")}
            className="w-full text-left py-4 px-4 flex justify-between items-center bg-white hover:bg-gray-100 rounded-md transition"
          >
            <span className="text-lg font-semibold text-blue-600">👔 Pour les recruteurs</span>
            <span className="text-xl">{openSection === "recruteurs" ? "−" : "+"}</span>
          </button>
          {openSection === "recruteurs" && (
            <ul className="px-6 py-4 space-y-4 text-gray-700 animate-fade-in">
              <li className="flex items-start gap-3">
                <FaUserTie className="text-blue-500 mt-1" />
                <span>
                  <strong>Matching intelligent :</strong> trouvez les bons profils rapidement.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaBullhorn className="text-blue-500 mt-1" />
                <span>
                  <strong>Publication facile :</strong> postez vos offres en quelques clics.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaDatabase className="text-blue-500 mt-1" />
                <span>
                  <strong>Base de talents :</strong> accédez à des profils qualifiés.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaChartLine className="text-blue-500 mt-1" />
                <span>
                  <strong>Statistiques en temps réel :</strong> suivez les performances.
                </span>
              </li>
            </ul>
          )}
        </div>

        {/* Candidats */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("candidats")}
            className="w-full text-left py-4 px-4 flex justify-between items-center bg-white hover:bg-gray-100 rounded-md transition"
          >
            <span className="text-lg font-semibold text-green-600">👤 Pour les candidats</span>
            <span className="text-xl">{openSection === "candidats" ? "−" : "+"}</span>
          </button>
          {openSection === "candidats" && (
            <ul className="px-6 py-4 space-y-4 text-gray-700 animate-fade-in">
              <li className="flex items-start gap-3">
                <FaMousePointer className="text-green-500 mt-1" />
                <span>
                  <strong>Postulez en un clic :</strong> processus simplifié et rapide.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaSearch className="text-green-500 mt-1" />
                <span>
                  <strong>Matching personnalisé :</strong> recevez des offres pertinentes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaBell className="text-green-500 mt-1" />
                <span>
                  <strong>Alertes et suivi :</strong> restez informé en temps réel.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaRegSmileBeam className="text-green-500 mt-1" />
                <span>
                  <strong>Expérience intuitive :</strong> navigation fluide et agréable.
                </span>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

