import React, { useEffect, useState } from "react";
import axios from "axios";

const SimilarExerciseDisplay = ({ exerciseIds }, props) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`api/user_logs_by_exercise`, { params: { ids: exerciseIds } })
      // !spread exercises if i can figure out how to filter the array when one is deselected in the select drop down
      // .then(res => setExercises([[...res.data], ...exercises]))
      .then(res => setExercises([...res.data]));
  }, [exerciseIds]);

  return (
    <>
      <div>
        <ul>
          {exercises.map(e => (
            <>
              <li>{e.name}</li>
              <li>{e.date}</li>
              <li>Weight: {e.weight}</li>
              <li>Reps: {e.reps}</li>
              <li>Tempo: {e.rep_pace}</li>
              <br />
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SimilarExerciseDisplay;
