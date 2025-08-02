import React from "react";

import { Route, Routes } from "react-router-dom";
import DashBoardHome from "./Pages/DashBoardHome";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import Quote from "./Pages/Quote";
import NavBar from "./NavBar";
import { authApi } from "../../Service/api";
import AdminHome from "./AdminDashboard/AdminHome";
import QuoteManagement from "./AdminDashboard/QuoteManagement";
import ServiceManagement from "./AdminDashboard/ServiceManagement";
import AdminContactUs from "./AdminDashboard/AdminContactUs";
import Price from "./AdminDashboard/Price";

const Dashboard = () => {
  const role = authApi.getRole();

  switch (role.toLowerCase()) {
    case "admin": {
      return (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/quotemanagement" element={<QuoteManagement />} />
            <Route path="/servicemanagement" element={<ServiceManagement />} />
            <Route path="/admincontacts" element={<AdminContactUs />} />
            <Route path="/price" element={<Price />} />
          </Routes>
        </div>
      );
    }
    case "user":
    default: {
      return (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<DashBoardHome />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/price" element={<Price />} />
          </Routes>
        </div>
      );
    }
  }
};

export default Dashboard;
