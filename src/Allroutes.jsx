import React, { useState } from "react";
import ContextApi from "./ContextApi";
import Layout from "./Layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import NotFound from "./Pages/NotFound/NotFound";
import Patients from "./Pages/Patients/Patients";
import WebSettings from "./Pages/Settings/WebSettings";

const Allroutes = () => {
  const [authData, setAuthData] = useState(() =>
    JSON.parse(localStorage.getItem("novaya_auth"))
  );
  return (
    <ContextApi.Provider value={{ authData, setAuthData }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<WebSettings />} />
            
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContextApi.Provider>
  );
};

export default Allroutes;
