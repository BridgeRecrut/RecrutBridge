// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          RecruitmentBridge
        </Link>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-gray-800">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul className={`md:flex space-x-6 hidden`}>
          <li><Link to="/apply" className="hover:text-blue-600">Offres</Link></li>
          <li><Link to="/profile" className="hover:text-blue-600">Profil</Link></li>
          <li><Link to="/subscription" className="hover:text-blue-600">Abonnement</Link></li>
          <li><Link to="/applications" className="hover:text-blue-600">Mes candidatures</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 px-4">
          <ul className="space-y-3">
            <li><Link to="/apply" onClick={() => setOpen(false)}>Offres</Link></li>
            <li><Link to="/profile" onClick={() => setOpen(false)}>Profil</Link></li>
            <li><Link to="/subscription" onClick={() => setOpen(false)}>Abonnement</Link></li>
            <li><Link to="/applications" onClick={() => setOpen(false)}>Candidatures</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
