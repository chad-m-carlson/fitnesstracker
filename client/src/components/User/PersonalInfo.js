import React, { useContext} from 'react';
import {AuthContext} from '../../providers/AuthProvider';
import {Segment, } from 'semantic-ui-react';

const PersonalInfo = () => {
  const {user} = useContext(AuthContext)
  const {first_name, last_name, height_feet, height_inches, birthdate, email, weight,  is_male, is_female, is_admin} = user

  return ( 
    <div style={{textAlign: "center"}}>
    <h1>Personal info</h1>
      <Segment>{first_name} {last_name}</Segment>
      <Segment>{weight}</Segment>
      <Segment>{height_feet}'{height_inches}"</Segment>
      <Segment>{birthdate}</Segment>
      <Segment>{email}</Segment>
    </div>
   );
}
 
export default PersonalInfo;