import React from 'react';
import styled from 'styled-components';
import { StyledNavLink, StyledNavList } from '../../styles/UtilStyles';
import MainMenuButton, { StyledImage } from '../MainMenuButton';
import { NavLink, Outlet } from 'react-router-dom';
import InfoButtonForModal from '../InfoButtonForModal';

const StyledSideMenu = styled.div`
  display: flex;
  /* height: 20px; */
  flex-direction: row;
  position: fixed;

  /* height: 70vh; */
  width: 100vw;
  right: 0;
  bottom: 0;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  /* z-index: 1000000; */
  /* background-color: red; */
  /* width: 200px; */
`;

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: blue;
`;

export const StyledSideMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.341px solid #000;
  /* letter-spacing: 0.01794rem; */
  color: var(--clr-text-2);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    filter: brightness(105%);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
  }

  @media (min-width: 800px) {
    /* width: clamp(15rem, 30vw, 30rem); */
  }
`;

export const StyledATag = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.341px solid #000;
  /* letter-spacing: 0.01794rem; */
  color: var(--clr-text-2);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    filter: brightness(105%);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
  }

  @media (min-width: 800px) {
    /* width: clamp(15rem, 30vw, 30rem); */
  }
`;

export const StyledSideMenuImage = styled.img`
  aspect-ratio: 1/1;
  /* height: clamp(1.5rem, 4vw, 5rem); */
  object-fit: scale-down;
`;

export const StyledInfoButtonContainer = styled.div`
  bottom: 0;
  left: 0;
`;

const sideMenuInfo = [
  {
    to: '/cellbank',
    src: 'images/yeast-21.png',
    alt: 'microbe',
    style: { backgroundColor: 'rgba(var(--clr-accent-1), .8)' },
  },
  { to: '/flask', src: 'images/leaf-flask.png', alt: 'flask' },
  { to: '/sample', src: 'images/clock-testtube.png', alt: 'sample' },
  { to: '/schedule', src: 'images/schedule.png', alt: 'schedule' },
  { to: '/charts', src: 'images/wave-graph-1.png', alt: 'charts' },
];

export default function SideMenu() {
  return (
    <StyledSideMenu id="side-menu">
      {/* info button */}
      <InfoButtonForModal
        buttonBackgroundColor="light"
        imgSrc="images/info/about.png"
        alt="info button"
      >
        <div>'hello test'</div>
      </InfoButtonForModal>

      {/* side menu */}
      <SideMenuContainer>
        {/* <StyledInfoButtonContainer></StyledInfoButtonContainer> */}
        {sideMenuInfo.map((singleMenu, index) => {
          return (
            <StyledSideMenuButtons to={singleMenu.to}>
              <StyledImage
                //   className={className}
                src={singleMenu.src}
                alt={singleMenu.alt}
                style={{ backgroundColor: 'rgba(var(--clr-accent-1), .8)' }}
                //   style={imgStyleOverride}
                //   $fetchpriority={$fetchpriority}
              />
            </StyledSideMenuButtons>
          );
        })}
        <StyledATag
          href="https://www.rediscope.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledImage
            //   className={className}
            src={'images/document-1.png'}
            alt={'wave graph'}
            style={{ backgroundColor: 'rgba(var(--clr-accent-1), .8)' }}
            //   style={imgStyleOverride}
            //   $fetchpriority={$fetchpriority}
          />
        </StyledATag>
      </SideMenuContainer>
    </StyledSideMenu>
  );
}
