import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise';


const ExerciseByCategory = (props) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [showExercises, setShowExercises] = useState(false);

  useEffect( () => {
    axios.get(`/api/exercise_categories`)
      .then(res => setExerciseCategories(res.data))
  },[]);

  const setCategory = (category) => {
    setShowExercises(false)
    axios.get(`/api/exercise_categories/${category}`)
      .then( res => {
        setExercises(res.data)
        setShowExercises(true)
      })
  };

  return ( 
    <>
      <ul>
        {exerciseCategories.map( c => 
          <li 
            key={c.id}
            onClick={ () => setCategory(c.id)} 
            style={{cursor: 'pointer'}}  
          >{c.category_name}</li>  
          )}
        {/* <li 
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
        >Super Sets</li> */}
      </ul>
      <ul>
      {showExercises &&
        exercises.map( e => 
          <li key={e.id}>
            <Exercise
              exercise={e}
            />
          </li>
        )
      }
      </ul>
    </>
   );
}
 
export default ExerciseByCategory;