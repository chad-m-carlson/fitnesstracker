import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button,} from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const PendingWorkout = ({ saveWorkout, updatedWorkout, date}) => {
  const [originalWorkout, setOriginalWorkout] = useState([]);
  const [workout, setWorkout] = useState([]);
  // const [existingWorkout, setExistingWorkout] = useState(false)

  useEffect( () => {
    if(workout.length === 0 && updatedWorkout.length === 0){
      axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => {
        // debugger
        setWorkout([...res.data,])
        setOriginalWorkout([...res.data,])
        })
      }else setWorkout([...updatedWorkout])
    },[date, updatedWorkout]);
    
    saveWorkout = () => {
      axios.post(`/api/work_outs`, workout)
        .then( res => setWorkout([]))
    };
    
    return (
      <>
    <dl>
      {workout.map( wo=>
      <>
      <div key={wo.id} style={{padding: ".5rem"}}>
        <dt>{wo.name}</dt>
        <dd>Reps: {wo.rep_amount}</dd>
        <dd>Pace: {wo.rep_pace}</dd>
      </div>
      </>
      )}
    </dl>
    
  {workout.length > 0 &&
   <Button onClick={saveWorkout}>
     Save Workout
   </Button>
   }
   </>
  );
}

export default PendingWorkout;