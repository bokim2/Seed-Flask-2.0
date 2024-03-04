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
  LinkButton,
  PageContainer,
  StyledMainMenuButtons,
  Wrapper,
} from '../styles/UtilStyles';
import { baseUrl } from '../../configs';
import Button from '../ui/Button';
import { useQuery } from '@tanstack/react-query';

const HomePageContainer = styled(PageContainer)`
  width: 80%;
  align-self: center;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
  /* height: 70%; */
  /* margin-top: auto; */

  /* justify-content: center; */
  /* align-items: center; */
  /* height: 70%; */

  @media (min-width: 800px) {
    flex-direction: row;
    /* height: revert; */
  }
`;

const MenuButtonContainer = styled.div`
  flex: 2;
  padding-block: 5vh;
  display: flex;
  flex-direction: column;
  /* height: 60vh; */
  gap: clamp(1rem, 2vw, 2rem);
  justify-content: space-around;
  /* max-width: 100%; */

  @media (min-width: 800px) {
    /* width: 60%; */
  }
`;

export const CircularButton = styled(MainMenuButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(8rem, 10vw, 15rem);
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
  /* gap: clamp(1rem, 2vw, 2rem); */
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
      <InnerPageContainer id="HomeInnerPageContainer">
        <InnerWrapper id="HomeInnerWrapper">
          {/* <LoginButton />
          <LogoutButton /> */}
          {/* <Profile/> */}

          <MenuButtonContainer>
            <MainMenuButton
              toPath="/cellbank"
              text={'register cell bank'}
              backgroundColor={'rgba(var(--clr-accent-1), .8)'}
              imgUrl="images/yeast-21.png"
              imgAlt="microbe"
              positionElement={{ left: '0%' }}
            />
            <MainMenuButton
              toPath="/flask"
              text={'start flask'}
              backgroundColor="rgba(var(--clr-accent-2), .8)"
              imgUrl="images/leaf-flask.png"
              imgAlt="flask"
              positionElement={{ left: '10%' }}
            />
            <MainMenuButton
              toPath="/sample"
              text={'sample flask'}
              backgroundColor="rgba(var(--clr-accent-3), .8)"
              imgUrl="images/clock-testtube.png"
              imgAlt="clock and test tube"
              imgStyleOverride={{
                height: 'clamp(1.8rem, 6vw, 6.6rem)',
                scale: '1.1',
              }}
              positionElement={{ left: '20%' }}
            />
            <MainMenuButton
              toPath="/bioreactor"
              text={'start bioreactor'}
              backgroundColor="rgba(var(--clr-accent-4), .8)"
              imgUrl="images/bioreactor-1.png"
              imgAlt="bioreactor"
              positionElement={{ left: '30%' }}
            />
          </MenuButtonContainer>
          <SecondaryMenuButtonContainer>
            <CircularButton
              toPath="/charts"
              // text={''}
              backgroundColor="#EAE0DA"
              imgUrl="images/wave-graph-1.png"
              imgAlt="wave graph"
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
      </InnerPageContainer>
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
