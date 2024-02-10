import React from 'react';
import styled from 'styled-components';
import { CircularButton } from '../pages/HomePage';
import { UserButton } from '../styles/UtilStyles';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
`;

const StyledImg = styled.img`
  height: 30px;
  transition: transform 0.1s ease-in-out, filter 0.1s ease-in-out;

  /* &:hover {
    transform: scale(1.1);
    filter: brightness(1.5); */
  }
`;

// const InfoButton = styled(CircularButton)`
//   aspect-ratio: 1/1;
//   width: auto;
//   height: 20px;
//   /* transition: transform 0.1s ease-in-out,
//  filter 0.1s ease-in-out; */
//   transition: all 0.1s ease-in-out;

//   &:hover {
//     transform: scale(1.1);
//     filter: brightness(1.3);
//   }
// `;

const InfoButton = styled.button`
  border-radius: 50%; /* Use 50% for a circular shape */
  aspect-ratio: 1/1;
  padding: 0.5rem; /* Add padding if needed */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`
export const StyledFaUser = styled.img`
  font-size: 1.75rem;
  fill: var(--clr-accent-0);
`;

export default function Footer() {
  return (
    <StyledFooter>
      {/* <StyledImg src="images/info/info.png" alt="info button" /> */}
      <InfoButton
            onClick={(e) => console.log('info button clicked')}
            aria-label="user and settings menu"
          >
<StyledImg src="images/document-1.png" alt="info button" />
          </InfoButton>
    </StyledFooter>
  );
}
