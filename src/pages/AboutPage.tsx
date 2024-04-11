import React from 'react';
import {
  InnerPageContainer,
  InnerWrapper,
  PageContainer,
} from '../styles/UtilStyles';
import styled from 'styled-components';
import { NavLink, Route, Routes } from 'react-router-dom';
import AboutSeedFlask from '../features/about/AboutSeedFlask';
import AboutCreator, { CropContainer, StyledAboutsImage } from '../features/about/AboutCreator';

const AboutPageContainer = styled.div`
  /* margin-top: max(12vh, 5rem); */
  margin-top: 8rem;

  /* justify-content: center; */
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 2rem;
`;

const AboutNavLink = styled(NavLink)``;

export default function AboutPage() {
  return (
    <AboutPageContainer id="AboutPageContainer">
      <InnerPageContainer id="AboutInnerPageContainer">
        {/* <InnerWrapper id="AboutInnerWrapper"> */}
        <AboutPageContainer>
          <h1>About</h1>

          <AboutHeaderContainer>
            <AboutNavLink to="seed-flask">Seed Flask App
            <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small top"
          src="/images/about/van.jpg"
          alt="van"
        />
      </CropContainer>
      </AboutNavLink>

            <AboutNavLink to="bo">Meet The Creator</AboutNavLink>
          </AboutHeaderContainer>

            <Routes>
              <Route path="seed-flask" element={<AboutSeedFlask />} />
              <Route path="bo" element={<AboutCreator />} />
            </Routes>
            
        </AboutPageContainer>
        {/* </InnerWrapper> */}
      </InnerPageContainer>
    </AboutPageContainer>
  );
}
