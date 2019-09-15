import React, {useState, useEffect} from 'react';
import {Input, } from 'semantic-ui-react';

const Search = ({data, name, returnResults, searchActive, width}) => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');

  useEffect( () => {
    setActive(searchActive)
  },[searchActive])
  
  const handleChange = (e) => {
    setQuery(e.target.value)
    const filteredData = data.filter( d => {
      return d.name.toLowerCase().indexOf(e.target.value) !== -1;
    });
    if(e.target.value.length !== 0)returnResults(filteredData, true)
    else returnResults(filteredData, false);
  };


  return ( 
    <div style={{marginBottom: "1rem"}}>
      <Input
        value={active ? query : ''}
        placeholder={name}
        onChange={(e) => handleChange(e)}
        style={{width: `${width}`}}
      />
    </div>
   );
}
 
export default Search;

// ? This search component is reusable, it will need a return results function to supply filtered results to the parent component. 

// ? it will take in DATA to filter, NAME to set the placeholder, RETURNRESULTS to send filtered data back to parent, SEARCHACTIVE boolean to reset input value and WIDTH to set input width.

// ? in parent component: have a state value for filtered data and a boolean to setsearch active. the return results take in the filtered data, and the active boolean.


// const returnResults = (results, active) => {
//   if(active){
//     setFilteredExercises(results)
//     setSearchActive(true)
//   }else setSearchActive(false)
// };
// ? you will need to have two different maps depending on if search is active or not, if search is active, map through the filtered data. If search is not active, map through the original array
// const renderExerciseList = () => {
//   if(searchActive === true){
//     return(
//       filteredExercises.map( e => 
//         <li key={e.id}>
//           <Exercise
//             exercise={e}
//             exerciseChanged={exerciseChanged}
//             setExerciseChanged={setExerciseChanged}
//           />
//         </li>
//       )
//     )
//   }else return(
//     exercises.map( e => 
//       <li key={e.id}>
//         <Exercise
//           exercise={e}
//           exerciseChanged={exerciseChanged}
//           setExerciseChanged={setExerciseChanged}
//         />
//       </li>
//     )
//   )
// };
