import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export const LayoutContext = createContext();

function Layout() {
  const [isToggle, setIs_Toggle] = useState(true);
  return (
    <LayoutContext.Provider value={{ isToggle, setIs_Toggle }}>
      <div className="flex relative w-full h-screen bg-gray-50 overflow-hidden">
        <Sidebar isToggle={isToggle} setIs_Toggle={setIs_Toggle} />

        {/* Main Content with smooth transition */}
        <div
          className={`w-full h-full bg-gray-50 transition-all duration-700 ease-in-out ${
            isToggle ? "ml-64" : "ml-0"
          }`}
        >
          <Header setIs_Toggle={setIs_Toggle} isToggle={isToggle} />
          <div className="h-[calc(100vh-73px)] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default Layout;
