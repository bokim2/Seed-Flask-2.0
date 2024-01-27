import React from 'react';
import styled, { keyframes } from 'styled-components';

const OuterContainer = styled.div`
  /* background-color: red; */
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vw;
`;

const StyledImage = styled.img`
  height: 10vh;
`;




const loader1Animation = keyframes`
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(1vh) rotate(-5deg); }
  100% { transform: translateY(0) rotate(0); }
`;

const loader2Animation = keyframes`
  0% { transform: translateY(0) rotate(0); }
  25% { transform: translateY(0.5vh) rotate(1.5deg); }
  50% { transform: translateY(1vh) rotate(0deg); }
  75% { transform: translateY(0.5vh) rotate(-1.5deg); }
  100% { transform: translateY(0) rotate(0); }

`;


const loader3Animation = keyframes`
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(1vh) rotate(5deg); }
  100% { transform: translateY(0) rotate(0); }
`;

const StyledImage1 = styled(StyledImage)`
  animation: ${loader1Animation} 2s ease-in-out infinite;
`;

const StyledImage2 = styled(StyledImage)`
  animation: ${loader2Animation} 2s ease-in-out infinite;
  animation-delay: 0.2s;
`;
const StyledImage3 = styled(StyledImage)`
  animation: ${loader3Animation} 2s ease-in-out infinite;
  animation-delay: 0.4s;
`;

export default function LoaderCircular() {
  return (
    <OuterContainer>
      <InnerContainer>
        <StyledImage1 src="/images/botany-2.png" alt="flask" />
        <StyledImage2 src="/images/botany-2.png" alt="flask" />
        <StyledImage3 src="/images/botany-2.png" alt="flask" />
      </InnerContainer>
    </OuterContainer>
  );
}
