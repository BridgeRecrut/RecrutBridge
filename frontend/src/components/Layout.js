import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {!isHomePage && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div className="flex flex-col flex-1">
        <Header
          showLoginButton={true}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className={`flex-1 overflow-y-auto ${isHomePage ? 'bg-gradient-to-b from-white to-gray-100' : 'bg-gray-50 p-4'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
