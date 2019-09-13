import React, {useState,} from 'react';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';
import axios from 'axios';

const RepsForm = () => {
  const [amount, setAmount] = useState('');
  const [pace, setPace] = useState('');

  const handleAmountSubmit = () => {
    axios.post(`/api/rep_amounts`, {amount: amount})
      .then(res => console.log(res))
      .catch(res => console.log(res.errors))
  };

  const handlePaceSubmit = () => {
    axios.post(`/api/rep_paces`, {pace: pace})
      .then(res => console.log(res))
      .catch(res => console.log(res.errors))
  };

  return ( 
      <Segment basic>
        <Header as='h1' textAlign='center'>Add Rep Amount</Header>
        <Form onSubmit={handleAmountSubmit}>
          <Form.Input
            fluid
            // type="number"
            // pattern="[0-9]*"
            label='Rep Amount'
            placeholder='ie: 12-20'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button>Save Rep Amount</Button>
        </Form>
        <Header as='h1' textAlign='center'>Add Rep Pace</Header>
        <Form onSubmit={handlePaceSubmit}>
          <Form.Input
            fluid
            // type="number"
            // pattern="[0-9]*"
            label='Rep Pace'
            placeholder='ie: 4-2-1'
            name='pace'
            value={pace}
            onChange={(e) => setPace(e.target.value)}
          />
          <Button>Save Rep Pace</Button>
        </Form>
      </Segment>

   );
}
 
export default RepsForm;