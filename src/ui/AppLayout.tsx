import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import styled from 'styled-components';
import { useState } from 'react';
import NavList from './NavList';

const StyledBackgroundColor = styled.div`
  position: fixed;
  background-color: var(--clr-primary-800);
  width: 100vw;
  height: 100vh;
  z-index: -2;

  /* opacity: 0.5; */
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
  width: 90%;
  margin: 0 auto;
  padding-top: 3vh;
`

export default function AppLayout() {
  const [toggleNav, setToggleNav] = useState(false);

const handleClick = (): void => setToggleNav((prev) => !prev);

return (
    <>
        <StyledBackgroundColor />
        <StyledBackgroundImg />
        <MainNav toggleNav={toggleNav} handleClick={handleClick} />
        {toggleNav && <NavList />}
        {/* <span>testing app layout</span> */}
        <MainContainer>
            <Outlet />
        </MainContainer>
        {/* </StyledAppLayout> */}
    </>
);

}
