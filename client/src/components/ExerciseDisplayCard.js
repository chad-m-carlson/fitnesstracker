import React, { useState } from "react";
import NewWorkoutForm from "./Forms/NewWorkoutForm";
import UserLog from "./User/UserLog";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

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

  return (
    <>
      <Card style={{ backgroundColor: "rgb(230, 16, 16, 0.02)" }}>
        <Card.Content>
          <a href={wo.video_url} style={{ color: "black" }}>
            <Card.Header style={{ textAlign: "center" }}>{wo.name}</Card.Header>
          </a>
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
          {/* <br /> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Description style={{ fontStyle: "italic" }}>
              {wo.notes}
            </Card.Description>
          </div>
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
