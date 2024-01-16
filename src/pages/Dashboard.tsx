import React from 'react';
import MainMenuButton from '../ui/MainMenuButton';
import styled from 'styled-components';
import { MdHeight } from 'react-icons/md';
import FlasksTable from '../features/flasks/FlasksTable';
import FlasksRow from '../features/flasks/FlasksRow';
import Settings from './Settings';

const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 60vh; */
  gap: clamp(1rem, 2vw, 2rem);
  justify-content: space-evenly;

  @media (min-width: 400px) {
    width: 60%;
  }
`;

export default function Dashboard() {
  return (
    <MenuButtonContainer>
    
      {/* <FlasksTable render={(flask, i) => <FlasksRow flask={flask} key={flask.flask_id}/>} /> */}

      <MainMenuButton
        toPath="/cellbank"
        text={'register cell bank'}
        backgroundColor="#FAF7F0"
        imgUrl="images/yeast-21.png"
        imgAlt="microbe"
        positionElement={{ left: '0%' }}
      />
      <MainMenuButton
        toPath="/flask"
        text={'start flask'}
        backgroundColor="#E1F6F2"
        imgUrl="images/leaf-flask.png"
        imgAlt="flask"
        positionElement={{ left: '10%' }}
      />
      <MainMenuButton
        toPath="/sample"
        text={'sample flask'}
        backgroundColor="#E7F1DC"
        imgUrl="images/clock-testtube.png"
        imgAlt="clock and test tube"
        styleOverride={{ height: 'clamp(1.8rem, 6vw, 6.6rem)', scale: '1.1' }}
        positionElement={{ left: '20%' }}
      />
      <MainMenuButton
        toPath="/bioreactor"
        text={'start bioreactor'}
        backgroundColor="#E4F1EE"
        imgUrl="images/bioreactor-1.png"
        imgAlt="bioreactor"
        positionElement={{ left: '30%' }}
      />
    </MenuButtonContainer>
  );
}
