import React, {useContext, useState, } from 'react';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import PendingWorkout from './PendingWorkout';
import "react-datepicker/dist/react-datepicker.css";

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
      <Datepicker
        selected={date}
        onChange={handleDateChange}
      />
      <PendingWorkout 
        date={date}
      />
    </>
   );
}
 
export default Home ;