import React, {useState, } from 'react';
import ExerciseForm from './ExerciseForm';
import ExerciseIndex from './ExerciseIndex';

const AdminTools = (props) => {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showExerciseIndex, setShowExerciseIndex] = useState(false);
  
  return ( 
    <>
      <h1>Admin Tools</h1>
      <h3 
        onClick={() => setShowExerciseIndex(!showExerciseIndex)}
        style={{cursor: 'pointer'}}
        >Show All Exercises</h3>
      {showExerciseIndex &&
        <ExerciseIndex />
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