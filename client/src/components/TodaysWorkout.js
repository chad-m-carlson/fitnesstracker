import React, {useEffect, useState} from 'react';
import ExerciseDisplayCard from './ExerciseDisplayCard';
import axios from 'axios';
import {Card, } from 'semantic-ui-react';
import {getSimpleDate, } from '../helpers/HelperFunctions'

const TodaysWorkout = ({date,}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => setWorkout([...res.data]))
    },[date]);
    
    
    return (
    <>
     {workout.map( wo => 
      <ExerciseDisplayCard 
        key={wo.id} 
        wo={wo} 
      />
    )}
   </>
  );
}

export default TodaysWorkout;