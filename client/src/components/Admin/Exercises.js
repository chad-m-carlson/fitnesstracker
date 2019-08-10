import React from 'react';


const Exercises = (props) => {

  return ( 
    <ul>
      {props.exercises.map( e => 
        <li>{e.name}</li>
      )}
    </ul>
  );
}
 
export default Exercises;