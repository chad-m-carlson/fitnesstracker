import React, {useState, } from 'react';
import axios from 'axios';
import {Card, Button} from 'semantic-ui-react';

const ExerciseDisplayCard = ({wo, admin, handleDelete}) => {
  const [editing, setEditing] = useState(false)

  return ( 
      <Card > 
      <Card.Content>
        <Card.Header style={{textAlign: "center", marginBottom: "1rem"}}>{wo.name}</Card.Header>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <Card.Meta>Reps</Card.Meta>
          <Card.Description>{wo.rep_amount}</Card.Description>
          <Card.Meta>Pace</Card.Meta>
          <Card.Description>{wo.rep_pace}</Card.Description>
        </div>
        {admin &&
        <>
        <Button onClick={() => setEditing(!editing)}>Edit</Button>
        <Button onClick={() => handleDelete(wo.workoutid)} color='red'>Delete</Button>
        </>
        }
      </Card.Content>
    </Card>
   );
}
 
export default ExerciseDisplayCard;