import React, {useState, } from 'react';
import NewWorkoutForm from './Admin/NewWorkoutForm';
import {Card, Button} from 'semantic-ui-react';

const ExerciseDisplayCard = ({wo, admin, handleDelete, date, reps, getExerciseFromForm}) => {
  const [editing, setEditing] = useState(false)

  return ( 
    <>
      <Card > 
      <Card.Content>
        <Card.Header style={{textAlign: "center", marginBottom: "1rem"}}>{wo.name}</Card.Header>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <Card.Meta>Reps</Card.Meta>
          <Card.Description>{wo.rep_amount}</Card.Description>
          <Card.Meta>Pace</Card.Meta>
          <Card.Description>{wo.rep_pace}</Card.Description>
        </div>
        <br />
        <div style={{display: "flex", justifyContent: "center"}}>
          <Card.Description style={{fontStyle: "italic"}}>{wo.notes}</Card.Description>
        </div>
        {admin &&
        <>
        <Button onClick={() => setEditing(!editing)}>Edit</Button>
        <Button onClick={() => handleDelete(wo.workoutid)} color='red'>Delete</Button>
        </>
        }
      </Card.Content>
    </Card>
    {editing &&
      <NewWorkoutForm 
        exercise={wo}
        date={date}
        reps={reps}
        repAmount={wo.rep_amount}
        repPace={wo.rep_pace}
        getExerciseFromForm={getExerciseFromForm}
        editing
        setEditing={setEditing}
      />
    }
    </>
   );
}
 
export default ExerciseDisplayCard;