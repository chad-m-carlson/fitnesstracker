import React, {useState, useEffect} from 'react';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';
import axios from 'axios';

const ExerciseForm = ({exercise, setShowExerciseForm, showExerciseForm, setExerciseChanged, exerciseChanged,history}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [video_url, setVideo_url] = useState('');
  const [editing, setEditing] = useState(false);
  const [exerciseCategories, setExerciseCategories] = useState([]);
  const [selectedExerciseCategories, setSelectedExerciseCategories] = useState([])


  useEffect( () => {
    axios.get(`/api/exercise_categories`)
      .then(res => setExerciseCategories(res.data))
      .catch(res => console.log(res.errors));
    if (exercise) {
      setEditing(true)
      axios.get(`/api/exercise_categories_exercises/${exercise.id}`)
        .then(res => setSelectedExerciseCategories([...res.data.map( d => d.id)]))

      setName(exercise.name)
      setDescription(exercise.description)
      setVideo_url(exercise.video_url)
    }
  },[exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editing){
      const exerciseToSave = {name, description, video_url, selectedExerciseCategories}
      axios.post(`/api/exercises`, exerciseToSave)
      .then(res => {
        setShowExerciseForm(!showExerciseForm)
        if (res.data === ''){
          alert('Something Went Wrong')
          history.push('/newworkout')
        }else {
          // alert('Exercise Successfully Saved')
          setExerciseChanged(!exerciseChanged)
        }})
        .catch(res => {
          console.log(res)
        });
      } else {
        const exerciseToSave = {id: exercise.id, name, description, video_url, selectedExerciseCategories}
        axios.put(`/api/exercises/${exercise.id}`, exerciseToSave)
        .then(res => {
          setShowExerciseForm(!showExerciseForm)
          setExerciseChanged(!exerciseChanged)
          // alert('Exercise Successfully Updated')
        })
      }
      if(history) {
        const {push} = history
        push('/newworkout');
      }
  };

  const handleCheckbox = (id) => {
    if(selectedExerciseCategories.includes(id)){
      const filteredExerciseCategories = selectedExerciseCategories.filter( e => e !== id)
      setSelectedExerciseCategories(filteredExerciseCategories)
    }else setSelectedExerciseCategories([...selectedExerciseCategories, id]);
  };

  return ( 
    <Segment basic>
      <Header as='h1' textAlign='center'>{editing ? `Edit ${exercise.name}` : 'Add Exercise' }</Header>
      <Form onSubmit={handleSubmit}>
          <Form.Input 
            fluid
            autoFocus
            label='Name'
            placeholder='Exercise Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input 
            fluid
            label='Video Link'
            placeholder='Video Link'
            name='video_url'
            value={video_url}
            onChange={(e) => setVideo_url(e.target.value)}
          />
          <Form.TextArea
            label='Description'
            placeholder='Exercise Description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        <div style={{display: "flex", flexFlow: "wrap"}}>
        {exerciseCategories.map( c => 
          <Form.Checkbox
          key={c.id}
          checked={selectedExerciseCategories.includes(c.id)}
            style={{paddingRight: '2.1em'}} 
            label={c.category_name}
            value={c.id}
            onChange={(e) => handleCheckbox(c.id)}
            />
            )}
        </div>
        <br />
        <Button>{editing ? 'Save Changes' : 'Submit'}</Button>
        {history &&
          <Button onClick={history.push('/newworkout')}> Go Back </Button> 
        }
      </Form>

    </Segment>
   );
}
 
export default ExerciseForm;