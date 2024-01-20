import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledMainMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: clamp(7rem, 60vw, 30rem);
  aspect-ratio: 4.5/1;
  border-radius: clamp(1rem, 2vw, 2rem);
  border: 0.341px solid #000;
  font-size: clamp(1rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.01794rem;
  color: var(--color-text-2);

  @media (min-width: 800px) {
    width: clamp(15rem, 30vw, 30rem);
  }
`;

const StyledImage = styled.img`
  aspect-ratio: 1/1;
  height: clamp(1.5rem, 4vw, 5rem);
  object-fit: scale-down;
`;

type MainMenuButtonProps = {
  toPath: string;
  text: string;
  backgroundColor: string;
  imgUrl: string;
  imgAlt?: string;
  styleOverride?: any;
  positionElement?: any;
};

export default function MainMenuButton({
  toPath,
  text,
  backgroundColor,
  imgUrl,
  imgAlt,
  styleOverride,
  positionElement,
}: MainMenuButtonProps) {
  return (
    <StyledMainMenuButtons
      to={toPath}
      style={{ backgroundColor, ...positionElement }}
    >
      <span>{text}</span>

      <StyledImage src={imgUrl} alt={imgAlt} style={styleOverride} />
    </StyledMainMenuButtons>
  );
}
