import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import styled from 'styled-components';
import { useState } from 'react';
import NavList from './NavList';
import LoaderBar from './LoaderBar';

const StyledBackgroundColor = styled.div`
  position: fixed;
  background-color: var(--clr-primary-800);
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const StyledBackgroundImg = styled.div`
  width: 100vw;
  position: absolute;

  background-image: url('images/blobTop.svg'), url('images/blobBottom.svg');
  background-size: 80vw;
  background-repeat: no-repeat;
  background-position-x: 25%, 0%;
  background-position-y: 0%, 100%;
  height: 100vh;
  z-index: -1;
`;

const MainContainer = styled.main`
  width: 85%;
  margin: 0 auto;
  /* padding-top: clamp(0.5rem, 4vw, 3rem); */


`

export default function AppLayout() {
  const [toggleNav, setToggleNav] = useState(false);

const handleClick = (): void => setToggleNav((prev) => !prev);

return (
    <>
        <StyledBackgroundColor />
        <StyledBackgroundImg />
        <MainNav toggleNav={toggleNav} handleClick={handleClick} />
        {/* <LoaderBar /> */}
        {toggleNav && <NavList />}
        {/* <span>testing app layout</span> */}
        <MainContainer>
            <Outlet />
        </MainContainer>
        {/* </StyledAppLayout> */}
    </>
);

}
