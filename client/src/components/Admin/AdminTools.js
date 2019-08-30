import React, {useState, } from 'react';
import ExerciseForm from './ExerciseForm';
import ExerciseIndex from './ExerciseIndex';
import ExerciseByCategory from './ExerciseByCategory';
import {Link, } from 'react-router-dom';

const AdminTools = (props) => {
  const [showExerciseIndex, setShowExerciseIndex] = useState(false);
  const [showExerciseCategories, setShowExerciseCategories] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  
  return ( 
    <>
      <h1>Admin Tools</h1>
      <h3>
        <Link to='newworkout'>Add/Edit Workout</Link>
      </h3>
      <h3 
        onClick={() => setShowExerciseIndex(!showExerciseIndex)}
        style={{cursor: 'pointer'}}
        >Show All Exercises</h3>
      {showExerciseIndex &&
        <ExerciseIndex />
      }
      <h3
        onClick={() => setShowExerciseCategories(!showExerciseCategories)}
        style={{cursor: 'pointer'}}
      >Exercises By Category</h3>
      {showExerciseCategories &&
        <ExerciseByCategory />  
      }
      <h3 
        onClick={() => setShowExerciseForm(!showExerciseForm)}
        style={{cursor: 'pointer'}}
        >Add an exercise</h3>
      {showExerciseForm &&
        <ExerciseForm 
          setShowExerciseForm={setShowExerciseForm}
          showExerciseForm={showExerciseForm}
        />
      }
    </>
   );
}
 
export default AdminTools;