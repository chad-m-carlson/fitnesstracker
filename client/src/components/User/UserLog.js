import React, {useState, useEffect} from 'react';
import UserLogForm from '../Forms/UserLogForm';
import axios from 'axios';
import {Button, } from 'semantic-ui-react';

const UserLog = ({workoutDate, exerciseId, workoutId,}) => {
  // const [weight, setWeight] = useState('');
  // const [reps, setReps] = useState('');
  const [userLog, setUserLog] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [refreshUserLog, setRefreshUserLog] = useState(false);

  useEffect( () => {
    axios.get(`/api/user_logs/${workoutDate}`, {params: {work_out_id: workoutId}})
      .then( res => {
          setUserLog([...res.data])
      })
      .catch( res => console.log(res.errors));
      setShowLogForm(false);
  },[workoutDate, workoutId, refreshUserLog]);

  const generateBlankUserLog = (e) => {
    setUserLog([...userLog, {reps: null, weight: null, work_out_id: workoutId, work_out_date: workoutDate}]);
    setShowLogForm(true);
  };

  const getNewUserLogFromForm = () => {
    setRefreshUserLog(!refreshUserLog)
  };

  const duplicateLastRound = () => {
    const last = userLog.length - 1
    const updatedUserLog = {work_out_date: userLog[last].work_out_date, work_out_id: userLog[last].work_out_id, weight: userLog[last].weight, reps: userLog[last].reps, notes: userLog[last].notes}
    axios.post(`/api/user_logs`, updatedUserLog)
    .then( res => {
      setUserLog([...userLog, res.data])
    })
    .catch( res => console.log(res.errors));
    setShowLogForm(false);
  };

  return ( 
    <>
      {userLog.length < 1 &&
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button 
            size='mini'
            inverted 
            color='green'
            onClick={() => generateBlankUserLog()}>
            Add Round
          </Button>
        </div>
      }
      {userLog.map( (u, index) => 
        <UserLogForm
        key={u.id}
        round={index + 1}
        userLog={u}
        exerciseId={exerciseId}
        openLogFormAutomatically={showLogForm}
        getNewUserLogFromForm={getNewUserLogFromForm}
        />
      )}
      {userLog.length >= 1 &&
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button 
            style={{margin: "0 aut0"}}
            size='mini'
            inverted 
            color='green'
            onClick={() => generateBlankUserLog()}>
            Add Round
          </Button>
          <Button
            style={{margin: "0 aut0"}}
            size='mini'
            inverted 
            color='green'
            onClick={() => duplicateLastRound()}>
            Duplicate Last Round
          </Button>

        </div>
      }
    </>
   );
}
 
export default UserLog;