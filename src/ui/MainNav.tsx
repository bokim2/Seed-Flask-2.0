import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaCaretDown, FaUser } from 'react-icons/fa';
import { useState } from 'react';

const StyledMainNav = styled.div`
  z-index: 10;
  background-color: var(--clr-primary-900);
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: clamp(0.2rem, 1vw, 0.4rem) clamp(0.5rem, 4vw, 5rem);
`;

const StyledTitle = styled.h1`
  font-family: var(--font-serif);
  font-weight: 800;
  color: var(--clr-accent-0);
  font-size: clamp(2rem, 3vw, 3rem);
`;

const StyledCircle = styled.div`
  background-color: red;
  z-index: 100;
  height: clamp(2rem, 3vw, 3rem);
  aspect-ratio: 1/1;
  border-radius: 99999vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)``;
const style = { color: '#F2D17C', fontSize: '3rem' };

export default function MainNav() {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <StyledMainNav>
      <StyledNav onClick={() => setToggleNav((prev) => !prev)}>
        <StyledTitle>Seed Flask</StyledTitle>

        <NavSection>
          <StyledCircle>
            <FaUser />
          </StyledCircle>

          {toggleNav ? (
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
          ) : (
            <FaCaretDown style={style} />
          )}
        </NavSection>
      </StyledNav>
    </StyledMainNav>
  );
}
