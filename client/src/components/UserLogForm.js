import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';

const UserLogForm = ({round, id, userLog, exerciseId}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [logExists, setLogExists] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect( () => {
    setWeight(userLog.weight);
    setReps(userLog.reps);
    if(userLog.id)setLogExists(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserLog = {work_out_date: userLog.work_out_date, weight: weight, reps: reps, work_out_id: userLog.work_out_id,};
    if (logExists){
      axios.put(`/api/user_logs/${userLog.id}`, updatedUserLog)
      return
    };
    axios.post(`/api/user_logs`, updatedUserLog)
      .then( res => {
        setWeight(res.data.weight)
        setReps(res.data.reps)
      })
      .catch( res => console.log(res.errors));
    setLogExists(true);
  }

  return ( 
    <Segment>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <Card.Meta>Round {round}</Card.Meta>
      <Icon
        circular
        name={showLogForm ? "close" : "caret down"}
        size="small"
        onClick={() => setShowLogForm(!showLogForm)}
      />
      </div>
      {/* <Card.Description></Card.Description> */}
      {showLogForm && 
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
          <Button 
            style={{display: "flex", margin: "0 auto"}}
            size="mini"
            inverted
            color='green'
            >
          {logExists ? 'Update' : 'Save'} 
          </Button>
        </Form>
      }
    </Segment>
   );
}
 
export default UserLogForm;