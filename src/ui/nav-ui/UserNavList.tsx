import React, { ForwardedRef, forwardRef, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl } from '../../../configs';

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

  &:focus {
    color: red;
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;

  &:focus {
    color: red;
  }
`;

const UserNavList = forwardRef((props, ref: ForwardedRef<HTMLUListElement>) => {
  return (
    <StyledNavList ref={ref}>
      <li tabIndex={0}>
        <StyledLink href={`${baseUrl}/login/`}>login</StyledLink>
      </li>
      <li>
        <StyledLink href={`${baseUrl}/logout/`}>logout</StyledLink>
      </li>
      {/* <li>
        <StyledNavLink to="/signin">Sign-In</StyledNavLink>
      </li> */}
      <li>
        <StyledNavLink to="/settings">Settings</StyledNavLink>
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

export default UserNavList;
