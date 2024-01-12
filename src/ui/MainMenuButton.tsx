import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledMainMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* padding-right: 2rem; */
  width: clamp(7rem, 60vw, 25rem);
  aspect-ratio: 5/1;
  border-radius: 0.95931rem;
  border: 0.341px solid #000;
  font-size: clamp(1rem, 2vw, 2rem);
font-weight: 600;
letter-spacing: 0.01794rem; 
color: var(--color-text-2);
`;

const StyledCircle = styled.div`
border-radius: 99999vw;
background-color: blue;
padding: .5rem;
border: 5px solid green;
`;

const StyledImage = styled.img`
/* border-radius: 99999vw; */
aspect-ratio: 1/1;
width: clamp(1rem, 4vw, 3rem);
/* background-color: red; */
/* height: 50%; */
object-fit: scale-down;
`;

type MainMenuButtonProps = {
  text: string;
  backgroundColor: string;
}


export default function MainMenuButton({ text, backgroundColor }: MainMenuButtonProps) {
  return (
    <StyledMainMenuButtons to="/" style={{ backgroundColor: backgroundColor }}>
      <span>{text}</span>
      <StyledCircle>
        <StyledImage src="images/yeast-21.png" alt="microbe" />
      </StyledCircle>
    </StyledMainMenuButtons>
  );
}
