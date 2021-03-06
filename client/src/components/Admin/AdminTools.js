import React, {useState, } from 'react';
import ExerciseForm from '../Forms/ExerciseForm';
import ExerciseIndex from './ExerciseIndex';
import ExerciseByCategory from './ExerciseByCategory';
import RepsForm from '../Forms/RepsForm';
import {PageContainer, CardContainer } from '../styles/styles';
import {Segment, } from 'semantic-ui-react';

const AdminTools = (props) => {
  const [showExerciseIndex, setShowExerciseIndex] = useState(false);
  const [showExerciseCategories, setShowExerciseCategories] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showRepsForm, setShowRepsForm] = useState(false);
  const [exerciseChanged, setExerciseChanged] = useState(false);

  return ( 
    <PageContainer>
      <CardContainer>
      <h1>Admin Tools</h1>
        <Segment onClick={() => props.history.push(`/newworkout`)} style={{cursor: 'pointer', width: "75%"}}>
          <h3>
            Add/Edit Workout
          </h3>
        </Segment>
        <Segment onClick={() => setShowExerciseIndex(!showExerciseIndex)} style={{cursor: 'pointer', width: "75%"}}>
          <h3 
            >{showExerciseIndex ? "Hide All Exercises" : "Show All Exercises"}</h3>
        </Segment>
        {showExerciseIndex &&
          <Segment>
              <ExerciseIndex 
                exerciseChanged={exerciseChanged}
                setExerciseChanged={setExerciseChanged}
              />
          </Segment>
        }
        {/* <Segment style={{cursor: 'pointer', width: "80%"}}>
          <h3
            onClick={() => setShowExerciseCategories(!showExerciseCategories)}
            >Exercises By Category</h3>
        </Segment>
        {showExerciseCategories &&
          <Segment>
            <ExerciseByCategory 
              exerciseChanged={exerciseChanged}
              setExerciseChanged={setExerciseChanged}
            />  
          </Segment>
        } */}
        <Segment style={{cursor: 'pointer', width: "75%"}}>
          <h3 
            onClick={() => setShowExerciseForm(!showExerciseForm)}
            >Add an exercise</h3>
        </Segment>
        {showExerciseForm &&
          <Segment style={{width:"80%"}}>
            <ExerciseForm 
              setShowExerciseForm={setShowExerciseForm}
              showExerciseForm={showExerciseForm}
              setExerciseChanged={setExerciseChanged}
              exerciseChanged={exerciseChanged}
              />
          </Segment>
        }
        <Segment style={{cursor: 'pointer', width: "75%"}}>
          <h3
            onClick={() => setShowRepsForm(!showRepsForm)}
            >Add Reps/Tempo</h3>
        </Segment>
        {showRepsForm &&
          <Segment style={{width: "80%"}}>
            <RepsForm/>
          </Segment>
        }
      </CardContainer>
    </PageContainer>
   );
}
 
export default AdminTools;