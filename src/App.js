import React from "react";
import "./styles/App.css";
import BpmView from "./components/BpmView";
import Navbar from "./components/Navbar";
import PulseReportView from "./components/PulseReportView";
import SleepView from "./components/SleepView";
import WalkView from "./components/WalkView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BpmView />} />
          <Route path="/sleep" element={<SleepView />} />
          <Route path="/walk" element={<WalkView />} />
          <Route path="/pulsereport" element={<PulseReportView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
