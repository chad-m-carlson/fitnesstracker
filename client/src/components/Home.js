import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../providers/AuthProvider';
import {Table, } from 'semantic-ui-react';

const Home  = () => {
  const [workout, setWorkout] = useState([]);
  const {authenticated, user} = useContext(AuthContext);

  useEffect( () => {
    axios.get(`/work_outs/200`)
      .then( res => {
        setWorkout([...res.data])
      })
  }, [])

  return ( 
    <>
      <h1>Home Page</h1>
      {authenticated &&
        <h2>Welcome {user.email}</h2>
        }
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
 
export default Home ;