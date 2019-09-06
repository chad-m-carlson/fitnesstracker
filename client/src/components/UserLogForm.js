import React, {useState, useEffect} from 'react';
import {Form, Button, Card, Segment, Icon} from 'semantic-ui-react';
import axios from 'axios';

const UserLogForm = ({round,openLogFormAutomatically, userLog,}) => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');
  const [logExists, setLogExists] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect( () => {
    setWeight(userLog.weight);
    setReps(userLog.reps);
    setNotes(userLog.notes);
    if(userLog.id)setLogExists(true);
    if(openLogFormAutomatically)setShowLogForm(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUserLog = {work_out_date: userLog.work_out_date, work_out_id: userLog.work_out_id, 
      weight, reps, notes,};
    if (logExists){
      axios.put(`/api/user_logs/${userLog.id}`, updatedUserLog)
        .then(res => setShowLogForm(false));
      return
    };
    axios.post(`/api/user_logs`, updatedUserLog)
      .then( res => {
        setWeight(res.data.weight);
        setReps(res.data.reps);
        setShowLogForm(false);
      })
      .catch( res => console.log(res.errors));
    setLogExists(true);
  }

  return ( 
    <Segment>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <Card.Meta>Round {round}</Card.Meta>
      {(weight && !showLogForm) && 
      <>
        <Card.Meta>{weight} lbs</Card.Meta>
        <Card.Meta>{reps} reps</Card.Meta>
      </>
      }
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
          <Form.Input
            fluid
            label='Notes'
            placeholder='Notes'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
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