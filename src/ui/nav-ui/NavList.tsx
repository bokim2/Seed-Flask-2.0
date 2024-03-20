import React, { forwardRef, ForwardedRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StyledNavLink, StyledNavList } from '../../styles/UtilStyles';

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
        <StyledNavLink to="/schedule">Schedule</StyledNavLink>
      </li>
    </StyledNavList>
  );
});

export default NavList;
