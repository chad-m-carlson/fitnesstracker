import React from 'react';
import axios from 'axios';
import NewWorkoutForm from '../Forms/NewWorkoutForm';
import Datepicker from 'react-datepicker';
import PendingWorkout from './PendingWorkout';
import Search from '../Search';
import {sortExercises} from '../../helpers/HelperFunctions';
import {Form, Button, Container, Checkbox } from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import {ExerciseContainer, } from '../styles/styles';
import {Link, } from 'react-router-dom';

class NewWorkout extends React.Component {
  state = { 
    exercises: [],
    filteredExercises: [],
    exerciseCategories: [],
    categoriesSelected: [],
    reps: {
      amount: [],
      pace: [],
    },
    workout: [],
    date: new Date(),
    hideDatePicker: false,
    searchActive: false,
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

  returnResults = (results, active) => {
    if(active){
      this.setState({filteredExercises: results, searchActive: true})
    }else this.setState({searchActive: false})
    // this.setState({filteredExercises: results})
  };

  renderNewWorkoutForms = () => {
    if(this.state.searchActive === false){ 
    return(
      (this.state.exercises.map( e => 
        <NewWorkoutForm
          key={e.id}
          index={this.state.workout.length}
          date={this.state.date}
          new_exercise={true}
          reps={this.state.reps}
          exercise={e}
          getExerciseFromForm={this.getExerciseFromForm}
          saveWorkout={this.saveWorkout}
        />
      ))
    )}else{
      return(
        (this.state.filteredExercises.map( e =>
          <NewWorkoutForm
            key={e.id}
            index={this.state.workout.length}
            date={this.state.date}
            new_exercise={true}
            reps={this.state.reps}
            exercise={e}
            getExerciseFromForm={this.getExerciseFromForm}
            saveWorkout={this.saveWorkout}
          />
        ))
      )
    }
  };

  // todo THIS HAS A BUG IN IT WHERE IF THE EXERCISE HAS MORE THAN ONE CATEGORY IT DISAPPEARS WHEN ONE OF THE CATEGORIES IS DESELECTED
  handleCategoryChange = (value) => {
    if(this.state.categoriesSelected.includes(value)){
      let newState = this.state.categoriesSelected.filter( c => c !== value)
      this.setState({categoriesSelected: [...newState]})
      this.setState({exercises: sortExercises(this.state.exercises.filter( e => e.exercise_category !== value), "name")})
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
      this.setState({exercises: sortExercises(result, "name")})
    });
    this.setState({searchActive: false})
    this.setState({filteredExercises: []})
  };
  
  handleDateChange = (date) => {
    this.setState({date})
    axios.get(`/api/work_outs/${getSimpleDate(date)}`)
      .then( res => this.setState({ workout: [...res.data]}));
  };

  getExerciseFromForm = (completeExercise, isUpdate) => {
    // todo get initial order of the workout and make it so it goes back to that order after updating
    const workoutIds = this.state.workout.map( w => w.id);
    if(isUpdate){
      if(workoutIds.includes(completeExercise.exercise_id)){
        const filteredState = this.state.workout.filter( wo => wo.id !== completeExercise.exercise_id);
        this.setState({workout: [...filteredState, completeExercise]})
      }
      return
    };
    if(workoutIds.includes(completeExercise.exercise_id)){
      if(window.confirm("This workout already has this exercise added, are you sure you want to add again?")){
      this.setState({workout: [...this.state.workout, completeExercise]})
      console.log('this got added to workout');
    }}else this.setState({workout: [...this.state.workout, completeExercise]});
  };

  saveWorkout = () => {
    axios.post(`/api/work_outs`, this.state.workout)
      // .then( res => alert("Your workout has been saved"))
      .catch(res => {
        console.log(res);
        alert("Something went wrong");
      })
  };

  handleDelete = (id) => {
    let newWorkout = this.state.workout.filter( wo => wo.workoutid !== id)
    this.setState({workout: [...newWorkout]})
    axios.delete(`/api/work_outs/${id}`)
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
                key={c.id}
                toggle
                style={{margin: "1rem"}}
                label={c.text}
                onChange={() => this.handleCategoryChange(c.value)}
              />
            )}
          </CheckboxHolder>
        </Form>
        <div style={{display: "flex", flexDirection: "column", textAlign: '-webkit-center', margin: "0 auto'", paddingTop: "1rem"}}>
          <Search 
            data={this.state.exercises}
            name="Search Exercises"
            returnResults={this.returnResults}
            searchActive={this.state.searchActive}
            width="75%"
          />
          {this.renderNewWorkoutForms()}
          <br />
          <ExerciseContainer>
            <Link to='/newexercise' style={{color: "black"}}>Exercise not shown? Add new exercise</Link>
          </ExerciseContainer>
          <br />
          <PendingWorkout
            date={this.state.date}
            updatedWorkout={this.state.workout}
            reps={this.state.reps}
            getExerciseFromForm={this.getExerciseFromForm}
            handleDelete={this.handleDelete}
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