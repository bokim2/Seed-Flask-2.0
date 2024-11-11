import React from 'react';
import styled from 'styled-components';

export const StyledPageHeader = styled.div`
/* margin-top: 0; */
  position: sticky;
  top: var(--nav-bar-height, 10vh);
  left: 0;
  /* margin-top: var(--nav); */
  z-index: 100;
  height: 30%;
  width: 100%;
  background-color: var(--clr-primary-100);
  /* background-color: red; */
`;

const Title = styled.h1``;

export default function PageHeader({ children }) {
  return (
    <StyledPageHeader>
      <Title>{children}</Title>
      
    </StyledPageHeader>
  );
}
