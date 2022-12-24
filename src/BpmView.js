import React, { useState, useEffect } from "react";
import moment from 'moment';
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DoughnutChart from "./DoughnutChart";

function BpmView() {
  const [sensorData, setSensorData] = useState({});
  const [bpms, setBpms] = useState([]);
  const [avgBpms, setAvgBpms] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const bpmRef = ref(db, "bpm/");
    onValue(bpmRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      console.log(data);
      const updatedBpms = [];
      const updatedAvgBpms = [];
      const updatedTimestamps = [];
      for (const [key, value] of Object.entries(data)) {
        updatedBpms.push(value.bpm);
        updatedAvgBpms.push(value.avgBpm);
        updatedTimestamps.push(moment(value.timestamp).format('lll'));;
      }
      setBpms(updatedBpms);
      setAvgBpms(updatedAvgBpms);
      setTimestamps(updatedTimestamps);

    });
  }, []);

  const calculateAverage = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length || 0;
    return avg;
  };

  console.log('bmps',bpms);
  console.log('timestamps',timestamps);

  return (
    <div
    style={{
      width: '1000px',
      margin: 'auto',
      marginBottom: '100px',
      marginTop:'100px'
    }}
  > 
    <p style={{ fontSize:'25px',color: '#717171'}}>Pulse Rate Report</p>
    <div style={{ width: '500px', margin: 'auto', backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px', float: 'left'}}>
      <BarChart
        text="Pulse Rate"
        dataSet={[60, calculateAverage(bpms), 100]}
        labelSet={[
          'Minimum Pulse Rate',
          'Average Pulse Rate',
          'Maximum Pulse Rate',
        ]}
      />
    </div>
    <div style={{ height:'290px', width: '300px', backgroundColor:'white', margin: 'auto 50px', float: 'left', marginLeft:'40px', paddingLeft:'40px', paddingRight:'30px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
      <PieChart
        text="Pulse Rate"
        dataSet={[60, calculateAverage(bpms), 100]}
        labelSet={[
          'Minimum',
          'Average',
          'Maximum',
        ]}
      />
    </div>
    {/* <div style={{ width: '320px', backgroundColor:'white', margin: '50px auto 50px 150px', float: 'left'}}>
    <DoughnutChart
        text="Pulse Rate"
        dataSet={[60, calculateAverage(bpms), 100]}
        labelSet={[
          'Minimum',
          'Average',
          'Maximum',
        ]}
      />
    </div> */}
    <div style={{ width: '880px',marginTop: '40px', marginBottom: '100px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
    <LineChart dataSet={bpms} labelSet={timestamps} text={'Pulse Rate'} color='#605d8a' />
    </div>
  </div>
  );
}

export default BpmView;
