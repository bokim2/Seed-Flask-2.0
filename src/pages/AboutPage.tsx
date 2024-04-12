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
  margin-top: 3rem;

  /* justify-content: center; */
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 850px) {
    margin-top: 6rem;
  }
`

const AboutHeaderContainer = styled.div`

  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 2rem;
`;

const AboutNavLink = styled(NavLink)`
font-family: var(--font-serif);
font-weight: 800;
font-size: 1.5rem;
color: var(--clr-text-100);
letter-spacing: 0.08rem;
  cursor: pointer;
  transition: transform 100ms ease-in-out, color 100ms ease-in-out,
    filter 100ms ease-in-out;

  &:hover {
    color: #ffe390;
    transform: scale(1.015);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(90%);
    
  }


&.header{
  font-size: 2rem;

}

&.active {
  color: turquoise;
}

@media(min-width: 850px) {
  font-size: 2.5rem;

  &.header{
  font-size: 4rem;

}
}
`;

export default function AboutPage() {
  return (
    <AboutPageContainer id="AboutPageContainer">
      <InnerPageContainer id="AboutInnerPageContainer">
        {/* <InnerWrapper id="AboutInnerWrapper"> */}
        <AboutPageContainer>
          <AboutNavLink to="/about" className='header'>About</AboutNavLink>

          <AboutHeaderContainer>
            <AboutNavLink to="seed-flask">The App
            {/* <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small top"
          src="/images/about/van.jpg"
          alt="van"
        />
      </CropContainer> */}
      </AboutNavLink>

            <AboutNavLink to="bo">Meet Bo</AboutNavLink>
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
