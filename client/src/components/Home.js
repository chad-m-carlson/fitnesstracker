import React, {useContext, useState, } from 'react';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import TodaysWorkout from './TodaysWorkout';
import "react-datepicker/dist/react-datepicker.css";
import {Form, } from 'semantic-ui-react';

const Home  = () => {
  const [date, setDate] = useState(new Date());
  const {authenticated, user} = useContext(AuthContext);

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
      <Form>
        <Datepicker
          inline
          selected={date}
          onChange={handleDateChange}
        />
      </Form>
      <TodaysWorkout 
        date={date}
      />
    </>
   );
}
 
export default Home ;