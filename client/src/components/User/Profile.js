import React, {useState, useEffect} from 'react';
import PersonalInfo from './PersonalInfo';
import ProgressReport from './ProgressReport';
import MaxWeightDisplay from './MaxWeightDisplay';
import {Icon, } from 'semantic-ui-react';
import styled from 'styled-components';

const Profile = () => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showProgressReport, setShowProgressReport] = useState(false);
  const [showMaxWeight, setShowMaxWeight] = useState(false);

  const handleMenuButtonClicks = (buttonClicked) => {
    switch(buttonClicked){
      case "personal" :
        setShowPersonalInfo(true);
        setShowProgressReport(false);
        setShowMaxWeight(false);
      break;
      case "progress":
        setShowPersonalInfo(false);
        setShowProgressReport(true);
        setShowMaxWeight(false);
      break;
      case "max":
        setShowPersonalInfo(false);
        setShowProgressReport(false);
        setShowMaxWeight(true);
      break;
      // default: {setShowPersonalInfo(true), setShowProgressReport(false)};
    }
  };

  return ( 
    <>
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
      <MenuContainer>
        <MenuButton onClick={() => handleMenuButtonClicks("personal")}>
            <Icon name="id card outline" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Personal Info</p>
        </MenuButton>
        <MenuButton onClick={() => handleMenuButtonClicks("max")}>
            <Icon name="balance" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Max weight</p>
        </MenuButton>
        <MenuButton onClick={() => handleMenuButtonClicks("progress")}>
            <Icon name="chart line" size="large" color="red"/> 
            <p style={{marginLeft: "2rem", fontWeight: "800"}}>Progress Reports</p>
        </MenuButton>
      </MenuContainer>
      <ContentContainer>
        {showPersonalInfo &&
          <PersonalInfo />
        }
        {showProgressReport &&
          <ProgressReport />
        }
        {showMaxWeight &&
          <MaxWeightDisplay />
        }
      </ContentContainer>
    </div>
    </>
   );
}

const MenuContainer = styled.div `
  width: 25%;
  height: 75vh;
  margin: 0 auto;
`;

const MenuButton = styled.div `
  width: 90%;
  padding: .4rem;
  display: flex;
  cursor: pointer;

  :hover{
    border-radius: 0 50px 50px 0;
    background-color: #dedcdc;
    transition: all .2s;
  }
`;

const ContentContainer = styled.div `
  width: 60%;
  margin-right: 5rem;
`;
 
export default Profile;