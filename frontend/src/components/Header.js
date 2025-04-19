import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-blue-600 font-bold text-lg">
        RecruitmentBridge
      </Link>

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-6 items-center">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
          Profil
        </Link>
        <Link to="/apply" className="text-gray-700 hover:text-blue-600">
          Offres
        </Link>
        <Link to="/applications" className="text-gray-700 hover:text-blue-600">
          Candidatures
        </Link>
        <Link to="/subscription" className="text-gray-700 hover:text-blue-600">
          Abonnement
        </Link>

        {/* Bouton Connexion visible sur desktop */}
        <Link
          to="/login"
          className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Connexion
        </Link>
      </nav>

      {/* Menu hamburger mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 z-50 space-y-3 md:hidden">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/profile" className="block text-gray-700 hover:text-blue-600">
            Profil
          </Link>
          <Link to="/apply" className="block text-gray-700 hover:text-blue-600">
            Offres
          </Link>
          <Link to="/applications" className="block text-gray-700 hover:text-blue-600">
            Candidatures
          </Link>
          <Link to="/subscription" className="block text-gray-700 hover:text-blue-600">
            Abonnement
          </Link>
          <Link to="/login" className="block text-blue-600 font-semibold">
            Connexion
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
