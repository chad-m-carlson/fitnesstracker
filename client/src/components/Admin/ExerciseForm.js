import React, {useState, useEffect} from 'react';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';
import axios from 'axios';

const ExerciseForm = ({exercise, setShowExerciseForm, showExerciseForm}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [video_url, setVideo_url] = useState('');
  const [core, setCore] = useState(false);
  const [legs, setLegs] = useState(false);
  const [chest, setChest] = useState(false);
  const [back, setBack] = useState(false);
  const [arms, setArms] = useState(false);
  const [shoulders, setShoulders] = useState(false);
  const [cardio, setCardio] = useState(false);
  const [superset, setSuperset] = useState(false);
  const [editing, setEditing] = useState(false);


  useEffect( () => {
    if (exercise) {
      setEditing(true)
      setName(exercise.name)
      setDescription(exercise.description)
      setVideo_url(exercise.video_url)
      setCore(exercise.core)
      setLegs(exercise.legs)
      setChest(exercise.chest)
      setBack(exercise.back)
      setArms(exercise.arms)
      setShoulders(exercise.shoulders)
      setCardio(exercise.cardio)
      setSuperset(exercise.superset)
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exerciseToSave = {name, description, video_url, core, legs, chest, back, arms, shoulders,cardio, superset};
    if (!editing){
    axios.post(`/api/exercises`, exerciseToSave)
      .then(res => {
        setShowExerciseForm(!showExerciseForm)
        if (res.data === ''){
          alert('Something Went Wrong')
        }else alert('Exercise Successfully Saved')})
      .catch(res => console.log(res));
    } else {

      axios.post(`/api/exercises/${exercise.id}`, exerciseToSave)
        .then(res => {
          setShowExerciseForm(!showExerciseForm)})
    }
  };

  return ( 
    <Segment basic>
      <Header as='h1' textAlign='center'>{editing ? `Edit ${exercise.name}` : 'Add Exercise' }</Header>
      <Form onSubmit={handleSubmit}>
          <Form.Input 
            fluid
            autofocus
            label='Name'
            placeholder='Exercise Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input 
            fluid
            autofocus
            label='Video Link'
            placeholder='Video Link'
            name='video_url'
            value={video_url}
            onChange={(e) => setVideo_url(e.target.value)}
          />
          <Form.TextArea
            fluid
            autofocus
            label='Description'
            placeholder='Exercise Description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        <Form.Group fluid>
          <Form.Checkbox
            defaultChecked={exercise ? exercise.core : ''}
            style={{paddingRight: '2.1em'}} 
            label='Core'
            value={core}
            onChange={(e) => setCore(!core)}
          />
          <Form.Checkbox
            defaultChecked={exercise ? exercise.legs : ''}
            style={{paddingRight: '2.1em'}} 
            label='Legs'
            value={legs}
            onChange={(e) => setLegs(!legs)}
          />
          <Form.Checkbox
            defaultChecked={exercise ? exercise.chest : ''}
            style={{paddingRight: '2.1em'}} 
            label='Chest'
            value={chest}
            onChange={(e) => setChest(!chest)}
          />
        </Form.Group>
        <Form.Group fluid>
          <Form.Checkbox
            defaultChecked={exercise ? exercise.back : ''}
            style={{paddingRight: '2.1em'}}  
            label='Back'
            value={back}
            onChange={(e) => setBack(!back)}
          />
          <Form.Checkbox
            defaultChecked={exercise ? exercise.arms : ''}
            style={{paddingRight: '2.1em'}}  
            label='Arms'
            value={arms}
            onChange={(e) => setArms(!arms)}
          />
          <Form.Checkbox
            defaultChecked={exercise ? exercise.shoulders : ''}
            style={{paddingRight: '2.1em'}}  
            label='Shoulders'
            value={shoulders}
            onChange={(e) => setShoulders(!shoulders)}
          />
        </Form.Group>
        <Form.Group fluid>
          <Form.Checkbox
            defaultChecked={exercise ? exercise.cardio : ''}
            style={{paddingRight: '2.1em'}}  
            label='Cardio'
            value={cardio}
            onChange={(e) => setCardio(!cardio)}
          />
          <Form.Checkbox
            defaultChecked={exercise ? exercise.superset : ''}
            style={{paddingRight: '2.1em'}}  
            label='Superset'
            value={superset}
            onChange={(e) => setSuperset(!superset)}
          />
        </Form.Group>
        <br />
        <Button>{editing ? 'Save Changes' : 'Submit'}</Button>
      </Form>

    </Segment>
   );
}
 
export default ExerciseForm;