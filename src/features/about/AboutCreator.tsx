import React from 'react';
import styled from 'styled-components';
import { StyledBackgroundImg } from '../../styles/UtilStyles';

const StyledAboutCreator = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const CropContainer = styled.div`
  position: relative;
  /* height: auto; */
  overflow: hidden;

  height: 20vw;
  width: 20vw;

  &.small {
    /* aspect-ratio: 1/1; */
    /* overflow: hidden; */
    /* height: auto; */

    /* width: 20vw; */
    /* height: 20vw;
    width: auto; */
  }
  /* 
  &.margin2 {
    margin: 2rem;
  } */

  /* &.right {
    margin-left: auto;
  } */
`;

export const StyledAboutsImage = styled.img`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;

  &.fit-logo {
    object-fit: contain;
  }

  &.genencor-logo {
    background-color: rgba(var(--clr-accent-1), .8);
    border-radius: 50%;
  }

  &.small {
  }

  &.top {
    margin-top: -20%;
  }

  &.bottom {
    /* margin-top: 10%; */
    margin-bottom: -10%;
  }

  &.zoom {
    transform: scale(1.1)
  }

  &.right {
    object-position: right;
  }
`;

export default function AboutCreator() {
  return (<>
                {/* <StyledBackgroundImg
          className="fit-logo"
          src="/images/progressive/dylann-hendricks-vxd9c9WNauo-unsplash__1_.jpg"
          alt="calysta"
          /> */}
          <StyledAboutCreator>
      {/* <h1>Meet Bo</h1> */}
      {/* <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small"
          src="/images/about/moab_pic.jpeg"
          alt="amt"
        />
      </CropContainer> */}

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small top"
          src="/images/progressive/van.jpg"
          alt="van"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small bottom zoom"
          src="/images/progressive/amt.jpg"
          alt="amt"
        />
      </CropContainer>

      <CropContainer className="small margin2 right">
        <StyledAboutsImage
          className="right"
          src="/images/progressive/amyris.jpg"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small "
          src="/images/progressive/calysta.jpg"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small"
          src="/images/progressive/genencor1.jpg"
          alt="genencor"
        />
      </CropContainer>


      {/* logos */}

      {/* <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small top"
          src="/images/progressive/van.jpg"
          alt="van"
        />
      </CropContainer> */}

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="fit-logo"
          src="/images/logo/amt-logo1.png"
          alt="amt"
        />
      </CropContainer>

      <CropContainer className="small margin2 ">
        <StyledAboutsImage
          className="fit-logo"
          src="/images/logo/amyris-logo.png"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="fit-logo"
          src="/images/logo/calysta-logo-1.png"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="genencor-logo fit-logo"
          src="/images/logo/genencor-logo.png"
          alt="genencor"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="fit-logo"
          src="/images/logo/dupont-logo1.png"
          alt="dupont"
        />
      </CropContainer>
    </StyledAboutCreator>
    </>
  );
}
