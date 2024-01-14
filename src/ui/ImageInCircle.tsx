import React from 'react';
import styled from 'styled-components';

const StyledCircle = styled.div`
  border-radius: 99999vw;
  background-color: blue;
  padding: 0.5rem;
  border: 5px solid green;
`;

const StyledImage = styled.img`
  border-radius: 99999vw;
  aspect-ratio: 1/1;
  height: clamp(1.5rem, 4vw, 5rem);
  object-fit: scale-down;
`;

type ImageInCircleProps = {
    text?: string;
    imgUrl: string;
    imgAlt?: string;
    styleOverride?: any;
  };

export default function ImageInCircle({
    text,
    imgUrl,
    imgAlt,
    styleOverride,
  }: ImageInCircleProps) {
  return (
    <StyledCircle>
    text
      <StyledImage src={imgUrl} alt={imgAlt} style={styleOverride} />
    </StyledCircle>
  );
}
