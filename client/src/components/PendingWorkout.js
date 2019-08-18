import React from 'react';
import {Table, } from 'semantic-ui-react';

const PendingWorkout = ({workout}) => {
  return (
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
  );
}

export default PendingWorkout;