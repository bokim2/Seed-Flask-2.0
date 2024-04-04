import React from 'react';
import MainNav from '../ui/nav-ui/MainNav';
import { baseUrl } from '../../configs';
import { NavLink } from 'react-router-dom';
import { InnerPageContainer, InnerWrapper, PageContainer } from '../styles/UtilStyles';

export default function GetStarted() {
  return (
    <>
    <PageContainer id="GetStartedPageContainer">
      <InnerPageContainer id="GetStartedInnerPageContainer">
        <InnerWrapper id="GetStartedInnerWrapper">
      {/* <MainNav userProfile={null}></MainNav> */}
      <a href={`${baseUrl}/login/`}>Getstarted</a>
      </InnerWrapper>

{/* <p>{JSON.stringify(userProfile, null, 2)}</p>
  <p>{JSON.stringify(env, null, 2)}</p>
  {userProfile && <img src={userProfile.picture} alt={userProfile?.name} />} */}
</InnerPageContainer>
</PageContainer>
    </>
  );
}
