import React, {useEffect, useState} from 'react';
import ExerciseDisplayCard from '../ExerciseDisplayCard';
import axios from 'axios';
import { Button, Card, } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const PendingWorkout = ({ saveWorkout, updatedWorkout, date, reps}) => {
  const [workout, setWorkout] = useState([]);
  const [editing, setEditing] = useState(false)

  useEffect( () => {
    if(workout.length === 0 && updatedWorkout.length === 0){
      axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => {
        setWorkout([...res.data,])
        })
      }else setWorkout([...updatedWorkout])
    },[date, updatedWorkout]);
    
    saveWorkout = () => {
      axios.post(`/api/work_outs`, workout)
        .then( res => alert("Your workout has been saved"))
    };

    return (
      <>
        <h3>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()} Workout</h3>
        {workout.map( wo => 
          <div onClick={() => setEditing(!editing)}>
            <ExerciseDisplayCard
              key={wo.id}
              wo={wo}
              editing={editing}
              reps={reps}
            />
          </div>
        )}
        {workout.length > 0 &&
          <Button onClick={saveWorkout}>
            Save Workout
          </Button>
        }
      </>
  );
}

export default PendingWorkout;