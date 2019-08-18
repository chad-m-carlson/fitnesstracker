import React from 'react';
import axios from 'axios';
import NewWorkoutForm from './NewWorkoutForm';
import Datepicker from 'react-datepicker';
import PendingWorkout from '../PendingWorkout';
import {Form, Select, Button } from 'semantic-ui-react';
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
   }


  componentDidMount() {
    axios.all([this.getRepAmounts(), this.getRepPaces(),])
    .then(axios.spread( (amounts, paces, workout) => {
      this.setState({reps: {amount: [...amounts.data], pace: [...paces.data]}, })
    }))
    .catch( res => console.log(res));
  };

  getRepAmounts = () => {
    return axios.get(`/api/rep_amounts`)
  };

  getRepPaces = () => {
    return axios.get(`/api/rep_paces`)
  };


  // getWorkout = () => {
  //   let month = this.state.date.getUTCMonth() + 1;
  //   let day = this.state.date.getUTCDate();
  //   let year = this.state.date.getUTCFullYear();
  //   let simpleDate = `${month}${day}${year}`
  //   return axios.get(`/api/work_outs/${simpleDate}`)
  // };

  handleCategoryChange = (e, {value}) => {
    axios.get(`/api/exercises/${value}`)
      .then( res => {
        this.setState({exercises: [...res.data]})
    })
  };

  handleDateChange = (date) => {
    this.setState({date})
  };

  getExerciseFromForm = (completeExercise) => {
    this.setState({workout: [...this.state.workout, completeExercise]});
  };

  saveWorkout = () => {
    const {workout} = this.state
    console.log(workout)
    axios.post(`/api/work_outs`, workout)
      .then( res => this.setState({workout: []}))
  };

  render() { 
    return ( 
      <>
      FIGURE OUT HOW TO DEAL WITH EDITING EXISTING WORK OUT WITH PENDING WORKOUT COMPONENT OR ADDING A NEW WORK OUT OR JUST HAVING TO HAVE A SEPERATE COMPONENT TO DEAL WITH EXISTING WORKOUTS. EVERYTHING IS KIND OF A MESS RIGHT NOW, BUT PENDING WORKOUT DOES DISPLAY THE WORKOUT FROM THE DB FOR THE DAY SELECTED
      <h1>Create a new workout</h1>
        <Form>
        <Datepicker 
          placeholderText='Click to select a date'
          selected={this.state.date}
          onChange={this.handleDateChange}
        />
          <Form.Field
            control={Select}
            options={categoryOptions}
            label={{ children: 'Exercise Type'}}
            placeholder='Exercise Type'
            value={categoryOptions.value}
            onChange={this.handleCategoryChange}
          />
        </Form>
        {this.state.exercises.map( e => 
          <ul key={e.id}>
            <NewWorkoutForm
              date={this.state.date}
              workout={this.state.workout}
              reps={this.state.reps}
              exercise={e}
              getExerciseFromForm={this.getExerciseFromForm}
            />
          </ul>
          )}
        <br />
        <h3>Pending Workout</h3>
        <PendingWorkout
          date={this.state.date}
          saveWorkout={this.saveWorkout}
          getWorkoutFromPending={this.getWorkoutFromPending}
        />
        {/* {this.state.workout.length > 0 &&
        <Button onClick={this.saveWorkout}>
          Save Workout
        </Button>
        } */}
      </>
     );
  }
}
 
export default NewWorkout;