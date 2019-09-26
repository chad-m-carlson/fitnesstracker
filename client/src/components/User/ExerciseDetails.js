import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ExerciseDetails = (props) => {
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [maxWeight, setMaxWeight] = useState({})

  useEffect( () => {
    const {id, rep_pace} = props.location.state.wo
    axios.get(`/api/user_logs_history/${id}`, {params: {rep_pace: rep_pace}})
      .then(res => setExerciseHistory(res.data))
      .catch(res => console.log(res))
    axios.get(`/api/user_logs_max/${id}`)
      .then(res => setMaxWeight(res.data[0]))
      .catch(res => console.log(res))
  },[props.location.state.wo]);

  return ( 
    <>
    <h1>{props.location.state.wo.name} Details</h1>
    <div style={{border: "1px solid black"}}>
      <h3>Last 2 at current tempo</h3>
      {exerciseHistory.map( h => (
        <ul key={h.id}>
          <li>{h.date}</li>
          <li><b>Weight:</b> {h.weight}</li>
          <li><b>Reps:</b> {h.reps}</li>
          <li><b>Tempo:</b> {h.rep_pace}</li>
          <li><b>Notes:</b> {h.notes}</li>
        </ul>
      ))}
    </div>
    <div style={{border: "1px solid black"}}>
      <h3>Max Weight</h3>
        <ul>
          <li>{maxWeight.date}</li>
          <li><b>Weight:</b> {maxWeight.weight}</li>
          <li><b>Reps:</b> {maxWeight.reps}</li>
          <li><b>Tempo:</b> {maxWeight.rep_pace}</li>
          <li><b>Notes:</b> {maxWeight.notes}</li>
        </ul>
    </div>
    </>
   );
}
 
export default ExerciseDetails;