import React, {useState} from 'react';
import {Form, Button, } from 'semantic-ui-react';
import axios from 'axios';

const UserLogForm = ({workoutId, exerciseId}) => {
  const [weight, setWeight] = useState(null);
  const [reps, setReps] = useState(null);

  const handleSubmit = () => {
    const userLog = {weight: weight, reps: reps, work_out_id: workoutId, exercise_id: exerciseId}
    axios.post(`/api/user_logs`, userLog)
      .then( res => console.log(res.data))
      .catch( res => console.log(res.errors))
  };

  return ( 
    <>
      <h3>User Logging Form</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            placeholder='Weight'
            onChange={(e) => setWeight(e.target.value)}
          />
          <Form.Input
            fluid
            placeholder='Reps'
            onChange={(e) => setReps(e.target.value)}
          />
          <Button>Save</Button>
        </Form.Group>
      </Form>
    </>
   );
}
 
export default UserLogForm;