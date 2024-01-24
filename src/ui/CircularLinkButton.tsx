import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledMainMenuButtons } from '../styles/UtilStyles';


export const StyledImage = styled.img`
  aspect-ratio: 1/1;
  height: clamp(1.5rem, 4vw, 5rem);
  object-fit: scale-down;
`;

type MainMenuButtonProps = {
  toPath: string;
  text?: string;
  backgroundColor: string;
  imgUrl: string;
  imgAlt?: string;
  styleOverride?: any;
  positionElement?: any;
  className?: string;
};

export default function CircularLinkButton({
  toPath,
  text,
  backgroundColor,
  imgUrl,
  imgAlt,
  styleOverride,
  positionElement,
  className
}: MainMenuButtonProps) {
  return (
    <StyledMainMenuButtons className={className}
      to={toPath}
      style={{ backgroundColor, ...positionElement }}
    >
      <span>{text}</span>

      <StyledImage className={className} src={imgUrl} alt={imgAlt} style={styleOverride} />
    </StyledMainMenuButtons>
  );
}
