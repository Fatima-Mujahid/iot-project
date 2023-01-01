import React, { useState, useEffect } from "react";
import moment from 'moment';
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from "./DoughnutChart";

function SleepView() {
    const [sensorData, setSensorData] = useState({});
    const [sleepArray, setSleepArray] = useState({});
    //store data from column
    const [sleepHours, setSleepHours] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);

    useEffect(() => {
        const sleepRef = ref(db, 'sleep');
        //snapshot keeps data updated
        onValue(sleepRef, (snapshot) => {
          const data = snapshot.val();
          setSleepArray(data); //set data from table
          const updatedSleepHoursArray = [];
          const updatedTimeStampArray = [];
          for (const [key, value] of Object.entries(data)) {
            updatedSleepHoursArray.push(value.TotalMinutesAsleep / 60);
            updatedTimeStampArray.push(moment(value.SleepDay).format('LL'));
          }
          setSleepHours(updatedSleepHoursArray); //set data from column
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
        <p style={{ fontSize:'25px',color: '#717171'}}>Sleep Rate Report</p>
        <div style={{ width: '500px', margin: 'auto', backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px', float: 'left'}}>
          <BarChart
            text="Sleep Time in Hours"
            dataSet={[60, calculateAverage(sleepHours), 7]}
            labelSet={[
              'Average Sleep Hours Per Day',
              'Minimum Sleep Hours for Adults',
            ]}
          />
        </div>
        <div style={{ height:'290px', width: '300px', backgroundColor:'white', margin: 'auto 50px', float: 'left', marginLeft:'40px', paddingLeft:'40px', paddingRight:'30px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
          <DoughnutChart
            text="Sleep Time in Hours"
            dataSet={[calculateAverage(sleepHours), 7]}
            labelSet={[
                'Average ',
                'Minimum',
            ]}
          />
        </div>
        <div style={{ width: '880px',marginTop: '40px', marginBottom: '100px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
        <LineChart dataSet={sleepHours} labelSet={timeStamp} text={'Sleep Time in Hours'} color='#605d8a' />
        </div>
      </div>
      );
    }
    
export default SleepView;
    