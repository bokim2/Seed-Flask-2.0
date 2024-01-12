import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  background-color: var(--clr-primary-900);

`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;
`;

export default function NavList() {
  return (
    <StyledNavList>
      <li>
        <StyledNavLink to="/">Main</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/cellbank">Cellbank</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/flask">Flask</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/sample">Sample</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/bioreactor">Bioreactor</StyledNavLink>
      </li>
    </StyledNavList>
  );
}
