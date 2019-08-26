import React from 'react';
import {Form, Select} from 'semantic-ui-react';

class RepsdropDown extends React.Component {
  state = { 
    repAmount: [],
    repPace: [], 
   }

  componentDidMount = () => {
    const repAmount = [];
    const repPace = [];
    this.props.reps.amount.map( r => repAmount.push({text: r.amount, value: r.amount}));
    this.props.reps.pace.map( r => repPace.push({text: r.pace, value: r.pace}));
    this.setState({repAmount, repPace})
  };

  render() { 
    return ( 
      <>
      <Form.Field
        control={Select}
        options={this.state.repAmount}
        label={{ children: 'Rep Amount'}}
        placeholder='Rep Amount'
        value={this.props.workout ? this.props.repAmount : this.state.repAmount.value}
        onChange={this.handleRepAmountChange}
      />
      <Form.Field
        control={Select}
        options={this.state.repPace}
        label={{ children: 'Rep Pace'}}
        placeholder='Rep Pace'
        value={this.props.workout ? this.props.repPace : this.state.repPace.value}
        onChange={this.handleRepPaceChange}
      />
      </>
     );
  }
}
 
export default RepsdropDown;