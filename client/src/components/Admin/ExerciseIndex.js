import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const ExerciseIndex = ({exerciseChanged, setExerciseChanged}) => {
  const [exercises, setExercises] = useState([]);
  //ADD A FUNCTION TO UPDATE THIS EXERCISE ARRAY IF IT IS EDITED IN THE FORM????

  useEffect( () => {
    axios.get(`/api/exercises`)
      .then(res => {
        setExercises(res.data)})
      .catch(res => console.log(res))
  }, [exerciseChanged])


  return (
    <>
      <h1>Exercise Index</h1>
      <ul>
        {exercises.map( e => 
          <li>
            <Exercise
              key={e.id}
              exercise={e}
              exerciseChanged={exerciseChanged}
              setExerciseChanged={setExerciseChanged}
            />
          </li>
        )}
      </ul>
    </>
    );
}
 
export default ExerciseIndex;