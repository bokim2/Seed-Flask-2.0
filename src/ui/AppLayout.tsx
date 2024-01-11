import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  position: absolute;
background-color: var(--clr-primary-800);
  width: 100vw;
  height: 100vh;
  z-index:-2;
  
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
  z-index:-1;
`;

export default function AppLayout() {
  return (
    <>
      <StyledAppLayout />
      <StyledBackgroundImg />
      <MainNav />
      testing app layout
      <main>
        <Outlet />
      </main>
      {/* </StyledAppLayout> */}
    </>
  );
}
