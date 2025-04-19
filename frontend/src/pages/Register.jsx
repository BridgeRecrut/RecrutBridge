import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Inscription réussie
        navigate("/login");
      } else {
        // Erreur côté serveur
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-2">RecruitmentBridge</h2>
        <p className="text-center text-gray-600 mb-6">Crée ton compte</p>

        <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 mb-4 hover:bg-gray-50 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Continuer avec Google</span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">ou</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            name="first_name"
            placeholder="Jean"
            value={formData.first_name}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-4 py-2 text-sm"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Dupont"
            value={formData.last_name}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-4 py-2 text-sm"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="exemple@email.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-sm mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-sm mb-4"
          required
        />

        {error && (
          <p className="text-sm text-red-600 mb-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Créer un compte →
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          En t'inscrivant, tu acceptes nos{" "}
          <a href="#" className="text-blue-600 hover:underline">Conditions d'utilisation</a> et
          notre <a href="#" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
        </p>

        <p className="text-center text-sm mt-6">
          Tu as déjà un compte ?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
