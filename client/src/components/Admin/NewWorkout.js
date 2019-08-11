import React from 'react';

class NewWorkout extends React.Component {
  state = { 
    exercises: [],
    reps: [],
    workout: [],
   }
  render() { 
    return ( 
      <h1>Create a new workout</h1>
     );
  }
}
 
export default NewWorkout;