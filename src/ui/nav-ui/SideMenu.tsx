import React from 'react';
import styled from 'styled-components';

import { NavLink, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Bookmarks from '../Bookmarks';

const StyledSideMenu = styled.div`
  --image-size: 2.5rem;
  --font-size: 1.25rem;

  z-index: 11;
  background-color: white;
  bottom: 0;

  position: fixed;
  width: 100vw;
  /* width: min(200px, 10vw); */

  /* height: 200px; */
  display: flex;
  flex-direction: column;

  @media (min-width: 850px) {
    position: static;
    padding-inline: 1rem;
    flex-direction: column;
    /* width: auto; */
    width: min(250px, 15vw);
    margin-top: var(--nav-bar-height, 10vh);

    color: white;
    font-size: var(--font-size);
  }
`;

const InnerMenuContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 850px) {
    flex-direction: column;
  }
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
  place-items: center;
  opacity: 0.85;

  grid-template-columns: 1fr;

  gap: 5%;
  /* justify-content: center; */
  height: calc(var(--image-size) * 1.5);
  width: 100%;
  /* padding: 0.5rem; */
  border-bottom: 0.341px solid #000;
  color: var(--clr-text-2);
  transition: all 0.2s ease-in-out;

  p {
    display: none;
    padding: 0;
    margin: 0;

    @media (min-width: 850px) {
      display: block;
    }
  }

  @media (min-width: 850px) {
    grid-template-columns: 1fr 1.5fr;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
    filter: brightness(105%);
    & > * {
      transform: scale(1.02);
    }
  }

  &.active {
    opacity: 1;
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
  const bookmarkedCellbanks = useSelector(
    (state: RootState) => state.bookmarks.cellbank_bookmark
  );

  const bookmarkedFlasks = useSelector(
    (state: RootState) => state.bookmarks.flask_bookmark
  );

  return (
    <StyledSideMenu id="side-menu">
      {/* info button */}

      {/* side menu */}
      {/* <SideMenuContainer> */}
      {/* <StyledInfoButtonContainer></StyledInfoButtonContainer> */}
      <InnerMenuContainer>
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
      </InnerMenuContainer>
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

      <Bookmarks
        bookmarksArray={bookmarkedCellbanks}
        bookmarksTitle={'Cell Banks'}
      />
      <Bookmarks
        bookmarksArray={bookmarkedFlasks}
        bookmarksTitle={'Flasks'}
        // containerBgColor='red'
        // bookmarkBgColor='lightgrey'
      />
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
