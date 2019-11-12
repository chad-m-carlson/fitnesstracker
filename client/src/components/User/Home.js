import React, { useState } from "react";
import Datepicker from "react-datepicker";
// import {AuthContext} from '../../providers/AuthProvider';
import TodaysWorkout from "./TodaysWorkout";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input } from "semantic-ui-react";
import { PageContainer, CardContainer } from "../styles/styles";

const Home = () => {
  const [date, setDate] = useState(new Date());
  // const {authenticated, user} = useContext(AuthContext);

  const handleDateChange = date => {
    setDate(date);
  };

  return (
    <PageContainer>
      <div style={{ textAlign: "center" }}>
        <h3>Select a date to view a workout</h3>
        <Datepicker
          selected={date}
          onChange={handleDateChange}
          todayButton="Today"
          customInput={<Input></Input>}
        />
      </div>
      <div style={{ textAlign: "Center" }}>
        <CardContainer>
          <TodaysWorkout date={date} />
        </CardContainer>
      </div>
    </PageContainer>
  );
};

export default Home;
