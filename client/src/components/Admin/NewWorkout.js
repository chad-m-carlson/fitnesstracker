import React from 'react';
import axios from 'axios';
import NewWorkoutForm from './NewWorkoutForm';
import Datepicker from 'react-datepicker';
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
    axios.all([this.getRepAmounts(), this.getRepPaces()])
    .then(axios.spread( (amounts, paces) => {
      this.setState({reps: {amount: [...amounts.data], pace: [...paces.data]}})
    }))
    .catch( res => console.log(res));
  };

  getRepAmounts = () => {
    return axios.get(`/rep_amounts`)
  };

  getRepPaces = () => {
    return axios.get(`/rep_paces`)
  };

  handleCategoryChange = (e, {value}) => {
    axios.get(`/exercises/${value}`)
      .then( res => {
        this.setState({exercises: [...res.data]})
    })
  };

  handleDateChange = (date) => {
    this.setState({date})
  }

  getExerciseFromForm = (completeExercise) => {
    this.setState({workout: [...this.state.workout, completeExercise]});
  };

  saveWorkout = () => {
    const {workout} = this.state
    console.log(workout)
    axios.post(`/work_outs`, workout)
  };

  render() { 
    return ( 
      <>
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
        <div>
          <h3>Pending Workout</h3>
          <ol>
            {this.state.workout.map( w =>
              <>
              <li key={w.exerciseId}>{w.exerciseName}</li>
              <ul>
                <li>Reps: {w.repAmount}</li>
                <li>Pace: {w.repPace}</li>
              </ul>
              </>
            )}
          </ol>
          {this.state.workout.length > 0 &&
          <button onClick={this.saveWorkout}>
            Save Workout
          </button>
          }
        </div>
      </>
     );
  }
}
 
export default NewWorkout;