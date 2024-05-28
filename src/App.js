// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Dashboard from "./components/Dashboard";
import InvoiceLibrary from "./components/InvoiceLibrary";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/library" element={<InvoiceLibrary />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
