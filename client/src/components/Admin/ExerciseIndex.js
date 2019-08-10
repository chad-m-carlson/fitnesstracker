import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const ExerciseIndex = (props) => {
  const [exercises, setExercises] = useState([]);
  //ADD A FUNCTION TO UPDATE THIS EXERCISE ARRAY IF IT IS EDITED IN THE FORM????

  useEffect( () => {
    axios.get(`/exercises`)
      .then(res => {
        setExercises(res.data)
        console.log(res.data)})
      .catch(res => console.log(res))
  }, [])


  return (
    <>
      <h1>Exercise Index</h1>
      <ul>
        {exercises.map( e => 
          <li>
            <Exercise
              exercise={e}
            />
          </li>
        )}
      </ul>
    </>
    );
}
 
export default ExerciseIndex;