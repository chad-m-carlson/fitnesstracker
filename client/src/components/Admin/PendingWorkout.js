import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Table, Button, Responsive} from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

const PendingWorkout = ({ saveWorkout, updatedWorkout, date}) => {
  const [workout, setWorkout] = useState([]);
  // const [existingWorkout, setExistingWorkout] = useState(false)

  useEffect( () => {
    if(workout.length === 0){

      axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => {
        // debugger
        setWorkout([...res.data, ...updatedWorkout])
        })
      }else setWorkout([...workout, ...updatedWorkout])
    },[date, updatedWorkout]);
    

    
    return (
      <>
    {/* <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Exercise</Table.HeaderCell>
          <Table.HeaderCell>Reps</Table.HeaderCell>
          <Table.HeaderCell>Pace</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {workout.map( wo => 
        <Table.Row key={wo.id}>
          <Table.Cell>{wo.name}</Table.Cell>
          <Table.Cell>{wo.rep_amount}</Table.Cell>
          <Table.Cell>{wo.rep_pace}</Table.Cell>
        </Table.Row>
        )}
      </Table.Body>
    </Table> */}
    <dl>
      {workout.map( wo=>
      <>
      <div style={{padding: ".5rem"}}>
        <dt>{wo.name}</dt>
        <dd>Reps: {wo.rep_amount}</dd>
        <dd>Pace: {wo.rep_pace}</dd>
      </div>
      </>
      )}
    </dl>
    
  {workout.length > 0 &&
   <Button onClick={saveWorkout}>
     Save Workout
   </Button>
   }
   </>
  );
}

export default PendingWorkout;