import React from 'react';
import {Form, Select, Button, Input, Segment, } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import styled from 'styled-components';
import axios from 'axios';
import {ExerciseContainer, } from '../styles/styles';

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
    includeSuperset: false,
   }

  componentDidMount = () => {
    if(this.props.editing){
    this.setState({showReps: true, repAmount: this.props.repAmount, repPace: this.props.repPace, notes: this.props.exercise.notes, exercise_order: this.props.exercise.exercise_order});
    }else if(this.props.new_exercise){
      this.setState({showReps: false, repAmount: this.props.repAmount, repPace: this.props.repPace, notes: this.props.exercise.notes, exercise_order: this.props.index});
    }else{
    axios.get(`/api/work_outs/${encodeURIComponent(getSimpleDate(this.props.date))}/exercises/${this.props.exercise.id}`)
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
    const {exercise, date,} = this.props
    const {repAmount, repPace, notes, exercise_order, includeSuperset} = this.state
    const completeExercise = {exercise_id: exercise.id, date: getSimpleDate(date), name: exercise.name, rep_amount: repAmount, rep_pace: repPace, workout_id: exercise.workoutid, notes: notes, exercise_order: exercise_order, has_superset: includeSuperset}
    this.props.getExerciseFromForm(completeExercise, this.props.editing)
    this.setState({showReps: false});
    if(this.props.editing){
      axios.put(`/api/work_outs/${completeExercise.workout_id}`, completeExercise)
        .then(res => {
          this.props.setEditing(false)
        });
    }else {
      axios.post(`/api/work_outs`, completeExercise)
        .then( res => alert("Exercise has been saved to workout"))
    }
  };



  generateRepsDropdown = () => {
    const repAmount = [];
    const repPace = [];
    this.props.reps.amount.map( r => repAmount.push({text: r.amount, value: r.amount}));
    this.props.reps.pace.map( r => repPace.push({text: r.pace, value: r.pace}));

    return(
      <>
        <DropdownContainer>
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
                // type="number"
                // pattern="[0-9]*"
                label='Other'
                value={this.state.repAmount}
                onChange={this.handleRepAmountChange}
              />
            }
            <DivButton onClick={() => this.setState({showRepAmountInput: !this.state.showRepAmountInput})}>
              Other?
            </DivButton>
          </div>
        </DropdownContainer>
        <DropdownContainer>
          <div style={{display: "flex"}}>
            {!this.state.showRepPaceInput &&
              <Form.Field
                control={Select}
                options={repPace}
                label={{ children: 'Tempo'}}
                placeholder='Tempo'
                value={this.state.workout ? this.state.repPace : repPace.value}
                onChange={this.handleRepPaceChange}
              />
            }
            {this.state.showRepPaceInput &&
              <Form.Field
                autofocus
                control={Input}
                // type="number"
                // pattern="[0-9]*"
                label='Other'
                value={this.state.repPace}
                onChange={this.handleRepPaceChange}
              />
            }
            <DivButton onClick={() => this.setState({showRepPaceInput: !this.state.showRepPaceInput})}>
                Other?
            </DivButton>
          </div>
        </DropdownContainer>
      </>
    )
  };

  render() { 
    return ( 
      <>
        {!this.state.showReps &&
          <ExerciseContainer onClick={() => this.setState({showReps: !this.state.showReps,})}>
            {this.props.exercise.name}
          </ExerciseContainer>
        }
        {this.state.showReps && 
          <Segment style={{marginTop: "1rem"}}>
            <Form onSubmit={this.handleSubmit}>
              <>
              <h3>{this.props.exercise.name}</h3>
                <Form.Group widths='equal'>
                  {this.generateRepsDropdown()}
                  <Form.Input
                    style={{marginTop: "1rem !important"}}
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
                  <Form.Checkbox
                    label="Include Superset?"
                    onChange={(e) => this.setState({includeSuperset: !this.state.includeSuperset})}
                  />
                </Form.Group>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <Button size='tiny' onClick={() => this.setState({showReps: !this.state.showReps})}>Nevermind</Button>
                  <Button size='tiny'>{this.props.editing ? 'Save Changes' : 'Add To Workout'}</Button>
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
  width: 5.2rem;
  padding: 0.6rem;
  background-color: #cacbcd;
  border-radius: 3px;
  font-weight: 700;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  color: rgba(0,0,0,.6);
  text-align: center;
  margin-top: 1.7rem;
  margin-left: 2.4rem;
`;

const DropdownContainer = styled.div `
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

// const ExerciseContainer = styled.div `
//   cursor: pointer;
//   border: 1px solid rgba(34,36,38,.15);
//   border-radius: 3px;
//   padding: .5rem;
//   width: 75%;
//   margin: 0 auto .2rem auto;

//   &:first-child{
//     margin-top: 1rem;
//   }
// `;
 
export default NewWorkOutForm;