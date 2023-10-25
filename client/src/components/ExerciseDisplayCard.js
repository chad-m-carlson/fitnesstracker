import React, { useEffect, useState } from "react";
import NewWorkoutForm from "./Forms/NewWorkoutForm";
import UserLog from "./User/UserLog";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExerciseDisplayCard = ({
  wo,
  admin,
  handleDelete,
  date,
  reps,
  getExerciseFromForm,
  index,
}) => {
  const [editing, setEditing] = useState(false);
  const [lastWorkoutStat, setLastWorkStats] = useState({});

  useEffect(() => {
    const { id, rep_pace, rep_amount, date } = wo;
    axios
      .get(`/api/last_exercise_stat/${id}`, {
        params: { rep_pace: rep_pace, rep_amount: rep_amount, date: date },
      })
      .then((res) => setLastWorkStats(res.data[0]))
      .catch((res) => console.log(res));
  }, [wo]);

  return (
    <>
      <Card style={{ backgroundColor: "rgb(230, 16, 16, 0.02)" }}>
        <Card.Content>
          <Card.Header style={{ textAlign: "center" }}>{wo.name}</Card.Header>
          <Card.Header style={{ textAlign: "center" }}></Card.Header>
          <Link
            to={{ pathname: "/exercisedetails", state: { wo: wo } }}
            style={{ marginBottom: "1rem" }}
          >
            Stats
          </Link>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Card.Meta>Reps</Card.Meta>
            <Card.Description>{wo.rep_amount}</Card.Description>
            <Card.Meta>Tempo</Card.Meta>
            <Card.Description>{wo.rep_pace}</Card.Description>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingTop: "10px",
            }}
          >
            {lastWorkoutStat && (
              <>
                <Card.Meta>Last time: </Card.Meta>
                <Card.Description>
                  {lastWorkoutStat.weight && <>{lastWorkoutStat.weight} for </>}
                  {lastWorkoutStat.reps} reps on {lastWorkoutStat.date}
                </Card.Description>
              </>
            )}
          </div>
          {wo.notes != "" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card.Description style={{ fontStyle: "italic" }}>
                  {wo.notes}
                </Card.Description>
              </div>
            </>
          )}
          <br />
          {!admin && (
            <UserLog
              exerciseId={wo.id}
              workoutDate={wo.date}
              workoutId={wo.workoutid}
            />
          )}
          {admin && (
            <>
              <Button
                color="blue"
                inverted
                onClick={() => setEditing(!editing)}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(wo.workoutid)}
                inverted
                color="red"
              >
                Delete
              </Button>
            </>
          )}
        </Card.Content>
      </Card>
      {editing && (
        <NewWorkoutForm
          index={index}
          exercise={wo}
          date={date}
          reps={reps}
          repAmount={wo.rep_amount}
          repPace={wo.rep_pace}
          getExerciseFromForm={getExerciseFromForm}
          editing
          setEditing={setEditing}
        />
      )}
    </>
  );
};

export default ExerciseDisplayCard;
