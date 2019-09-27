import React, {useEffect, useState} from 'react';
import ExerciseDisplayCard from '../ExerciseDisplayCard';
import axios from 'axios';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const TodaysWorkout = ({date,}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    axios.get(`/api/work_outs/${encodeURIComponent(getSimpleDate(date))}`)
      .then(res => setWorkout([...res.data]))
    },[date]);
    
    
    return (
    <div style={{marginBottom: "2rem"}}>
     {workout.map( wo => 
      <ExerciseDisplayCard 
        key={wo.id} 
        wo={wo} 
      />
    )}
   </div>
  );
}

export default TodaysWorkout;