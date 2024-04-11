import React from 'react';
import styled from 'styled-components';

const StyledAboutCreator = styled.div``;

export const StyledAboutsImage = styled.img`
  &.small {
    /* position: absolute; */
    width: 20vw;
    height: auto;
  }

  &.top {
    margin-top: -20%;
  }
`;

export const CropContainer = styled.div`
  position: relative;
  height: auto;

  &.small {
    /* aspect-ratio: 1/1; */
    width: 20vw;
    overflow: hidden;
    /* height: auto; */
  }

  &.margin2 {
    margin: 2rem;
  }
`;

export default function AboutCreator() {
  return (
    <StyledAboutCreator>
        <h1>Meet Bo</h1>
      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small"
          src="/images/about/moab_pic.jpeg"
          alt="amt"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small top"
          src="/images/about/van.jpg"
          alt="van"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage className="small" src="/images/about/amt.jpg" alt="amt" />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small "
          src="/images/about/amyris.jpg"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small "
          src="/images/about/calysta.jpg"
          alt="calysta"
        />
      </CropContainer>

      <CropContainer className="small margin2">
        <StyledAboutsImage
          className="small"
          src="/images/about/genencor.jpeg"
          alt="genencor"
        />
      </CropContainer>
    </StyledAboutCreator>
  );
}
