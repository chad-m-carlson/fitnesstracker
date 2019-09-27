import React, {useEffect, useState} from 'react';
import ExerciseDisplayCard from '../ExerciseDisplayCard';
import {sortExercises} from '../../helpers/HelperFunctions';
import axios from 'axios';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const PendingWorkout = ({ updatedWorkout, date,reps, getExerciseFromForm, handleDelete}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    if(workout.length === 0 && updatedWorkout.length === 0){
      axios.get(`/api/work_outs/${encodeURIComponent(getSimpleDate(date))}`)
      .then(res => {
        setWorkout([...res.data,])
        })
      }else setWorkout([...updatedWorkout])
    },[date, updatedWorkout,]);

    // const handleDelete = (id) => {
    //   debugger
    //   let newWorkout = workout.filter( wo => wo.workoutid !== id)
    //   setWorkout([...newWorkout])
    //   // axios.delete(`/api/work_outs/${id}`)
    // };

    return (
      <div style={{marginBottom: "2rem"}}> 
        {sortExercises(workout, "exercise_order").map( (wo, index) =>
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
      </div>
  );
}

export default PendingWorkout;