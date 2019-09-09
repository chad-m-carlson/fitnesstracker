import React from 'react';
import {Form, Select, Button, Input, Segment} from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import styled from 'styled-components';
import axios from 'axios';

class NewWorkOutForm extends React.Component {
  state = {
    workout: [],
    repAmount: '',
    repPace: '',
    showReps: false,
    notes: '',
    showRepAmountInput: false,
    showRepPaceInput: false,
    exercise_order: null,
   }

  componentDidMount = () => {
    if(this.props.editing){
    this.setState({showReps: true, repAmount: this.props.repAmount, repPace: this.props.repPace, notes: this.props.exercise.notes, exercise_order: this.props.exercise.exercise_order});
    }else if(this.props.new_exercise){
      this.setState({showReps: false, repAmount: this.props.repAmount, repPace: this.props.repPace, notes: this.props.exercise.notes, exercise_order: this.props.index});
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
    const completeExercise = {id: this.props.exercise.id, date: getSimpleDate(this.props.date), name: this.props.exercise.name, rep_amount: this.state.repAmount, rep_pace: this.state.repPace, workout_id: this.props.exercise.workoutid, notes: this.state.notes, exercise_order: this.state.exercise_order}
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
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{display: "flex"}}>
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
              {this.state.showRepAmountInput &&
                <Form.Field
                  autofocus
                  control={Input}
                  type="number"
                  // pattern="[0-9]*"
                  label='Other'
                  value={this.state.repAmount}
                  onChange={this.handleRepAmountChange}
                />
              }
              <DivButton
                style={{marginLeft: "1rem", marginTop: "1.7rem"}}
                onClick={() => this.setState({showRepAmountInput: !this.state.showRepAmountInput})}
                size="tiny">
                Other Amount?
              </DivButton>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div style={{display: "flex"}}>
              {!this.state.showRepPaceInput &&
                <Form.Field
                  control={Select}
                  options={repPace}
                  label={{ children: 'Rep Pace'}}
                  placeholder='Rep Pace'
                  value={this.state.workout ? this.state.repPace : repPace.value}
                  onChange={this.handleRepPaceChange}
                />
              }
              {this.state.showRepPaceInput &&
                <Form.Field
                  autofocus
                  control={Input}
                  type="number"
                  // pattern="[0-9]*"
                  label='Other'
                  value={this.state.repPace}
                  onChange={this.handleRepPaceChange}
                />
              }
              <DivButton
                style={{marginLeft: "1rem", marginTop: "1.7rem"}}
                onClick={() => this.setState({showRepPaceInput: !this.state.showRepPaceInput})}
                size="tiny">
                  Other Pace?
              </DivButton>
            </div>
          </div>
      </>
    )
  };

  render() { 
    return ( 
      <>
          <p onClick={() => this.setState({showReps: !this.state.showReps,})} style={{textDecoration: "underline", color: "blue", cursor: "pointer"}}>
            {this.props.exercise.name}
          </p>
            {this.state.showReps && 
        <Segment>
        <Form onSubmit={this.handleSubmit}>
              <>
                <Form.Group widths='equal'>
                  {this.generateRepsDropdown()}
                  <Form.Input
                    label="Notes"
                    value={this.state.notes}
                    onChange={(e) => this.setState({notes: e.target.value})}
                  /> 
                  <Form.Input
                    style={{width: "4rem"}}
                    label="Order"
                    type="number"
                    value={this.state.exercise_order}
                    onChange={(e) => this.setState({exercise_order: e.target.value})}
                  />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Button size='tiny'>{this.props.editing ? 'Save Changes' : 'Add To Workout'}</Button>
                  <Button onClick={() => this.setState({showReps: !this.state.showReps})}>Nevermind</Button>
                </div>
              </>
        </Form>
        </Segment>
            }
      </>
     );
  }
}

const DivButton = styled.div `
  height: 2.5rem;
  width: 8.4rem;
  padding: 0.6rem;
  background-color: #cacbcd;
  display: table;
  border-radius: 3px;
  font-weight: 700;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  color: rgba(0,0,0,.6);
  text-align: center;
  /* margin-top: 1.7rem;
  margin-left: 1rem; */
`;
 
export default NewWorkOutForm;