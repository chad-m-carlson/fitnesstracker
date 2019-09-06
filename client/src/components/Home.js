import React, {useContext, useState, } from 'react';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import TodaysWorkout from './TodaysWorkout';
import "react-datepicker/dist/react-datepicker.css";
import {Form, Button} from 'semantic-ui-react';
import styled from 'styled-components';

const Home  = () => {
  const [date, setDate] = useState(new Date());
  const [hideDatePicker, setHideDatePicker] = useState(true);
  const {authenticated, user} = useContext(AuthContext);

  const handleDateChange = (date) => {
    setDate(date);
  };

  return ( 
    <PageContainer>
      <div style={{textAlign: "center"}}>
        {authenticated &&
          <h2>Welcome {user.name}!</h2>
        }
        {!hideDatePicker &&
          <Form>
            <h3>Select a date to view a workout</h3>
            <Datepicker
              inline
              selected={date}
              onChange={handleDateChange}
            />
          </Form>
        }
        <Button 
          onClick={() => setHideDatePicker(!hideDatePicker)}>
          {hideDatePicker ? "Show Calendar" : "Hide Calendar"}
        </Button>
      </div>
      <CardContainer>
        <TodaysWorkout 
          date={date}
        />
      </CardContainer>
    </PageContainer>
   );
}

const PageContainer = styled.div `
  display: flex;
  justify-content: space-evenly;
  position: relative;

  @media only screen and (max-width: 600px){
    display: block;
}
`;

const CardContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  @media only screen and (max-width: 600px){
    margin-top: 1.5rem !important;
    width: 100%;
    align-items: center;
  }
`;
 
export default Home ;