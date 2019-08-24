import React, {useState, } from 'react';
import {Card, } from 'semantic-ui-react';

const ExerciseDisplayCard = ({wo, editing, reps}) => {


  const renderEditCard = () => (
    <Card.Content>
      <Card.Header style={{textAlign: "center", marginBottom: "1rem"}}>{wo.name}</Card.Header>
      <div style={{display: "flex", justifyContent: "space-around"}}>
        <Card.Meta>Reps</Card.Meta>
        <Card.Description>{wo.rep_amount}</Card.Description>
        <Card.Meta>Pace</Card.Meta>
        <Card.Description>{wo.rep_pace}</Card.Description>
      </div>
    </Card.Content>
  );

  return ( 
    <Card 
      key={wo.id}
    >
    {editing ? renderEditCard() :
      <Card.Content>
        <Card.Header style={{textAlign: "center", marginBottom: "1rem"}}>{wo.name}</Card.Header>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <Card.Meta>Reps</Card.Meta>
          <Card.Description>{wo.rep_amount}</Card.Description>
          <Card.Meta>Pace</Card.Meta>
          <Card.Description>{wo.rep_pace}</Card.Description>
        </div>
      </Card.Content>
    }
    </Card>
   );
}
 
export default ExerciseDisplayCard;