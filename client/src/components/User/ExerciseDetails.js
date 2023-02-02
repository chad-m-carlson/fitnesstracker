import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
const ExerciseDetails = (props) => {
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [maxWeight, setMaxWeight] = useState({});

  useEffect(() => {
    const { id, rep_pace, rep_amount, date } = props.location.state.wo;
    axios
      .get(`/api/user_logs_history/${id}`, {
        params: { rep_pace: rep_pace, rep_amount: rep_amount, date: date },
      })
      .then((res) => setExerciseHistory(res.data.reverse()))
      .catch((res) => console.log(res));
    axios
      .get(`/api/user_logs_max/${id}`)
      .then((res) => setMaxWeight(res.data[0]))
      .catch((res) => console.log(res));
    window.scrollTo(0, 0);
  }, [props.location.state.wo]);

  return (
    <div style={{ margin: "1rem" }}>
      {maxWeight ? (
        <>
          <h1>
            {props.location.state.wo.name} Details
            {exerciseHistory.length > 0 &&
              exerciseHistory[0].video_url != "" && (
                <a
                  href={
                    exerciseHistory.length > 0
                      ? exerciseHistory[0].video_url
                      : ""
                  }
                  style={{ color: "black" }}
                  target="_blank"
                >
                  <Icon name="file video" />
                </a>
              )}
          </h1>

          <div style={{ border: "1px solid black" }}>
            <h3>Last 2 at current tempo</h3>
            {exerciseHistory.map((h) => (
              <ul key={h.id}>
                <li>{h.date}</li>
                <li>
                  <b>Weight:</b> {h.weight}
                </li>
                <li>
                  <b>Reps:</b> {h.reps}
                </li>
                <li>
                  <b>Tempo:</b> {h.rep_pace}
                </li>
                <li>
                  <b>Target Reps:</b> {h.rep_amount}
                </li>
                <li>
                  <b>Exercise Notes:</b> {h.workout_notes}
                </li>
                <li>
                  <b>Personal Notes:</b> {h.notes}
                </li>
              </ul>
            ))}
          </div>
          <div style={{ border: "1px solid black" }}>
            <h3>Max Weight</h3>
            <ul>
              <li>{maxWeight.date}</li>
              <li>
                <b>Weight:</b> {maxWeight.weight}
              </li>
              <li>
                <b>Reps:</b> {maxWeight.reps}
              </li>
              <li>
                <b>Tempo:</b> {maxWeight.rep_pace}
              </li>
              <li>
                <b>Target Reps:</b> {maxWeight.rep_amount}
              </li>
              <li>
                <b>Exercise Notes:</b> {maxWeight.workout_notes}
              </li>
              <li>
                <b>Personal Notes:</b> {maxWeight.notes}
              </li>
              <li>
                <b>60/70/80/90%:</b> {maxWeight.sixety_max}/
                {maxWeight.seventy_max}/{maxWeight.eighty_max}/
                {maxWeight.ninety_max}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div>Looks like you haven't logged this exercise yet</div>
      )}
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Back</Link>
        <Link to="/exercise_search">Find similar exercises</Link>
      </div>
      {/* </div> */}
    </div>
  );
};
export default ExerciseDetails;
