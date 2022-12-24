import React from 'react';
import "./App.css";
import BpmView from './BpmView';
import Navbar from './Navbar';
import PulseReportView from './PulseReportView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BpmView />} />
          {/* <Route path="/sleep" element={<SleepView />} />
          <Route path="/weight" element={<WeightView />} />
          <Route path="/walk" element={<WalkView />} /> */}
          <Route path="/pulsereport" element={<PulseReportView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
