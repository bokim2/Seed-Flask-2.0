import React from 'react';
import styled from 'styled-components';
import classes from './styles.module.css';
import { StyledNavLink, StyledNavList } from '../../styles/UtilStyles';
import MainMenuButton, { StyledImage } from '../MainMenuButton';
import { NavLink, Outlet } from 'react-router-dom';
import InfoButtonForModal from '../InfoButtonForModal';
import { ZodUndefined } from 'zod';

const StyledSideMenu = styled.div`
z-index: 9;
  display: flex;
  /* height: 20px; */
  flex-direction: column;
  width: auto;
  min-width: 200px;
  background-color: white;
  /* position: fixed; */
  margin-top: 10vh;

  /* height: 70vh; */
  /* width: 100vw; */
  /* 
  left: 0;
  top: 0; */
  /* flex-direction: column; */
  /* justify-content: center;
  align-items: center; */
  color: white;
  font-size: 1rem;
  /* z-index: 1000000; */
  /* background-color: red; */
  /* width: 200px; */
`;

// export const SideMenuContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding-inline: 2rem;
//   background-color: blue;
//   width: auto; /* Allow width to be determined by content */
// `;

export const StyledSideMenuButtons = styled(NavLink)`

  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 110%;
  /* padding: 0.5rem; */
  border: 0.341px solid #000;
  color: var(--clr-text-2);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    filter: brightness(105%);
  }

  &.active {
    transform: scale(1.1);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
    z-index: 11;
  }

  p {
    margin: 0; 
    padding: 0;
    flex-grow: 1; 
    flex-shrink: 1; /* Allow the text to shrink if necessary */
    word-wrap: break-word; /* Ensure long text wraps */
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

// export const StyledInfoButtonContainer = styled.div`
//   bottom: 0;
//   left: 0;
// `;

const sideMenuInfo = [
  {
    name: 'cell bank',
    to: '/cellbank',
    src: '/images/yeast-21.png',
    alt: 'microbe',
    style: { backgroundColor: 'rgba(var(--clr-accent-1), .8)' },
  },
  { name: 'flask', to: '/flask', src: '/images/leaf-flask.png', alt: 'flask' },
  {
    name: 'sample',
    to: '/sample',
    src: '/images/clock-testtube.png',
    alt: 'sample',
  },
  {
    name: 'schedule',
    to: '/schedule',
    src: '/images/schedule.png',
    alt: 'schedule',
  },
  {
    name: 'charts',
    to: '/charts',
    src: '/images/wave-graph-1.png',
    alt: 'charts',
  },
  { name: 'docs', to: '/docs', src: '/images/document-1.png', alt: 'docs' },
];

export default function SideMenu() {
  return (
    <StyledSideMenu id="side-menu">
      {/* info button */}

      {/* side menu */}
      {/* <SideMenuContainer> */}
      {/* <StyledInfoButtonContainer></StyledInfoButtonContainer> */}
      {sideMenuInfo.map((singleMenu, i) => {
        return (
          <StyledSideMenuButtons
            to={singleMenu.to}
            key={i}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <StyledImage
              //   className={className}
              src={singleMenu.src}
              alt={singleMenu.alt}
              // style={{ backgroundColor: 'rgba(var(--clr-accent-1), .2)' }}
              //   style={imgStyleOverride}
              //   $fetchpriority={$fetchpriority}
            />
            <p>{singleMenu.name}</p>
          </StyledSideMenuButtons>
        );
      })}
      {/* <StyledATag
          href="https://www.rediscope.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledImage
            //   className={className}
            src={'/images/document-1.png'}
            alt={'docs'}
            style={{ backgroundColor: 'rgba(var(--clr-accent-1), .8)' }}
            //   style={imgStyleOverride}
            //   $fetchpriority={$fetchpriority}
          />
        </StyledATag> */}
      {/* </SideMenuContainer> */}
    </StyledSideMenu>
  );
}

{
  /* <InfoButtonForModal
buttonBackgroundColor="light"
imgSrc="/images/info/about.png"
alt="info button"
>
<div>'hello test'</div>
</InfoButtonForModal> */
}
