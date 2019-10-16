import React, {useState, } from 'react';
import SimilarExerciseDisplay from '../SimilarExerciseDisplay';
import {Form, Button,} from 'semantic-ui-react';
import axios from 'axios';
import {Link, } from 'react-router-dom';

const SimilarExerciseSearch = (props) => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const [similarExerciseList, setSimilarExerciseList] = useState([]);
  const [similarExerciseSelection, setSimilarExerciseSelection] = useState([]);

  const handleKeywordSearch = () => {
    axios.get(`/api/exercise_search/${keywordSearch}`)
      .then(res=> {
        const list = [];
        res.data.map( d => list.push({text: d.name, value: d.id, key: d.id}))
        setSimilarExerciseList(list)
      })
      .catch(res => console.log(res))
  };

  const handleSimilarExerciseSelection = (e, {value}) => {
    setSimilarExerciseSelection(value)
    // !spread the value if using multiple selections
    // setSimilarExerciseSelection([...value])
  };

  return ( 
    <div style={{margin: "1rem"}}>
    <Form 
      size="mini" 
      onSubmit={handleKeywordSearch}
      style={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
      <Form.Input
        label="Keyword"
        onChange={(e) => setKeywordSearch(e.target.value)}
      />
      <Button>Search</Button>
    </Form>
    <br />
    <Form size='mini'>
      <Form.Select
        fluid
        // multiple
        options={similarExerciseList}
        label={{children: "Similar Exercises"}}
        onChange={handleSimilarExerciseSelection}
      />
    </Form>
    <br />
    <SimilarExerciseDisplay
      exerciseIds={similarExerciseSelection}
    />
    <Link onClick={props.history.goBack}>Go Back</Link>
    </div>
   );
}
 
export default SimilarExerciseSearch;