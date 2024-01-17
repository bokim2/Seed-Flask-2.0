import React from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const moveGradient = keyframes`
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
`;

// Apply the animation to your styled component
const StyledLoaderBar = styled.div`
  position: absolute;
  height: 20px;
  width: 100%;
  background-image: linear-gradient(
    45deg,
    red,
    yellow,
    blue,
    red,
    yellow,
    blue,
    red,
    yellow,
    blue,
    red,
    yellow,
    blue,
    red
  );
  background-size: 2000%;
  background-position: left;
  animation: ${moveGradient} 15s linear infinite; /* Adjust the duration as needed */
`;

export default function LoaderBar() {
  return createPortal(<StyledLoaderBar></StyledLoaderBar>, document.body);
}
