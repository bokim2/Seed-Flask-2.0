import React from 'react';
import styled from 'styled-components';

import { NavLink, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Bookmarks from '../Bookmarks';

const StyledSideMenu = styled.div`
  --image-size: 1.75rem;
  --font-size: 0.825rem;
  --active-border-radius: 22px;
  max-height: 100vh;

  z-index: 20;
  background-color: var(--clr-accent-9);
  bottom: 0;

  position: fixed;
  width: 100%;
  /* width: min(200px, 10vw); */

  /* height: 200px; */
  display: flex;
  flex-direction: column;

  @media (min-width: 850px) {
    /* width: 100%; */
    position: static;
    padding-inline: 1rem;
    flex-direction: column;
    min-height: 100vh;
    overflow-y: scroll;
    width: auto;
    /* width: min(200px, 20vw); */
    /* margin-top: var(--nav-bar-height, 10vh); */
    padding-top: calc(var(--nav-bar-height, 10vh) * 0.5);

    /* color: white; */
    font-size: var(--font-size);
  }
`;

const InnerMenuContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 850px) {
    padding-left: 0.25rem;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const StyledSideMenuImage = styled.img`
  justify-self: flex-start;
  /* flex-shrink: 0; */
  height: var(--image-size);
  /* width: 20px; */
  /* aspect-ratio: 1/1; */
  /* height: clamp(1.5rem, 4vw, 5rem); */
  object-fit: scale-down;
  transition: height 0.1 ease-in-out;
`;
export const StyledSideMenuButtons = styled(NavLink)`
  display: grid;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
  padding-inline: 0rem;
  border-radius: var(--active-border-radius);
  grid-template-columns: var(--image-size);

  gap: 0.5rem;
  height: calc(var(--image-size) * 1.5);
  width: 100%;
  /* border-bottom: 0.341px solid #000; */
  color: var(--clr-text-7);
  font-weight: 400;
  /* transition: all 0.2s ease-in-out; */

  p {
    /* text-transform: capitalize; */

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    margin: 0;
    display: none;

    @media (min-width: 850px) {
      margin-top: 0.125rem;
      display: block; /* Show text on larger screens */
    }
  }

  @media (min-width: 850px) {
    align-items: center;
    justify-content: flex-start;
    padding-inline: 1rem;
    grid-template-columns: calc(var(--image-size) * 1.2) min-content; /* Consistent column width for all buttons with minmax */
    width: 100%;
  }

  &:hover {
    opacity: 1;
    color: inherit;
    cursor: pointer;
    background-color: var(--clr-accent-11);
    /* filter: brightness(105%); */
    /* & > * {
      transform: scale(1.02);
    } */
  }

  &.active {
    opacity: 1;
    color: var(--clr-text-1);
    font-weight: 500;
    background-color: var(--clr-accent-10);
    /* filter: brightness(114%); */
    /* box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1); */
    z-index: 11;

    p {
      /* transform: scale(1.02); */
      /* transition: all 0.2s ease-in-out; */
    }

    /* ${StyledSideMenuImage} {
      height: calc(var(--image-size) * 1.02);
      transition: all 0.2s ease-in-out;
    } */
  }
`;

const BookmarksContainer = styled.div`
  display: none;

  @media (min-width: 850px) {
    gap: 0.5rem;
    margin-top: 2rem;
    display: grid;
  }
`;

const sideMenuInfo = [
  {
    name: 'cell bank',
    to: '/cellbank',
    src: '/images/yeast-21.png',
    alt: 'microbe',
    // style: { backgroundColor: 'rgba(var(--clr-accent-1), .8)' },
    style: { scale: '.9125', transform: 'translateX(.175rem)' },
  },
  {
    name: 'flask',
    to: '/flask',
    src: '/images/leaf-flask.png',
    alt: 'flask',
    style: { scale: '.935', transform: 'translateX(.0rem)' },
  },
  {
    name: 'sample',
    to: '/sample',
    src: '/images/clock-testtube.png',
    alt: 'sample',
    style: { scale: '1.05', transform: 'translateX(-.3rem)' },
  },
  {
    name: 'charts',
    to: '/charts',
    src: '/images/wave-graph-1.png',
    alt: 'charts',
    style: { scale: '1.025' },
  },
  {
    name: 'schedule',
    to: '/schedule',
    src: '/images/schedule.png',
    alt: 'schedule',
    style: { scale: '.915' },
  },

  {
    name: 'docs',
    to: '/docs',
    src: '/images/document-1.png',
    alt: 'docs',
    style: { scale: '.825', transform: 'translateX(-.175rem)' },
  },
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
                // style={{
                //   transform: `scale(${singleMenu.alt === 'sample' ? 1.1 : 1})`,
                // }}
                // style={{ backgroundColor: 'rgba(var(--clr-accent-1), .2)' }}
                style={singleMenu.style}
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
      <BookmarksContainer>
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
      </BookmarksContainer>
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
