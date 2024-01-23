import { Outlet } from 'react-router-dom';
import MainNav from './ui/MainNav';
import styled from 'styled-components';
import { useState } from 'react';
import NavList from './ui/NavList';
import LoaderBar from './ui/LoaderBar';

const StyledAppLayout = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
`;

const StyledBackgroundColor = styled.div`
  position: fixed;
  background-color: var(--clr-primary-800);
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const StyledBackgroundImg = styled.div`
  min-width: 100%;
  height: 100%;
  position: fixed;

  background-image: url('images/blobTop.svg'), url('images/blobBottom.svg');
  background-size: 80vw;
  background-repeat: no-repeat;
  background-position-x: 25%, 0%;
  background-position-y: 0%, 100%;
  z-index: -1;
`;

const NavBar = styled.div`
  position: fixed;
  margin: 0;
  width: 100%;
  z-index: 10;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainPageContainer = styled.main`
  position: relative;
  flex-grow: 1;
  width: 100%;
  /* width: 85%; */
  margin: 0 auto;
  /* height: 100%; */
  /* padding-top: clamp(0.5rem, 4vw, 3rem); */
`;

export default function AppLayout() {
  const [toggleNav, setToggleNav] = useState(false);

  const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>): void => {
    e.stopPropagation();
    setToggleNav((prev) => !prev);
  };

  return (
    <StyledAppLayout>
      <StyledBackgroundColor />
      <StyledBackgroundImg />
      <NavBar id="NavBar">
        <MainNav toggleNav={toggleNav} handleToggle={handleClick} />
      </NavBar>
      {/* <LoaderBar /> */}

      {/* <span>testing app layout</span> */}
      <MainPageContainer id="MainPageContainer">
        <Outlet />
      </MainPageContainer>
      {/* </StyledAppLayout> */}
    </StyledAppLayout>
  );
}
