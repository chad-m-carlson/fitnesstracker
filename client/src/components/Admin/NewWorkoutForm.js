import React from 'react';
import {Form, Select, Button, } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions'

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
    const completeExercise = {exerciseId: this.props.exercise.id, date: getSimpleDate(this.props.date), name: this.props.exercise.name, rep_amount: this.state.repAmount, rep_pace: this.state.repPace}
    this.props.getExerciseFromForm(completeExercise)
    this.setState({showReps: false});
  };

  componentDidMount = () => {
    this.props.workout.map( w => {
      if (this.props.exercise.id === w.exerciseId) {
        this.setState({showReps: true, repAmount: w.repAmount, repPace: w.repPace})
      }
    })
  }


  generateRepsDropdown = () => {
    const repAmount = [];
    const repPace = [];
    this.props.reps.amount.map( r => repAmount.push({text: r.amount, value: r.amount}));
    this.props.reps.pace.map( r => repPace.push({text: r.pace, value: r.pace}));

    return(
      <>
        <Form.Field
          control={Select}
          options={repAmount}
          label={{ children: 'Rep Amount'}}
          placeholder='Rep Amount'
          value={this.props.workout ? this.state.repAmount : repAmount.value}
          onChange={this.handleRepAmountChange}
        />
        <Form.Field
          control={Select}
          options={repPace}
          label={{ children: 'Rep Pace'}}
          placeholder='Rep Pace'
          value={this.props.workout ? this.state.repPace : repPace.value}
          onChange={this.handleRepPaceChange}
        />
    </>
    )
  };

  render() { 
    return ( 
      <>
        <Form onSubmit={this.handleSubmit}>
          <li onClick={() => this.setState({showReps: !this.state.showReps,})}>
            {this.props.exercise.name}
              </li>
                {this.state.showReps && 
                <>
              <div>
                  {this.generateRepsDropdown()}
              </div>
              <Button size='tiny'>Add To Workout</Button>
              </>
                  }
          <br />
        </Form>
        </>
     );
  }
}
 
export default NewWorkOutForm;