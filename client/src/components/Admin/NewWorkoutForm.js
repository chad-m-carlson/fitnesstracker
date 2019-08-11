import React from 'react';
import {Form, Select, Button, } from 'semantic-ui-react';

class NewWorkOutForm extends React.Component {
  state = {
    repAmount: '',
    repPace: '',
    showReps: false,
   }

  handleRepAmountChange = (e, {value}) => {
    this.setState({repAmount: value});
  };

  handleRepPaceChange = (e, {value}) => {
    this.setState({repPace: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const completeExercise = {exerciseName: this.props.exercise.name, repAmount: this.state.repAmount, repPace: this.state.repPace}
    this.props.getRepsFromForm(completeExercise)
    this.setState({showReps: false});
  };


  generateRepsDropdown = () => {
    const repAmount = [];
    const repPace = [];
    this.props.reps.map( r => repAmount.push({text: r.amount, value: r.amount}));
    this.props.reps.map( r => repPace.push({text: r.pace, value: r.pace}));

    return(
      <>
        <Form.Field
          control={Select}
          options={repAmount}
          label={{ children: 'Rep Amount'}}
          placeholder='Rep Amount'
          value={repAmount.value}
          onChange={this.handleRepAmountChange}
        />
        <Form.Field
          control={Select}
          options={repPace}
          label={{ children: 'Rep Pace'}}
          placeholder='Rep Pace'
          value={repPace.value}
          onChange={this.handleRepPaceChange}
        />
    </>
    )
  };

  render() { 
    return ( 
      <>
        <Form onSubmit={this.handleSubmit}>
                <>
                <li>{this.props.exercise.name}
                    <span>
                      <Form.Checkbox
                        onChange={() => this.setState({showReps: !this.state.showReps})}
                        value={this.state.showReps}
                      />
                      CHECKBOX DOESN'T DEFAULT CORRECTLY
                    </span>
                      {this.state.showReps && 
                      <>
                    <span>
                        {this.generateRepsDropdown()}
                    </span>
                    <Button size='tiny'>Add To Workout</Button>
                    </>
                        }
                </li>
                <br />
                </>
          </Form>
        </>
     );
  }
}
 
export default NewWorkOutForm;