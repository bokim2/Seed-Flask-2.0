import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`

`

export default function MainNav() {
  return <nav>
    <NavList>
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
    </NavList>
  </nav>;
}
