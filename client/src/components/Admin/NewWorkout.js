import React from 'react';
import axios from 'axios';
import NewWorkoutForm from '../Forms/NewWorkoutForm';
import Datepicker from 'react-datepicker';
import PendingWorkout from './PendingWorkout';
import {Form, Button, Container, Checkbox } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

class NewWorkout extends React.Component {
  state = { 
    exercises: [],
    exerciseCategories: [],
    categoriesSelected: [],
    reps: {
      amount: [],
      pace: [],
    },
    workout: [],
    date: new Date(),
    hideDatePicker: false,
   }


  componentDidMount() {
    axios.all([this.getRepAmounts(), this.getRepPaces(), this.getWorkout(this.state.date), this.getExerciseCategories()])
    .then(axios.spread( (amounts, paces, workout, exerciseCategories) => {
      const dropdownValues = [...exerciseCategories.data.map( c => ({key: c.id, text: c.category_name, value: c.id}))]
      this.setState({reps: {amount: [...amounts.data], pace: [...paces.data]}, workout: [...workout.data], exerciseCategories: [...dropdownValues]})
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

  getExerciseCategories = () => {
    return axios.get(`/api/exercise_categories`)
  }

  sortExercisesByName = (exerciseArray) => {
    let x = exerciseArray.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return x
  }

  // todo THIS HAS A BUG IN IT WHERE IF THE EXERCISE HAS MORE THAN ONE CATEGORY IT DISAPPEARS WHEN ONE OF THE CATEGORIES IS DESELECTED
  handleCategoryChange = (value) => {
    if(this.state.categoriesSelected.includes(value)){
      let newState = this.state.categoriesSelected.filter( c => c !== value)
      this.setState({categoriesSelected: [...newState]})
      this.setState({exercises: this.sortExercisesByName(this.state.exercises.filter( e => e.exercise_category !== value))})
      return
    }
    this.setState({categoriesSelected: [...this.state.categoriesSelected, value]})
    axios.get(`/api/exercise_categories/${value}`)
      .then( res => {
        // *this gets rid of duplicates
        const arr = [...this.state.exercises, ...res.data]
        const result = [];
        const map = new Map();
        for (const item of arr) {
          if(!map.has(item.id)){
            map.set(item.id, true);
            result.push({
              id: item.id,
              name: item.name,
              exercise_category: item.exercise_category
            });
          }
        }
      this.setState({exercises: this.sortExercisesByName(result)})
    });
  }
  
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
          <CheckboxHolder>
            {this.state.exerciseCategories.map( c => 
              <Checkbox
                toggle
                style={{margin: "1rem"}}
                label={c.text}
                onChange={() => this.handleCategoryChange(c.value)}
              />
            )}
          </CheckboxHolder>
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

const CheckboxHolder = styled.div `
  display: flex;
  flex-flow: wrap;
  margin-left: 3rem;
`;
 
export default NewWorkout;