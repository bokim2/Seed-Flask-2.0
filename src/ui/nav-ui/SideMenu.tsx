import React from 'react';
import styled from 'styled-components';
import classes from './styles.module.css';
import { StyledNavLink, StyledNavList } from '../../styles/UtilStyles';
import MainMenuButton, { StyledImage } from '../MainMenuButton';
import { NavLink, Outlet } from 'react-router-dom';
import InfoButtonForModal from '../InfoButtonForModal';
import { ZodUndefined } from 'zod';

const StyledSideMenu = styled.div`
  --image-size: 2.5rem;
  --font-size: 1.25rem;

  z-index: 9;
  display: flex;

  padding-inline: 1rem;
  flex-direction: column;
  /* width: auto; */
  min-width: 200px;
  background-color: white;

  margin-top: 10vh;

  color: white;
  font-size: var(--font-size);
`;



export const StyledSideMenuImage = styled.img`
  height: var(--image-size);
  /* width: 20px; */
  /* aspect-ratio: 1/1; */
  /* height: clamp(1.5rem, 4vw, 5rem); */
  object-fit: scale-down;
  transition: height 0.2 ease-in-out;
`;

export const StyledSideMenuButtons = styled(NavLink)`
  /* padding: 0.5rem 1rem; */
  display: grid;
  align-items: center;

  grid-template-columns: 1fr 1.5fr;
  
  gap: 5%;
  /* justify-content: center; */
  height: calc(var(--image-size) * 1.5);
  width: 100%;
  /* padding: 0.5rem; */
  border-bottom: 0.341px solid #000;
  color: var(--clr-text-2);
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(105%);
    & > * {
      transform: scale(1.02);
    }
  }

  &.active {
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
    z-index: 11;

   p {
      transform: scale(1.02);
      transition: all 0.2s ease-in-out;
    }

     ${StyledSideMenuImage} {
      height: calc(var(--image-size) * 1.02);
      transition: all 0.2s ease-in-out;
    }
  }

  p {
    margin: 0;
    padding: 0;
    /* flex-grow: 1;
    flex-shrink: 1;  */
    word-wrap: break-word; /* Ensure long text wraps */
  }
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
    name: 'charts',
    to: '/charts',
    src: '/images/wave-graph-1.png',
    alt: 'charts',
  },
  {
    name: 'schedule',
    to: '/schedule',
    src: '/images/schedule.png',
    alt: 'schedule',
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
            <StyledSideMenuImage
              //   className={className}
              src={singleMenu.src}
              alt={singleMenu.alt}
              style={{
                transform: `scale(${singleMenu.alt === 'sample' ? 0.7 : 1})`,
              }}
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
