import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ExerciseForm from './ExerciseForm';
import {Icon, } from 'semantic-ui-react';

const ExerciseIndex = (props) => {
  const [exercises, setExercises] = useState([]);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [activeUpdated, setActiveUpdated] = useState(false);

  useEffect( () => {
    axios.get(`/exercises`)
      .then(res => {
        setExercises(res.data)
        console.log(res.data)})
      .catch(res => console.log(res))
  }, [activeUpdated])

  const handleActive = (id) => {
    let updateActive = exercises.find(e => e.id === id)
    axios.put(`/exercises/${id}`, {is_active: !updateActive.is_active})
      .then(res => {
        updateActive.is_active = !updateActive.is_active;
        setActiveUpdated(!activeUpdated)
        console.log(updateActive.is_active)
      })
  }

  return (
    <>
      <h1>Exercise Index</h1>
      <ul>
        {exercises.map( e => 
          <>
            <li
                style={e.is_active ? {color: 'black'} : {color: 'gray'}}
            >{e.name}
            <Icon 
              name='edit' 
              onClick={() => setShowExerciseForm(!showExerciseForm)}
              style={{padding: '.5em'}}
            />
            <Icon
              name={e.is_active ? 'delete' : 'add'}
              onClick={ () => handleActive(e.id)}
              style={{padding: '.5em'}}
            />
            {showExerciseForm &&
              <ExerciseForm 
              
              />
            }
            </li>
          </>)
        }
      </ul>
    </>
    );
}
 
export default ExerciseIndex;