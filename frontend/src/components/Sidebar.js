// src/components/Sidebar.jsx

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 shadow-md h-full">
      <h2 className="text-xl font-bold mb-6">RecruitmentBridge</h2>

      <ul className="space-y-3">
        <li><button className="text-gray-700 hover:text-blue-600">Tableau de bord</button></li>
        <li><button className="text-gray-700 hover:text-blue-600">Mon profil</button></li>
        <li><button className="text-gray-700 hover:text-blue-600">Offres</button></li>
        <li><button className="text-gray-700 hover:text-blue-600">Candidatures</button></li>
        <li><button className="text-gray-700 hover:text-blue-600">Abonnement</button></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
