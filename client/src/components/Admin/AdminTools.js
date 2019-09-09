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
  
  return ( 
    <PageContainer>
      <CardContainer>
        <h1>Admin Tools</h1>
        <Segment onClick={() => props.history.push(`/newworkout`)} style={{cursor: 'pointer'}}>
          <h3>
            Add/Edit Workout
          </h3>
        </Segment>
        <Segment onClick={() => setShowExerciseIndex(!showExerciseIndex)} style={{cursor: 'pointer'}}>
          <h3 
            >Show All Exercises</h3>
        </Segment>
        {showExerciseIndex &&
          <Segment>
              <ExerciseIndex />
          </Segment>
        }
        <Segment style={{cursor: 'pointer'}}>
          <h3
            onClick={() => setShowExerciseCategories(!showExerciseCategories)}
            >Exercises By Category</h3>
        </Segment>
        {showExerciseCategories &&
          <Segment>
            <ExerciseByCategory />  
          </Segment>
        }
        <Segment style={{cursor: 'pointer'}}>
          <h3 
            onClick={() => setShowExerciseForm(!showExerciseForm)}
            >Add an exercise</h3>
        </Segment>
        {showExerciseForm &&
          <Segment>
            <ExerciseForm 
              setShowExerciseForm={setShowExerciseForm}
              showExerciseForm={showExerciseForm}
              />
          </Segment>
        }
        <Segment style={{cursor: 'pointer'}}>
          <h3
            onClick={() => setShowRepsForm(!showRepsForm)}
            >Add Reps/Rep Pace</h3>
        </Segment>
        {showRepsForm &&
          <Segment>
            <RepsForm/>
          </Segment>
        }
      </CardContainer>
    </PageContainer>
   );
}
 
export default AdminTools;