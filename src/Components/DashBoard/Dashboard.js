import React from "react";

import { Route, Routes } from "react-router-dom";
import DashBoardHome from "./Pages/DashBoardHome";
import Contact from "./Pages/Contact";
import Service from "./Pages/Service";
import Quote from "./Pages/Quote";
import Price from "./Pages/Price";
import NavBar from "./NavBar";

const Dashboard = () => {
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
};

export default Dashboard;
