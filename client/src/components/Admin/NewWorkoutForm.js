import React, {useState, useEffect} from 'react';
import {Form, Select,  Button,} from 'semantic-ui-react';
import {getSimpleDate, } from '../../helpers/HelperFunctions';
import axios from 'axios';

const NewWorkOutForm = (props) => {
  const [workout, setWorkout] = useState([]);
  const [rep_amount, setRep_amount] = useState('');
  const [rep_pace, setRep_pace] = useState('');
  const [showReps, setShowReps] = useState(false);

  useEffect( () => {
    axios.get(`/api/work_outs/${getSimpleDate(props.date)}/exercises/${props.exercise.id}`)
    .then(res => {
      setWorkout([...res.data]);
      res.data.map( w => {
        if (props.exercise.id === w.exercise_id){
          setShowReps(true)
          setRep_amount(w.rep_amount)
          setRep_pace(w.rep_pace);
        }})})

  },[])
  
  const handleRepAmountChange = (e, {value}) => {
    setRep_amount(value);
  };

  const handleRepPaceChange = (e, {value}) => {
    setRep_pace(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeExercise = {id: props.exercise.id, date: getSimpleDate(props.date), name: props.exercise.name, rep_amount: rep_amount, rep_pace: rep_pace}
    props.getExerciseFromForm(completeExercise)
    // setState({showReps: false});
    setShowReps(false);
  };



  const generateRepsDropdown = () => {
    const rep_amount = [];
    const rep_pace = [];
    props.reps.amount.map( r => rep_amount.push({text: r.amount, value: r.amount}));
    props.reps.pace.map( r => rep_pace.push({text: r.pace, value: r.pace}));

    return(
      <>
        <Form.Field
          multiple
          control={Select}
          options={rep_amount}
          label={{ children: 'Rep Amount'}}
          placeholder='Rep Amount'
          value={workout ? rep_amount : rep_amount.value}
          onChange={handleRepAmountChange}
        />
        <Form.Field
          multiple
          control={Select}
          options={rep_pace}
          label={{ children: 'Rep Pace'}}
          placeholder='Rep Pace'
          value={workout ? rep_pace : rep_pace.value}
          onChange={handleRepPaceChange}
        />
    </>
    )
  };

    return ( 
      <>
        <Form onSubmit={handleSubmit}>
          <li onClick={() => setShowReps(!showReps)}>
            {props.exercise.name}
              </li>
                {showReps && 
                <>
              <div>
                  {generateRepsDropdown()}
              </div>
              <Button size='tiny'>Add To Workout</Button>
              </>
                  }
          <br />
        </Form>
        </>
     );
}
 
export default NewWorkOutForm;