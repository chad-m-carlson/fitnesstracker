import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Search from '../Search';
import Exercise from './Exercise';

const ExerciseIndex = ({exerciseChanged, setExerciseChanged}) => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  //ADD A FUNCTION TO UPDATE THIS EXERCISE ARRAY IF IT IS EDITED IN THE FORM????

  useEffect( () => {
    axios.get(`/api/exercises`)
      .then(res => {
        setExercises(res.data)})
      .catch(res => console.log(res))
  }, [exerciseChanged])

  const returnResults = (results, active) => {
    if(active){
      setFilteredExercises(results)
      setSearchActive(true)
    }else setSearchActive(false)
  };

  const renderExerciseList = () => {
    if(searchActive === true){
      return(
        filteredExercises.map( e => 
          <li key={e.id}>
            <Exercise
              exercise={e}
              exerciseChanged={exerciseChanged}
              setExerciseChanged={setExerciseChanged}
            />
          </li>
        )
      )
    }else return(
      exercises.map( e => 
        <li key={e.id}>
          <Exercise
            exercise={e}
            exerciseChanged={exerciseChanged}
            setExerciseChanged={setExerciseChanged}
          />
        </li>
      )
    )
  };

  return (
    <>
      <h1>Exercise Index</h1>
      <Search
        data={exercises}
        name="Search Exercises"
        returnResults={returnResults}
        searchActive={searchActive}
      />
      <ul>
      {renderExerciseList()}
      </ul>
    </>
    );
}
 
export default ExerciseIndex;