import React, {useState, useEffect} from 'react';
import {Form, Button, } from 'semantic-ui-react';
import axios from 'axios';

const UserLogForm = ({workoutId, exerciseId}) => {
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);
  const [userLog, setUserLog] = useState({}); //TAKE THIS OUT???
  const [logExists, setLogExists] = useState(false);

  useEffect( () => {
    axios.get(`/api/userlog_by_workout/${workoutId}`)
      .then( res => {
        setUserLog({...res.data})//CAN PROBABLY TAKE THIS OUT
        setWeight(res.data[0].weight)
        setReps(res.data[0].reps)
        setLogExists(true)
      })
      .catch( res => console.log(res.errors));
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userLog = {weight: weight, reps: reps, work_out_id: workoutId, exercise_id: exerciseId}
    axios.post(`/api/user_logs`, userLog)
      .then( res => {
        // setUserLog(...res.data)
        setWeight(res.data[0].weight)
        setReps(res.data[0].reps)
        setLogExists(true)})
      .catch( res => console.log(res.errors))
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