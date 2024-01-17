import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useRef, useState } from 'react';
import NavList from './NavList';
import { type } from 'os';
import { NavLink } from 'react-router-dom';

const StyledMainNav = styled.div`
  z-index: 10;
  background-color: rgba(var(--clr-primary-950), 0.7);
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

const StyledCircle = styled.button`

  aspect-ratio: 1/1;
  border-radius: 9999vw;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const RoundButton = styled.button`
  border-radius: 50%; /* Use 50% for a circular shape */
  aspect-ratio: 1/1;
  padding: 0.5rem; /* Add padding if needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.button`
padding: 0;
background-color: transparent;`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const style = { color: '#F2D17C', fontSize: '3rem' };

type MainNavProps = {
  toggleNav: boolean;
  handleClick: () => void;
};

export default function MainNav({ toggleNav, handleClick }: MainNavProps) {
  const mainNavRef = useRef(null)
  return (
    <StyledMainNav onClick={handleClick} ref={mainNavRef} >
      <StyledNav>
        <StyledNavLink to="/">
          <StyledTitle>Seed Flask</StyledTitle>
        </StyledNavLink>

        <NavSection>
          <RoundButton>
            <FaUser style={{fontSize: '2rem'}}/>
          </RoundButton>

          {toggleNav ? (
            <ButtonWrapper>
              <FaCaretUp style={style} />
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <FaCaretDown style={style} />
            </ButtonWrapper>
          )}
        </NavSection>
      </StyledNav>
    </StyledMainNav>
  );
}
