import React from 'react';
import {Form, Select, Button, Input} from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import axios from 'axios';

class NewWorkOutForm extends React.Component {
  state = {
    workout: [],
    repAmount: '',
    repPace: '',
    showReps: false,
    notes: '',
    showRepAmountInput: false,
   }

  componentDidMount = () => {
    if(this.props.editing){
    this.setState({showReps: true, repAmount: this.props.repAmount, repPace: this.props.repPace, notes: this.props.exercise.notes});
    }else{
    axios.get(`/api/work_outs/${getSimpleDate(this.props.date)}/exercises/${this.props.exercise.id}`)
      .then(res => {
        this.setState({workout: [...res.data]})
        res.data.map( w => {
          if (this.props.exercise.id === w.exercise_id) this.setState({repAmount: w.rep_amount, repPace: w.rep_pace})
      })
    });}
  };
  
  handleRepAmountChange = (e, {value}) => {
    this.setState({repAmount: value});
  };

  handleRepPaceChange = (e, {value}) => {
    this.setState({repPace: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const completeExercise = {id: this.props.exercise.id, date: getSimpleDate(this.props.date), name: this.props.exercise.name, rep_amount: this.state.repAmount, rep_pace: this.state.repPace, workout_id: this.props.exercise.workoutid, notes: this.state.notes}
    this.props.getExerciseFromForm(completeExercise, this.props.editing)
    this.setState({showReps: false});
    if(this.props.editing) this.props.setEditing(false);
  };



  generateRepsDropdown = () => {
    const repAmount = [];
    const repPace = [];
    this.props.reps.amount.map( r => repAmount.push({text: r.amount, value: r.amount}));
    this.props.reps.pace.map( r => repPace.push({text: r.pace, value: r.pace}));

    return(
      <>
        <Form.Group widths='equal'>
          {!this.state.showRepAmountInput &&
          <Form.Field
          control={Select}
          options={repAmount}
          label={{ children: 'Rep Amount'}}
          placeholder='Rep Amount'
          value={this.state.workout ? this.state.repAmount : repAmount.value}
          onChange={this.handleRepAmountChange}
          />
        }
          <p
            style={{cursor: "pointer"}} 
            onClick={() => this.setState({showRepAmountInput: !this.state.showRepAmountInput})}>Other Amount?</p>
        {this.state.showRepAmountInput &&
          <Form.Field
          control={Input}
          label='Other'
          value={this.state.repAmount}
          onChange={this.handleRepAmountChange}
          />
        }
        </Form.Group>
        <Form.Field
          control={Select}
          options={repPace}
          label={{ children: 'Rep Pace'}}
          placeholder='Rep Pace'
          value={this.state.workout ? this.state.repPace : repPace.value}
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
              <br />
              <Form.Input
              label="Notes"
              value={this.state.notes}
              onChange={(e) => this.setState({notes: e.target.value})}
              /> 
              <Button size='tiny'>{this.props.editing ? 'Save Changes' : 'Add To Workout'}</Button>
              </>
                  }
          <br />
        </Form>
        </>
     );
  }
}
 
export default NewWorkOutForm;