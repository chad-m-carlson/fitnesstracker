import React, {useEffect, useState} from 'react';
import ExerciseDisplayCard from '../ExerciseDisplayCard';
import axios from 'axios';
import { Button, } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const PendingWorkout = ({ saveWorkout, updatedWorkout, date,reps, getExerciseFromForm, sendIndexToNewWorkout}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    if(workout.length === 0 && updatedWorkout.length === 0){
      axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => {
        setWorkout([...res.data,])
        })
      }else setWorkout([...updatedWorkout])
    },[date, updatedWorkout,]);
    
    saveWorkout = () => {
      axios.post(`/api/work_outs`, workout)
        .then( res => alert("Your workout has been saved"))
    };

    const handleDelete = (id) => {
      let newWorkout = workout.filter( wo => wo.workoutid !== id)
      setWorkout([...newWorkout])
      axios.delete(`/api/work_outs/${id}`)
    };

    return (
      <>
        <h3>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()} Workout</h3>
        {workout.map( (wo, index) =>
            <ExerciseDisplayCard
              index={index}
              key={wo.id}
              wo={wo}
              admin
              handleDelete={handleDelete}
              date={date}
              reps={reps}
              getExerciseFromForm={getExerciseFromForm}
              // reps={reps}
            />
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