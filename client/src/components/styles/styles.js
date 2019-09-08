import styled from 'styled-components';

export const PageContainer = styled.div `
  display: flex;
  justify-content: space-evenly;
  position: relative;
  margin-bottom: 1.5rem;

  @media only screen and (max-width: 600px){
    display: block;
}
`;

export const CardContainer = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;

  @media only screen and (max-width: 600px){
    margin-top: 1.5rem !important;
    width: 100%;
    align-items: center;
}
`;