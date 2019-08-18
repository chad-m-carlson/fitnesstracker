import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import PendingWorkout from './PendingWorkout';
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
    axios.get(`/api/work_outs/${simpleDate}`)
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
      <PendingWorkout 
        workout={workout}
      />
    </>
   );
}
 
export default Home ;