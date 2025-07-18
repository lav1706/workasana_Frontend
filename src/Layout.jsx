import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-800 text-gray-800">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
