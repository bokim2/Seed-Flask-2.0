import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MainNav from './ui/nav-ui/MainNav';
import styled from 'styled-components';
import SideMenu from './ui/nav-ui/SideMenu';
import {
  FullScreenContainer,
  StyledMainMenuButtons,
} from './styles/UtilStyles';
import { StyledImage } from './ui/MainMenuButton';
import { updateUserProfile } from './redux/slices/userProfileSlice';
import { baseUrl } from '../configs';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { TuserProfile } from './redux/slices/userSlice';

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

  background-image: url('/images/blobTop.svg'), url('/images/blobBottom.svg');
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
  height: var(
    --nav-bar-height,
    10vh
  ); // important for nav and table caption to be positioned correctly
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainPageContainer = styled.main`
  position: relative;
  /* flex-grow: 1; */
  width: 100%;
  min-height: 75vh;
  /* width: 85%; */
  margin: 0 auto;
  display: flex;
`;

// const PageButton = styled(NavLink)`
// position: fixed;
// height: 5%;
//   top: 50%; /* Center vertically */
//   left: 1rem; /* Adjust as needed for spacing from the left edge */
//   /* transform: translateY(-50%);  */
// background-color: red;
//   /* width: clamp(8rem, 12vw, 15rem); */
//   aspect-ratio: 1/1; /* Maintain a 1:1 aspect ratio */
//   border-radius: 50%; /* Makes it circular */

//   transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out,
//     box-shadow 0.2s ease-in-out;

//   &:hover {
//     cursor: pointer;
//     transform: scale(1.06);
//     filter: brightness(110%);
//     box-shadow: 0 0px 4px rgba(var(--clr-accent-0), 1);
//   }

//   &:active {
//     transform: scale(0.98);
//     filter: brightness(114%);
//     box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
//   }

// `;

// const NavCircularButton = styled(MainMenuButton)`
// position: fixed;
// z-index: 1000;
// height: 5%;
//   top: 50%;
//   width: auto;
//   height: 2rem;
//   aspect-ratio: 1/1;
// display: flex;
// align-items: center;
// justify-content: center;

// `

const StyledMainMenuNavButtons = styled(StyledMainMenuButtons)`
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  /* position: fixed; */
  /* z-index: 100; */
  /* height: 5%; */
  /* top: 50%; */
  overflow: hidden;
  background-color: rgba(var(--clr-accent-0), 1);
  border-radius: 99999vw;

  width: auto;
  /* padding: 1rem; */
  aspect-ratio: 1/1;

  height: 2.5vh;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    filter: brightness(105%);
    box-shadow: 0 0px 3px rgba(var(--clr-accent-0), 1);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
  }

  @media (min-width: 850px) {
    /* height: 10%; */
    height: 4vh;
  }
`;

const StyledPageNavImage = styled(StyledImage)``;

export const ScrollbarContainer = styled.div`
  /* margin-top: 10vh; */
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 10px;

    @media (max-width: 600px) {
      /* width: 20px; */
    }
  }

  &::-webkit-scrollbar-thumb:hover {
    ${'' /* background: #555;  */}
    ${
      '' /* transform: brightness(1.2);
    width: 20px;  */
    }
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background: var(--clr-primary-800);

    ${'' /* padding: 10px; */}
    margin-top: var(--nav-bar-height, 10vh);
    ${'' /* border-radius: 9999vw; */}
  }

  &::-webkit-scrollbar-thumb:vertical {
    background: linear-gradient(0, #ebb936, blue);
    border-radius: 9999vw;
    height: 20px;
    width: 20px;
    padding: 10px;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    background: red;
    border-radius: 9999vw;
    height: 20px;
    width: 20px;
    padding: 10px;
  }
`;

export const ScrollbarXAxisContainer = styled.div`
  height: 100%;
  width: 100vw;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 10px;

    @media (max-width: 600px) {
      /* width: 20px; */
    }
  }

  &::-webkit-scrollbar-thumb:hover {
    ${'' /* background: #555;  */}
    ${
      '' /* transform: brightness(1.2);
    width: 20px;  */
    }
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    /* background: rgba(var(--clr-primary-900), 1); */

    margin-top: var(--nav-bar-height, 10vh);
  }

  &::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 9999vw;
    height: 20px;
    width: 20px;
    padding: 10px;
  }
`;

export default function AppLayout() {
  // const handleNavToggle: THandleNavToggle = (e, navOrUser) => {
  //   // console.log('e.target, e.currentTarget', e.target, e.currentTarget)
  //   e.stopPropagation();
  //   if (navOrUser === 'nav') {
  //     setOpenUser(false);
  //     setOpenNav((prev) => !prev);
  //   }
  //   if (navOrUser === 'user') {
  //     setOpenNav(false);
  //     setOpenUser((prev) => !prev);
  //   }
  // };

  const userProfile = useAppSelector(
    (state) => state.userProfile.userProfile
  ) as TuserProfile | null;
  const dispatch = useAppDispatch();

  const [userLoading, setUserLoading] = useState<boolean>(true);
  // console.log('userProfile in APP console log before useEffect', userProfile);
  useEffect(() => {
    async function authProfile() {
      try {
        const response = await fetch(`${baseUrl}/api/auth/status`, {
          credentials: 'include', // Include cookies for cross-origin requests
        });
        // console.log(response);
        if (response.ok) {
          const data = await response.json();

          // setUserProfile(data);
          // console.log('userProfile in APP first useEffect', data);
          dispatch(updateUserProfile(data));
          console.log('user data in applayout', data);
        }
        if (response.status === 401) {
          console.log('Error: Not authenticated.  Please sign in.');
        }
        if (response.status === 403) {
          console.log('Error: Not authorized to access this resource.');
        }
      } catch (err) {
        console.log('error', err);
      } finally {
        setUserLoading(false);
      }
    }

    // getEnv()
    authProfile();
  }, []);
  // console.log('userProfile in APP console log after useEffect', userProfile);

  // const navigate = useNavigate();
  const location = useLocation();

  const APP_PAGE_ORDER = [
    '/',
    '/cellbank',
    '/charts',
    '/flask',
    '/sample',
    '/schedule',
    '/about',
  ];

  const navigateCarousel = (direction) => {
    const currentIndex = APP_PAGE_ORDER.indexOf(location.pathname);
    const nextIndex =
      (currentIndex + direction + APP_PAGE_ORDER.length) %
      APP_PAGE_ORDER.length;
    return APP_PAGE_ORDER[nextIndex];
    // navigate(APP_PAGE_ORDER[nextIndex]);
  };

  return (
    <StyledAppLayout>
      <StyledBackgroundColor />
      <StyledBackgroundImg />
      <NavBar id="NavBar">
        <MainNav
          // openNav={openNav}
          // handleToggle={handleNavToggle}
          // openUser={openUser}
          userProfile={userProfile}
        />
      </NavBar>

      {/* <LoaderBar /> */}

      <MainPageContainer id="MainPageContainer">
        {userProfile?.isAuthenticated && <SideMenu />}

        <ScrollbarContainer id="scrollbar-container">
          <Outlet />
        </ScrollbarContainer>
      </MainPageContainer>

      {/* </StyledAppLayout> */}
    </StyledAppLayout>
  );
}
