import React, { forwardRef, ForwardedRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  background-color: rgba(var(--clr-primary-900), 0.7);
  z-index: 10;
  list-style-type: none;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;

  &:active {
    color: red;
  }
`;

const NavList = forwardRef((props, ref: ForwardedRef<HTMLUListElement>) => {
  return (
    <StyledNavList ref={ref}>
      <li tabIndex={0}>
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
});

export default NavList;
