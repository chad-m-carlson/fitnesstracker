import React, {useState, useEffect} from 'react';
import PersonalInfo from './PersonalInfo';
import ProgressReport from './ProgressReport';
import {Icon, } from 'semantic-ui-react';
import styled from 'styled-components';

const Profile = () => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showProgressReport, setShowProgressReport] = useState(false);

  const handleMenuButtonClicks = (buttonClicked) => {
    switch(buttonClicked){
      case "personal" :
        setShowPersonalInfo(true);
        setShowProgressReport(false);
      break;
      case "progress":
        setShowPersonalInfo(false);
        setShowProgressReport(true);
      break;
      // default: {setShowPersonalInfo(true), setShowProgressReport(false)};
    }
  };

  return ( 
    <>
    <h1>Profile Page</h1>
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
      <MenuContainer>
        <MenuButton onClick={() => handleMenuButtonClicks("personal")}>
            <Icon name="id card outline" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Personal Info</p>
        </MenuButton>
        <MenuButton>
            <Icon name="question circle outline" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Something will go here</p>
        </MenuButton>
        <MenuButton onClick={() => handleMenuButtonClicks("progress")}>
            <Icon name="chart line" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Progress Reports</p>
        </MenuButton>
      </MenuContainer>
      <div style={{border: "1px solid red", width: "65%"}}>
        {showPersonalInfo &&
          <PersonalInfo />
        }
        {showProgressReport &&
          <ProgressReport />
        }
      </div>
    </div>
    </>
   );
}

const MenuContainer = styled.div `
  width: 35%;
  height: 75vh;
  margin: 0 auto;
`;

const MenuButton = styled.div `
  width: 90%;
  padding: .4rem;
  display: flex;

  :hover{
    border-radius: 0 50px 50px 0;
    background-color: #dedcdc;
    transition: all .2s;
  }
`;
 
export default Profile;