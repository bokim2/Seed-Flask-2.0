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
  position: sticky;
  top: 0;
  left: 0;
  height: 7px;
  width: 100%;
  /* z-index: 1000; */
  background-image: linear-gradient(
    45deg,
    rgba(var(--clr-primary-950), 0),
    rgba(var(--clr-primary-950), 0),
    red,
    yellow,
    blue,
    red,
    #ffff,
    yellow,
    blue,
    #ffff,
    red,
    yellow,
    blue,
    red,
    #ffff,
    yellow,
    blue,
    red
  );
  background-size: 2000%;
  background-position: left;
  animation: ${moveGradient} 12s linear infinite;
`;

// export default function LoaderBar() {
//   return createPortal(<StyledLoaderBar></StyledLoaderBar>, document.body);
// }

export default function LoaderBar() {
  return <StyledLoaderBar></StyledLoaderBar>;
}
