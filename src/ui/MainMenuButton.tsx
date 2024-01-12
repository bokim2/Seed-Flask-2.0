import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledMainMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;
  width: clamp(7rem, 60vw, 25rem);
  aspect-ratio: 5/1;
  border-radius: 0.95931rem;
  border: 0.341px solid #000;
`;
export default function MainMenuButton() {
  return (
    <StyledMainMenuButtons to="/" style={{ backgroundColor: 'yellow' }}>
      Main
    </StyledMainMenuButtons>
  );
}
