import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AttractionDetailPage from "./pages/AttractionDetailPage/AttractionDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/attraction/:id" element={<AttractionDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
