import React from 'react';
import axios from 'axios';
import NewWorkoutForm from '../Forms/NewWorkoutForm';
import Datepicker from 'react-datepicker';
import PendingWorkout from './PendingWorkout';
import {Form, Button, Container, Dropdown } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import "react-datepicker/dist/react-datepicker.css";

const categoryOptions = [
  {text: null, value: null},
  {text: 'Arms', value: 'arms'},
  {text: 'Back', value: 'back'},
  {text: 'Cardio', value: 'cardio'}, 
  {text: 'Chest', value: 'chest'},
  {text: 'Core', value: 'core'}, 
  {text: 'Legs', value: 'legs'},
  {text: 'Shoulders', value: 'shoulders'},
  {text: 'Super Set', value: 'superset'},
  ];

class NewWorkout extends React.Component {
  state = { 
    exercises: [],
    reps: {
      amount: [],
      pace: [],
    },
    workout: [],
    date: new Date(),
    hideDatePicker: false,
   }


  componentDidMount() {
    axios.all([this.getRepAmounts(), this.getRepPaces(), this.getWorkout(this.state.date)])
    .then(axios.spread( (amounts, paces, workout) => {
      this.setState({reps: {amount: [...amounts.data], pace: [...paces.data]}, workout: [...workout.data]})
    }))
    .catch( res => console.log(res));
  };
  
  getRepAmounts = () => {
    return axios.get(`/api/rep_amounts`)
  };

  getRepPaces = () => {
    return axios.get(`/api/rep_paces`)
  };

  getWorkout = (date) => {
    return axios.get(`/api/work_outs/${getSimpleDate(date)}`)
  };

  
  handleCategoryChange = (e, {value}) => {
    axios.get(`/api/exercises_by_category/${value[value.length - 1]}`)
      .then( res => {
        this.setState({exercises: [...this.state.exercises, ...res.data]});
    });
  };
  
  handleDateChange = (date) => {
    this.setState({date})
    axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then( res => this.setState({ workout: [...res.data]}));
  };

  getExerciseFromForm = (completeExercise, isUpdate) => {
    const workoutIds = this.state.workout.map( w => w.id);
    if(isUpdate){
      if(workoutIds.includes(completeExercise.id)){
        const filteredState = this.state.workout.filter( wo => wo.id !== completeExercise.id);
        this.setState({workout: [...filteredState, completeExercise]})
      } if(completeExercise.workout_id !== undefined) {
          axios.put(`/api/work_outs/${completeExercise.workout_id}`, completeExercise);
            // .then(res => {
            //   this.setState({workout: [...this.state.workout, res.data]})})
            };
      return
    };
    if(workoutIds.includes(completeExercise.id)){
      if(window.confirm("This workout already has this exercise added, are you sure you want to add again?")){
      this.setState({workout: [...this.state.workout, completeExercise]})
      console.log('this got added to workout');
    }}else this.setState({workout: [...this.state.workout, completeExercise]});
  };

  render() { 
    return ( 
      <Container style={{marginBottom: "1rem"}}>
      <h1>Create a new workout</h1>
        <Form>
          {!this.state.hideDatePicker &&
          <div style={{display: "flex", justifyContent: "space-around", padding: "1rem"}}>
            <Datepicker 
              inline
              selected={this.state.date}
              onChange={this.handleDateChange}
              />
          </div>
          }
          <div style={{display: "flex", justifyContent: "space-around", paddingBottom: "1rem"}}>
            <Button 
              onClick={() => this.setState({hideDatePicker: !this.state.hideDatePicker})}>
              {this.state.hideDatePicker ? "Show Calendar" : "Hide Calendar"}
            </Button>
          </div>
          <Dropdown
            multiple
            fluid
            selection
            options={categoryOptions}
            label={{ children: 'Exercise Type'}}
            placeholder='Exercise Type'
            onChange={this.handleCategoryChange}
          />
        </Form>
        <div style={{display: "flex", flexDirection: "column", textAlign: '-webkit-center', margin: "0 auto'", paddingTop: "1rem"}}>
          {this.state.exercises.map( e => 
            <NewWorkoutForm
              key={e.id}
              index={this.state.workout.length}
              date={this.state.date}
              new_exercise={true}
              reps={this.state.reps}
              exercise={e}
              getExerciseFromForm={this.getExerciseFromForm}
            />
            )}
        <PendingWorkout
          date={this.state.date}
          updatedWorkout={this.state.workout}
          reps={this.state.reps}
          getExerciseFromForm={this.getExerciseFromForm}
        />
        </div>
      </Container>
     );
  }
}
 
export default NewWorkout;