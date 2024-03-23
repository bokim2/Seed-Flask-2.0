import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MainMenuButton, { StyledImage } from '../ui/MainMenuButton';
import styled from 'styled-components';
import { MdHeight } from 'react-icons/md';
import FlasksTable from '../features/flasks/FlasksTable';
import FlasksRow from '../features/flasks/FlasksRow';
import Settings from './SettingsPage';
import {
  InnerPageContainer,
  InnerWrapper,
  LinkButton,
  PageContainer,
  StyledMainMenuButtons,
  Wrapper,
} from '../styles/UtilStyles';
import { baseUrl } from '../../configs';
import Button from '../ui/Button';
import { useQuery } from '@tanstack/react-query';

const HomeInnerPageContainer = styled.section`
  width: 80%;
  max-width: 1700px;
`;

const MenuButtonContainer = styled.div`
  flex: 2;
  padding-block: 5vh;
  display: flex;
  flex-direction: column;
  /* height: 60vh; */
  gap: clamp(1rem, 2vw, 2rem);
  justify-content: space-around;
  align-items: center;
  /* max-width: 100%; */

  @media (min-width: 800px) {
    /* width: 60%; */
  }
`;

export const CircularButton = styled(MainMenuButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(8rem, 12vw, 15rem);
  height: auto;
  aspect-ratio: 1/1;
  border-radius: 50%;

  /* @media (min-width: 800px) {
    width: clamp(10rem, 10vw, 20rem);
  } */
`;

const SecondaryMenuButtonContainer = styled.div`
  /* width: 100%; */
  /* padding-bottom: 15vh; */
  /* flex: 1; */
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  gap: clamp(1rem, 2vw, 2rem);
  justify-content: space-evenly;

  @media (min-width: 800px) {
    flex-direction: column;
    padding-bottom: 0;
  }
`;

type TuserProfile = {
  picture: string;
  name: string;
  email: string;
};

export default function HomePage() {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  // const [userProfile, setUserProfile] = useState<TuserProfile | null>(null);
  // const [env, setEnv] = useState<any>(null);

  return (
    <PageContainer id="HomePageContainer">
      <HomeInnerPageContainer id="HomeInnerPageContainer">
        <InnerWrapper id="HomeInnerWrapper">
          {/* <LoginButton />
          <LogoutButton /> */}
          {/* <Profile/> */}

          <MenuButtonContainer id="MenuButtonContainer">
            <MainMenuButton
              toPath="/cellbank"
              text={'register cell bank'}
              backgroundColor={'rgba(var(--clr-accent-1), .8)'}
              imgUrl="images/yeast-21.png"
              imgAlt="microbe"
              positionElement={{ left: '-15%' }}
            />
            {/* <MainMenuButton
              toPath="/flask"
              text={'start flask'}
              backgroundColor="rgba(var(--clr-accent-2), .8)"
              imgUrl="images/leaf-flask.png"
              imgAlt="flask"
              positionElement={{ left: '-5%' }}
            /> */}
            <MainMenuButton
              toPath="/charts"
              text={'plan flask'}
              backgroundColor="rgba(var(--clr-accent-2), .8)"
              imgUrl="images/curve.png"
              imgAlt="wave graph"
              positionElement={{ left: '-5%' }}
            />
            <MainMenuButton
              toPath="/flask"
              text={'start flask'}
              backgroundColor="rgba(var(--clr-accent-3), .8)"
              imgUrl="images/leaf-flask.png"
              imgAlt="flask"
              positionElement={{ left: '5%' }}
            />
            <MainMenuButton
              toPath="/sample"
              text={'sample flask'}
              backgroundColor="rgba(var(--clr-accent-4), .8)"
              imgUrl="images/clock-testtube.png"
              imgAlt="clock and test tube"
              imgStyleOverride={{
                height: 'clamp(1.8rem, 6vw, 6.6rem)',
                scale: '1.1',
              }}
              positionElement={{ left: '15%' }}
            />
            {/* <MainMenuButton
              toPath="/schedule"
              text={'view schedule'}
              backgroundColor="rgba(var(--clr-accent-4), .8)"
              imgUrl="images/schedule.png"
              imgAlt="schedule"
              positionElement={{ left: '15%' }}
            /> */}
          </MenuButtonContainer>
          <SecondaryMenuButtonContainer>
            <CircularButton
               toPath="/schedule"
              //  text={'view schedule'}
              backgroundColor="#EAE0DA"
              imgUrl="images/schedule.png"
              imgAlt="calendar"
              // positionElement={{ left: '30%' }}
              imgStyleOverride={{ borderRadius: '0', width: '60%' }}
            />
            <CircularButton
              toPath="/graphs"
              // text={''}
              backgroundColor="#F2D17C"
              imgUrl="images/document-1.png"
              imgAlt="wave graph"
              // positionElement={{ left: '30%' }}
              imgStyleOverride={{ borderRadius: '0', width: '60%' }}
            />
          </SecondaryMenuButtonContainer>
        </InnerWrapper>

        {/* <p>{JSON.stringify(userProfile, null, 2)}</p>
          <p>{JSON.stringify(env, null, 2)}</p>
          {userProfile && <img src={userProfile.picture} alt={userProfile?.name} />} */}
      </HomeInnerPageContainer>
    </PageContainer>
  );
}

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// const LogoutButton = () => {
//   const { logout } = useAuth0();

//   return (
//     <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//       Log Out
//     </button>
//   );
// };

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   console.log('user', user, 'isAuthenticated', isAuthenticated, 'isLoading', isLoading);

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     isAuthenticated && user && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// };
