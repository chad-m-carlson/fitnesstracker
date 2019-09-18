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
    if(openLogFormAutomatically && (!weight || !reps))setShowLogForm(true);
  }, [openLogFormAutomatically, userLog.id, userLog.notes, userLog.reps, userLog.weight]);

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
      {((weight || reps) && !showLogForm) && 
      <>
        <Card.Description>{weight} lbs</Card.Description>
        <Card.Description>{reps} reps</Card.Description>
      </>
      }
      <Icon
        name={showLogForm ? "window close outline" : "caret down"}
        size="large"
        onClick={() => setShowLogForm(!showLogForm)}
        />
      </div>
      {!showLogForm &&
        <Card.Meta>{notes}</Card.Meta>
      }
      {/* <Card.Description></Card.Description> */}
      {showLogForm && 
        <Form onSubmit={handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              autoFocus
              type="number"
              pattern="[0-9]*"
              label='Weight'
              placeholder='Weight'
              name='weight'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              />
            <Form.Input
              fluid
              type="number"
              pattern="[0-9]*"
              label='Reps'
              placeholder='Reps'
              name='reps'
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