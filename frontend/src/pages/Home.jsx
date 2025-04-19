import React from "react";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="text-center mb-8 px-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Recherchez par titre, entreprise ou lieu.
        </h1>
        <p className="text-blue-600 font-bold text-lg mt-2">Simple et rapide.</p>
      </div>
      <SearchForm />
    </div>
  );
};

export default Home;
