import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
