import React, {useState,} from 'react';
import ExerciseForm from '../Forms/ExerciseForm';
import {Icon, } from 'semantic-ui-react';
import axios from 'axios';



const Exercise = ({exercise, exerciseChanged, setExerciseChanged}) => {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [activeUpdated, setActiveUpdated] = useState(false);

  const handleActive = (id) => {
    axios.put(`/api/exercises/${id}`, {is_active: !exercise.is_active})
      .then(res => {
        exercise.is_active = !exercise.is_active;
        setActiveUpdated(!activeUpdated)
      })
  };

  return ( 
    <>
      <div 
        style={exercise.is_active ? 
        {color: 'black', display: 'flex'} : 
        {color: 'gray', textDecoration: 'line-through', display: 'flex'}}
      >
        <p>{exercise.name}</p>
        <Icon 
          name='edit' 
          onClick={() => setShowExerciseForm(!showExerciseForm)}
          style={{padding: '0 .5em'}}
        />
        <Icon
          name={exercise.is_active ? 'delete' : 'add'}
          onClick={ () => handleActive(exercise.id)}
          style={{padding: '0 .5em'}}
        />
      </div>
    {showExerciseForm &&
      <ExerciseForm 
        exercise={exercise}
        setShowExerciseForm={setShowExerciseForm}
        showExerciseForm={showExerciseForm}
        exerciseChanged={exerciseChanged}
        setExerciseChanged={setExerciseChanged}
      />
    }
  </>
  );
}
 
export default Exercise;