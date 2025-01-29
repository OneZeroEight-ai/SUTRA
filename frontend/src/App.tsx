import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import TokenInfo from "./pages/TokenInfo";
import PoolManagement from "./pages/PoolManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/token" element={<TokenInfo />} />
            <Route path="/pools" element={<PoolManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
