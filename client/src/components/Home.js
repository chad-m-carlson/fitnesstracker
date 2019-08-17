import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import {Table, } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";

const Home  = () => {
  const [workout, setWorkout] = useState([]);
  const [date, setDate] = useState(new Date());
  const {authenticated, user} = useContext(AuthContext);

  useEffect( () => {
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();
    let simpleDate = `${month}${day}${year}`
    axios.get(`/work_outs/${simpleDate}`)
      .then( res => {
        setWorkout([...res.data])
      })
  }, [date])

  const handleDateChange = (date) => {
    setDate(date);
  };

  return ( 
    <>
      <h1>Home Page</h1>
      {authenticated &&
        <>
        <h2>Welcome {user.email}!</h2>
        <h3>Select a date to view a workout</h3>
        </>
        }
      <Datepicker
        selected={date}
        onChange={handleDateChange}
      />
      MAKE THIS TABLE A NEW COMPONENT FOR HERE, AND FOR DISPLAYING ADMIN PENDING WORKOUT
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