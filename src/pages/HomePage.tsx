import React from 'react';
import MainMenuButton, { StyledImage } from '../ui/MainMenuButton';
import styled from 'styled-components';
import { MdHeight } from 'react-icons/md';
import FlasksTable from '../features/flasks/FlasksTable';
import FlasksRow from '../features/flasks/FlasksRow';
import Settings from './SettingsPage';
import {
  InnerPageContainer,
  PageContainer,
  StyledMainMenuButtons,
  Wrapper,
} from '../styles/UtilStyles';

const HomePageContainer = styled(PageContainer)`
  width: 80%;
`;

const InnerWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
  /* height: 70%; */
  /* margin-top: auto; */

  /* justify-content: center; */
  /* align-items: center; */
  /* height: 70%; */

  @media (min-width: 800px) {
    flex-direction: row;
    /* height: revert; */
  }
`;

const MenuButtonContainer = styled.div`
  flex: 2;
  padding-block: 5vh;
  display: flex;
  flex-direction: column;
  /* height: 60vh; */
  gap: clamp(1rem, 2vw, 2rem);
  justify-content: space-around;
  /* max-width: 100%; */

  @media (min-width: 800px) {
    /* width: 60%; */
  }
`;

export const CircularButton = styled(MainMenuButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(8rem, 10vw, 15rem);
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;

  /* @media (min-width: 800px) {
    width: clamp(10rem, 10vw, 20rem);
  } */
`;

const SecondaryMenuButtonContainer = styled.div`
  /* width: 100%; */
  /* padding-bottom: 15vh; */
  /* flex: 1; */
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  /* gap: clamp(1rem, 2vw, 2rem); */
  justify-content: space-evenly;

  @media (min-width: 800px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

export default function HomePage() {
  return (
    <PageContainer id="HomePageContainer">
      <InnerPageContainer id="HomeInnerPageContainer">
        <InnerWrapper id="HomeInnerWrapper">
          <MenuButtonContainer>
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
              imgStyleOverride={{
                height: 'clamp(1.8rem, 6vw, 6.6rem)',
                scale: '1.1',
              }}
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
          <SecondaryMenuButtonContainer>
            <CircularButton
              toPath="/charts"
              // text={''}
              backgroundColor="#EAE0DA"
              imgUrl="images/wave-graph-1.png"
              imgAlt="wave graph"
              // positionElement={{ left: '30%' }}
              imgStyleOverride={{ borderRadius: '0', width: '60%' }}
            />
            <CircularButton
              toPath="/graphs"
              // text={''}
              backgroundColor="#F2D17C"
              imgUrl="images/document-1.png"
              imgAlt="wave graph"
              // positionElement={{ left: '30%' }}
              imgStyleOverride={{ borderRadius: '0', width: '60%' }}
            />
          </SecondaryMenuButtonContainer>
        </InnerWrapper>
      </InnerPageContainer>
    </PageContainer>
  );
}
