import styled from 'styled-components';
import Button from '../../../ui/Button';

export const Container = styled.div`
  flex-grow: 1;
  /* height: 30vw; */
  padding: 1rem;
  justify-content: stretch;
  align-self: center;
  /* width: 10vw;  */
  /* height: 100%; */
  @media (min-width: 850px) {
  }
`;

export const SampleContainer = styled.div`
  width: 5vw;
  max-width: 50px;
  max-height: 60vh;
  height: auto;
  position: relative;
  background-color: white;

  @media (min-width: 850px) {
  }
`;

export const DiluentContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: var(--media-height); */
  background-color: #98dcf5;
`;

export const CultureContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: var(--media-height); */
  background-color: #e8c142;
`;

//

export const OuterContainer = styled.div`
  /* width: auto; */
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: 1fr 2fr;
  gap: 0.25rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  /* background-color: rgba(var(--clr-accent-5), 0.2); */
  background-color:rgba(203, 213, 225,.1);
  /* filter: brightness(1.5); */
  padding: 1rem 0.5rem;
  border-radius: 15px;
  align-items: center;
  /* margin-block: .5rem; */
`;
export const InnerContainer = styled.div`
/* background-color: red; */
/* align-items: start; */
align-self: start;
/* justify-content: start; */
  display: flex;
  flex-wrap: wrap;
  /* align-items: space-between; */

  gap: 0.25rem;
  font-size: 1rem;

  &.align-left {
    justify-content: end;
  }
`;

export const SingleDilutionContainer = styled.div`
  /* background-color: lightblue; */
  /* border: 5px solid blue; */
  /* padding: 1rem; */
  max-width: 450px;
  padding: 0.5rem;
  background-color: rgba(203, 213, 225,.2);
  border-radius: 15px;
  margin-block: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;

  @media(min-width: 850px) {
    padding: 1rem 1.5rem;
  }
`;

export const CalculationContainer = styled.div`
  font-size: 1.2rem;
  padding: 0.5rem;
`;

export const DilutionSelectorInput = styled.input`
  width: 6ch;
  border: none;
  padding: 0.2rem;
  border-radius: 5px;
  /* background-color: grey; */
`;

export const OD600ReadingInput = styled.input`
  width: 6ch;
`;

export const DilutionSelectorButton = styled(Button)`
letter-spacing: .03rem;
  font-size: 1rem;
  flex-grow: 0;
  width: 100%;
  height: auto;
  /* justify-items: stretch;
  align-self: stretch; */

  /* align-self: center; */
  /* max-height: 2rem; */
  background-color: #708090;
  &.selected {
      color: var(--clr-text-2);
    background-color: #10e7dc;
    
    /* color: #10e7dc;
    background-color: black; */
}
`;

export const DilutionValueButton = styled(Button)`
  font-size: 1rem;
  flex-grow: 0;
  width: auto;
  height: auto;
  /* background-color: rgba(16, 231, 220, .4);
  color: black;  */
  /* justify-items: stretch;
  align-self: stretch; */

  /* align-self: center; */
  /* max-height: 2rem; */
  &.selected {
    background-color: rgba(var(--clr-accent-5), 1);
    color: var(--clr-text-2);
  }
`;

export const SampleSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;

  @media (min-width: 850px) {
    flex-wrap: nowrap;
  }
`;

export const SingleSelectorWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DilutionAnimationWrapper = styled.div`
  /* flex-grow: 1; */
  height: 100%;
`;

export const StyledH2 = styled.h2`
font-family: var(--font-serif);
letter-spacing: 0.03rem;
  padding: 0.5rem;
  color: white;
`;

export const StyledSingleDilution = styled.div`
  /* padding: .5rem;
background-color: #332626;
border-radius: 15px; */
`;
