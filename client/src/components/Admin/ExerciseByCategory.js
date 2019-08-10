import React, {useState, } from 'react';
import axios from 'axios';
import Exercises from './Exercises';


const ExerciseByCategory = (props) => {
  const [exercises, setExercises] = useState([]);
  const [showExercises, setShowExercises] = useState(false)

  const setCategory = (category) => {
    setShowExercises(false)
    axios.get(`/exercises/${category}`)
      .then( res => {
        setExercises(res.data)
        setShowExercises(true)
      })
  };

  return ( 
    <>
      <ul>
        <li 
          onClick={ () => setCategory('arms')} 
          style={{cursor: 'pointer'}}  
        >Arms</li>
        <li 
          onClick={ () => setCategory('back')} 
          style={{cursor: 'pointer'}}  
        >Back</li>
        <li 
          onClick={ () => setCategory('cardio')} 
          style={{cursor: 'pointer'}}  
        >cardio</li>
        <li 
          onClick={ () => setCategory('chest')} 
          style={{cursor: 'pointer'}}  
        >Chest</li>
        <li 
          onClick={ () => setCategory('core')} 
          style={{cursor: 'pointer'}}  
        >Core</li>
        <li 
          onClick={ () => setCategory('legs')} 
          style={{cursor: 'pointer'}}  
        >Legs</li>
        <li 
          onClick={ () => setCategory('shoulders')} 
          style={{cursor: 'pointer'}}  
        >Shoulders</li>
        <li 
          onClick={ () => setCategory('superset')} 
          style={{cursor: 'pointer'}}  
        >Super Sets</li>
      </ul>
      {showExercises &&
        <Exercises
          exercises={exercises}
        />
      }
    </>
   );
}
 
export default ExerciseByCategory;