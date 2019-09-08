import React, {useContext, useState, } from 'react';
import Datepicker from 'react-datepicker';
import {AuthContext} from '../providers/AuthProvider';
import TodaysWorkout from './TodaysWorkout';
import "react-datepicker/dist/react-datepicker.css";
import {Form, Button} from 'semantic-ui-react';
import {PageContainer, CardContainer} from './styles/styles';

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
      <div style={{texgtAlign: "Center"}}>
        <CardContainer>
          <TodaysWorkout 
            date={date}
          />
        </CardContainer>
      </div>
    </PageContainer>
   );
}
 
export default Home ;