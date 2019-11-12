import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  padding-bottom: 3rem;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 75%;

  @media only screen and (max-width: 600px) {
    margin-top: 1.5rem !important;
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

export const ExerciseContainer = styled.div`
  cursor: pointer;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  padding: 0.5rem;
  width: 75%;
  margin: 0 auto 0.2rem auto;

  &:first-child {
    margin-top: 1rem;
  }
`;
