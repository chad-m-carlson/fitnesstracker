import React from 'react';
import axios from 'axios';
import NewWorkoutForm from './NewWorkoutForm';
import {Form, Select, Button } from 'semantic-ui-react';

const categoryOptions = [
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
    reps: [],
    workout: [],
   }


  componentDidMount() {
  axios.get(`/reps`)
    .then( res => this.setState({reps: [...res.data]}))
    .catch( res => console.log(res))  
  };

  handleCategoryChange = (e, {value}) => {
    axios.get(`/exercises/${value}`)
      .then( res => {
        this.setState({exercises: [...res.data]})
    })
  };

  getRepsFromForm = (completeExercise) => {
    this.setState({workout: [...this.state.workout, completeExercise]});
  };

  render() { 
    return ( 
      <>
      <h1>Create a new workout</h1>
        <Form>
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
            <ul>
              <NewWorkoutForm
                reps={this.state.reps}
                exercise={e}
                getRepsFromForm={this.getRepsFromForm}
                />
            </ul>
            )}
      </>
     );
  }
}
 
export default NewWorkout;