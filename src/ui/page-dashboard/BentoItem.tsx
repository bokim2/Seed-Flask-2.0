import React, { useState } from 'react';
import styled from 'styled-components';

export const BentoItemStyles = styled.div<{ $span: string; $bgColor?: string }>`
  grid-column: ${({ $span }) => `span ${$span}`};
  background-color: ${({ $bgColor }) => $bgColor || 'lightgrey'};
  /* grid-column: span 2; */
  aspect-ratio: 2/1;
  /* background-color: lightblue; */
`;

export default function BentoItem({ $span, $bgColor, title, onClick }) {

  return (
    <BentoItemStyles $span={$span} $bgColor={$bgColor} onClick={onClick}>
      {title}
    </BentoItemStyles>
  )
}
