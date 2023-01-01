import React, { useState, useEffect } from "react";
import moment from 'moment';
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from "./DoughnutChart";

function WalkView() {
    const [sensorData, setSensorData] = useState({});
    const [walkArray, setWalkArray] = useState({});
  //store data from column
   const [steps, setSteps] = useState([]);
   const [timeStamp, setTimeStamp] = useState([]);

  useEffect(() => {
    const walkRef = ref(db, 'walk');
    //snapshot keeps data updated
    onValue(walkRef, (snapshot) => {
      const data = snapshot.val();
      setWalkArray(data); //set data from table
      const updatedStepsArray = [];
      const updatedTimeStampArray = [];
      for (const [key, value] of Object.entries(data)) {
        updatedStepsArray.push(value.StepTotal);
        updatedTimeStampArray.push(moment(value.ActivityDay).format('LL'));
      }
      setSteps(updatedStepsArray); //set data from column
      setTimeStamp(updatedTimeStampArray);
    });
  }, []);

  const calculateAverage = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length || 0;
    return avg;
  };
  return (
    <div
    style={{
      width: '1000px',
      margin: 'auto',
      marginBottom: '100px',
      marginTop:'100px'
    }}
  > 
    <p style={{ fontSize:'25px',color: '#717171'}}>Distance Rate Report</p>
    <div style={{ width: '500px', margin: 'auto', backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px', float: 'left'}}>
      <BarChart
        text="Steps per Day"
        dataSet={[ calculateAverage(steps), '10000']}
        labelSet={[
            'Average Steps Per Day',
            'Minimum Steps for Adults',
        ]}
      />
    </div>
    <div style={{ height:'290px', width: '300px', backgroundColor:'white', margin: 'auto 50px', float: 'left', marginLeft:'40px', paddingLeft:'40px', paddingRight:'30px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
      <DoughnutChart
        text="Steps per Day"
        dataSet={[60, calculateAverage(steps), '10000']}
        labelSet={[
            'Average',
            'Minimum'
            
        ]}
      />
    </div>
    <div style={{ width: '880px',marginTop: '40px', marginBottom: '100px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
    <LineChart dataSet={steps} labelSet={timeStamp} text={'Steps per Day'} color='#605d8a' />
    </div>
  </div>
  );
}

export default WalkView;

