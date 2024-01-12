import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import NavList from './NavList';
import { type } from 'os';
import { NavLink } from 'react-router-dom';

const StyledMainNav = styled.div`
  z-index: 10;
  background-color: rgba(var(--clr-primary-950),.7);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;
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
  letter-spacing: 0.08rem;
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

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const style = { color: '#F2D17C', fontSize: '3rem' };

type MainNavProps = {
  toggleNav: boolean;
  handleClick: () => void;
};

export default function MainNav({ toggleNav, handleClick }: MainNavProps) {
  return (
    <StyledMainNav onClick={handleClick}>
      <StyledNav>
        <StyledNavLink to="/">
          <StyledTitle>Seed Flask</StyledTitle>
        </StyledNavLink>

        <NavSection>
          <StyledCircle>
            <FaUser />
          </StyledCircle>

          {toggleNav ? (
            <FaCaretUp style={style} />
          ) : (
            <FaCaretDown style={style} />
          )}
        </NavSection>
      </StyledNav>
    </StyledMainNav>
  );
}
