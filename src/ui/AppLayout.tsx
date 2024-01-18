import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import styled from 'styled-components';
import { useState } from 'react';
import NavList from './NavList';
import LoaderBar from './LoaderBar';

const StyledAppLayout = styled.div`
flex: 1;
position: relative;
display: flex;
flex-direction: column;
/* height: 100vh; */
`

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
    setToggleNav((prev) => !prev);}

  return (
    <StyledAppLayout>
      <StyledBackgroundColor />
      <StyledBackgroundImg />
      <MainNav toggleNav={toggleNav} handleToggle={handleClick} />
      {/* <LoaderBar /> */}
      
      {/* <span>testing app layout</span> */}
      <MainPageContainer>
        <Outlet />
      </MainPageContainer>
      {/* </StyledAppLayout> */}
    </StyledAppLayout>
  );
}
