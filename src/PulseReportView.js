import React, { useState, useEffect } from "react";
import moment from 'moment';
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DoughnutChart from "./DoughnutChart";

const PulseReportView = () => {
    //store data from table
    const [bpmArray, setBpmArray] = useState({});
    //store data from column
    const [bpm, setBpm] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);
  
    const [sleepBpm, setSleepBpm] = useState([]);
    const [sleepTimestamp, setSleepTimestamp] = useState([]);
  
    const [eatBpm, setEatBpm] = useState([]);
    const [eatTimestamp, setEatTimestamp] = useState([]);
  
    const [exerciseBpm, setExerciseBpm] = useState([]);
    const [exerciseTimestamp, setExerciseTimestamp] = useState([]);
  
    const [normalBpm, setNormalBpm] = useState([]);
    const [normalTimestamp, setNormalTimestamp] = useState([]);
  
    useEffect(() => {
      const bpmRef = ref(db, 'bpm');
      //snapshot keeps data updated
      onValue(bpmRef, (snapshot) => {
        const data = snapshot.val();
        setBpmArray(data); //set data from table
        const updatedBpmArray = [];
        const updatedTimeStampArray = [];
        const updatedSleepBpmArray = [];
        const updatedEatBpmArray = [];
        const updatedExerciseBpmArray = [];
        const updatedNormalBpmArray = [];
        const updatedSleepTimestampArray = [];
        const updatedEatTimestampArray = [];
        const updatedExerciseTimestampArray = [];
        const updatedNormalTimestampArray = [];
        for (const [key, value] of Object.entries(data)) {
            console.log('Activity',value.activity)
          if (value.activity === 'eating') {
            updatedEatBpmArray.push(value.bpm);
            updatedEatTimestampArray.push(moment(value.timestamp).format('lll'));
          } else if (value.activity === 'sleeping') {
            updatedSleepBpmArray.push(value.bpm);
            updatedSleepTimestampArray.push(
              moment(value.timestamp).format('lll')
            );
          } else if (value.activity === 'exercising') {
            updatedExerciseBpmArray.push(value.bpm);
            updatedExerciseTimestampArray.push(
              moment(value.timestamp).format('lll')
            );
          } else if (value.activity === 'normal') {
            updatedNormalBpmArray.push(value.bpm);
            updatedNormalTimestampArray.push(
              moment(value.timestamp).format('lll')
            );
          }
          updatedBpmArray.push(value.bpm);
          updatedTimeStampArray.push(moment(value.timestamp).format('lll'));
        }
        setBpm(updatedBpmArray); //set data from column
        setTimeStamp(updatedTimeStampArray);
  
        setEatBpm(updatedEatBpmArray);
        setEatTimestamp(updatedEatTimestampArray);
  
        setSleepBpm(updatedSleepBpmArray);
        setSleepTimestamp(updatedSleepTimestampArray);
  
        setExerciseBpm(updatedExerciseBpmArray);
        setExerciseTimestamp(updatedExerciseTimestampArray);
  
        setNormalBpm(updatedNormalBpmArray);
        setNormalTimestamp(updatedNormalTimestampArray);
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
        <p style={{ fontSize:'25px',color: '#717171'}}>Pulse Activity Report</p>
        <div style={{ width: '500px', margin: 'auto', backgroundColor:'white', padding:'20px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px', float: 'left'}}>
          <BarChart
            text="Pulse Rate"
            dataSet={[
              calculateAverage(sleepBpm),
              calculateAverage(normalBpm),
              calculateAverage(exerciseBpm),
            ]}
            labelSet={[
              'Sleeping',
              'Normal',
              'Exercising',
            ]}
          />
        </div>
        <div style={{ height:'290px', width: '300px', backgroundColor:'white', margin: 'auto 50px', float: 'left', marginLeft:'40px', paddingLeft:'40px', paddingRight:'30px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
      <PieChart
        text="Pulse Rate"
        dataSet={[
            calculateAverage(sleepBpm),
            calculateAverage(normalBpm),
            calculateAverage(exerciseBpm),
          ]}
          labelSet={[
            'Sleeping',
            'Normal',
            'Exercising',
          ]}
      />
    </div>
    <div style={{ width: '880px',marginTop: '40px', marginBottom: '40px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
    <LineChart
          dataSet={sleepBpm}
          labelSet={sleepTimestamp}
          text="Pulse Rate - Sleeping"
          color='#605d8a'
        />
    </div>
        
        <div style={{ width: '880px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
        <LineChart
          dataSet={normalBpm}
          labelSet={normalTimestamp}
          text="Pulse Rate - Normal Routine"
          color='#FFC154'
        />
        </div>
       
        <div style={{ width: '880px',marginTop: '40px', marginBottom: '100px', backgroundColor:'white', float:'left', padding: '35px', borderRadius:'5px', boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
        <LineChart
          dataSet={exerciseBpm}
          labelSet={exerciseTimestamp}
          text="Pulse Rate - Exercising"
          color='#EC6B56'

        />
        </div>
      </div>
    );
  };
  
  export default PulseReportView;