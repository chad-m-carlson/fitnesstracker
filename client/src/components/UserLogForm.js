import React, {useState, useEffect} from 'react';
import {Form, Button, } from 'semantic-ui-react';
import axios from 'axios';

const UserLogForm = ({workoutDate, exerciseId, workoutId,}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [userLog, setUserLog] = useState({});
  const [logExists, setLogExists] = useState(false);

  useEffect( () => {
    axios.get(`/api/userlog_by_workout/${workoutDate}`, {params: {work_out_id: workoutId}})
      .then( res => {
          setUserLog(res.data)
          if (res.data){
            setWeight(res.data.weight)
            setReps(res.data.reps)
            setLogExists(true)
          }else{
            setWeight('')
            setReps('')
            setLogExists(false)
          }
      })
      .catch( res => console.log(res.errors));
  },[workoutDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserLog = {work_out_date: workoutDate, weight: weight, reps: reps, work_out_id: workoutId, exercise_id: exerciseId}
    if (logExists){
      axios.put(`/api/user_logs/${userLog.id}`, updatedUserLog)
      return
    }
    axios.post(`/api/user_logs`, updatedUserLog)
      .then( res => {
        setUserLog(res.data)
        setWeight(res.data.weight)
        setReps(res.data.reps)
      })
      .catch( res => console.log(res.errors))
    setLogExists(true)
  };

  return ( 
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Weight'
            placeholder='Weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Form.Input
            fluid
            label='Reps'
            placeholder='Reps'
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </Form.Group>
        <Button style={{display: "flex", margin: "0 auto"}}>{logExists ? 'Update' : 'Save'} </Button>
      </Form>
    </>
   );
}
 
export default UserLogForm;