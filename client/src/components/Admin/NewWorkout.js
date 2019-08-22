import React from 'react';
import axios from 'axios';
import NewWorkoutForm from './NewWorkoutForm';
import Datepicker from 'react-datepicker';
import PendingWorkout from './PendingWorkout';
import {Form, Select, Button } from 'semantic-ui-react';
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
  //   return axios.get(`/api/work_outs/${getSimpleDate(this.state.date)}`)
  // };
  
  handleCategoryChange = (e, {value}) => {
    axios.get(`/api/exercises_by_category/${value}`)
      .then( res => {
        this.setState({exercises: [...res.data]})
    })
  };
  
  handleDateChange = (date) => {
    this.setState({date})
  };

  getExerciseFromForm = (completeExercise) => {
    // THIS DETERMINES IF THE EXERCISE EXISTS IN THE WORKOUT ALREADY
    if(this.state.workout.map( w => w.id.includes(completeExercise.id))) console.log(true)
    // NOW JUST NEED TO FIGURE OUT HOW TO DEAL WITH THAT
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
      PENDING WORKOUT AND TODAYS WORKOUT ARE NOW SEPERATE COMPONENTS. THE NEWWORKOUTFORM AUTO POPULATES IF THE EXERCISE IS ALREADY IN THE PENDING WORKOUT. CAN ADD NEW EXERCISES TO PENDING WORKOUT, NOT SAVING TO START, AND WILL ALLOW DUPLICATES.
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
        <ul>
          {this.state.exercises.map( e => 
            <NewWorkoutForm
              key={e.id}
              date={this.state.date}
              // workout={this.state.workout}
              reps={this.state.reps}
              exercise={e}
              getExerciseFromForm={this.getExerciseFromForm}
            />
            )}
        </ul>
        <br />
        <h3>Pending Workout</h3>
          <PendingWorkout
          date={this.state.date}
          updatedWorkout={this.state.workout}
          saveWorkout={this.saveWorkout}
          // getWorkoutFromPending={this.getWorkoutFromPending}
          />
      </>
     );
  }
}
 
export default NewWorkout;