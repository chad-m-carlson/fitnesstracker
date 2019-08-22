import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Table, Button} from 'semantic-ui-react';
import {getSimpleDate, } from '../helpers/HelperFunctions'

const TodaysWorkout = ({date,}) => {
  const [workout, setWorkout] = useState([]);

  useEffect( () => {
    axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then(res => setWorkout([...res.data]))
    },[date]);
    
    
    return (
      <>
    <Table celled>
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
    </Table>
   </>
  );
}

export default TodaysWorkout;