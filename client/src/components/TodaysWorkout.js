import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, } from 'semantic-ui-react';
import {getSimpleDate, } from '../helpers/HelperFunctions'

const TodaysWorkout = ({date,}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => setWorkout([...res.data]))
    },[date]);
    
    
    return (
    <>
     {workout.map( wo => 
      <Card key={wo.id}>
        <Card.Content>
          <Card.Header style={{textAlign: "center", marginBottom: "1rem"}}>{wo.name}</Card.Header>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <Card.Meta>Reps</Card.Meta>
            <Card.Description>{wo.rep_amount}</Card.Description>
            <Card.Meta>Pace</Card.Meta>
            <Card.Description>{wo.rep_pace}</Card.Description>
          </div>
        </Card.Content>
      </Card>
    )}
   </>
  );
}

export default TodaysWorkout;