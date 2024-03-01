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
  @media (min-width: 600px) {
  }
`;

export const SampleContainer = styled.div`
  /* flex-shrink: 4; */
  /* width: 100%; */
  /* flex-grow: 1; */
  /* margin: 0.5rem; */
  width: 5vw;
  max-width: 50px;
  max-height: 60vh;
  height: auto;

  position: relative;
  /* height: 20vw; */
  /* width: 4vw; */
  background-color: white;
  /* border-left: 1px solid black; */
  /* border-right: 1px solid black; */

  /* height: 100%; */
  @media (min-width: 600px) {
    /* height: 20vw; */
    /* width: 4vw; */
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
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: rgba(var(--clr-accent-5), 0.2);
  padding: 1rem 0.5rem;
  border-radius: 15px;
  align-items: center;
`;
export const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

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
  margin-block: 1rem;
`;

export const CalculationContainer = styled.div`
font-size: 1.2rem;
padding: .5rem;
`;

export const DilutionSelectorInput = styled.input`
  width: 6ch;
  border: none;
  padding: .2rem;
  border-radius: 5px;
  /* background-color: grey; */
`;

export const OD600ReadingInput = styled.input`
  width: 6ch;
`;

export const DilutionButton = styled(Button)`
  font-size: 1rem;
  flex-grow: 0;
  width: auto;
  height: auto;
  align-self: center;
  /* max-height: 2rem; */
  &.selected {
    background-color: rgba(var(--clr-accent-5), 1);
    color: var(--clr-text-2);
  }
`;

export const SampleSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: .5rem;

  @media (min-width: 600px) {
    flex-wrap: nowrap;
  }
`;

export const SingleSelectorWrapper = styled.div`
  flex: 1;
`;

export const DilutionAnimationWrapper = styled.div`
  /* flex-grow: 1; */
  height: 100%;
`;


export const StyledH2 = styled.h2`
padding: .5rem;
color: white;
`

export const StyledSingleDilution = styled.div`
padding: .5rem;
background-color: #332626;
border-radius: 15px;


`