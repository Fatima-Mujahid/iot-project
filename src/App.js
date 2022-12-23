import React, { useState, useEffect } from "react";
import "./App.css";
import { moment } from "moment";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
function App() {
  const [sensorData, setSensorData] = useState({});
  const [bpms, setBpms] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, "bpm/");
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      const updatedBpms = [];
      const updatedTimestamps = [];
      for (const [key, value] of Object.entries(data)) {
        updatedBpms.push(value.bpm);
        updatedTimestamps.push(value.timestamp);
      }
      setBpms(updatedBpms);
      setTimestamps(updatedTimestamps);
    });
  }, []);

  return (
    <div className="App">
      <div className="table">
        <div>
          <h2>Timestamp</h2>
          {timestamps.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          <h2>Bpm</h2>
          {bpms.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
