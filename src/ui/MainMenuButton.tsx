
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { StyledMainMenuButtons } from '../styles/UtilStyles';




export const StyledImage = styled.img<{ $fetchpriority?: string }>`
  aspect-ratio: 1/1;
  height: clamp(1.5rem, 4vw, 5rem);
  object-fit: scale-down;
  fetchpriority: ${(props) => props.$fetchpriority};
`;

type MainMenuButtonProps = {
  toPath: string;
  text?: string;
  backgroundColor: string;
  imgUrl: string;
  imgAlt?: string;
  imgStyleOverride?: any;
  positionElement?: any;
  className?: string;
  $fetchpriority?: string;
};

export default function MainMenuButton({
  toPath,
  text,
  backgroundColor,
  imgUrl,
  imgAlt,
  imgStyleOverride,
  positionElement,
  className,
  $fetchpriority = 'high'
}: MainMenuButtonProps) {





  return (
    <StyledMainMenuButtons className={className}
      to={toPath}
      style={{ backgroundColor, ...positionElement }}
    >
      <span>{text}</span>

      <StyledImage className={className} src={imgUrl} alt={imgAlt} style={imgStyleOverride} $fetchpriority={$fetchpriority} />
    </StyledMainMenuButtons>
  );
}
 