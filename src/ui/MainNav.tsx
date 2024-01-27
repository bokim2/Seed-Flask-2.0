import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import NavList from './NavList';
import { type } from 'os';
import { NavLink } from 'react-router-dom';
import UserNavList from './UserNavList';
import { THandleNavToggle, TNavOrUser } from '../lib/types';

const StyledMainNav = styled.div<StyledMainNav>`
  position: relative;
  z-index: 10;
  background-color: rgba(var(--clr-primary-950), 0.9);
  padding-block: 0.5rem;
  flex-grow: 1;
  height: 100%;
  /* height: 10vh; */

  opacity: ${(props) => (props.$isScrolled ? 1 : 0.8)};
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
  height: 100%;
  justify-content: space-between;

  padding: clamp(0.2rem, 1vw, 0.4rem) clamp(0.5rem, 4vw, 5rem);
`;

const StyledTitle = styled.h1`
  font-family: var(--font-serif);
  font-weight: 800;
  color: rgba(var(--clr-accent-0));
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: 0.08rem;

  &:hover {
    color: #ffe390;
  }

  /* &:active {
    color:#b6c7f1;
  }
  &:focus {
    color:#b6c7f1;
  } */
`;

const UserButton = styled.button`
  border-radius: 50%; /* Use 50% for a circular shape */
  aspect-ratio: 1/1;
  padding: 0.5rem; /* Add padding if needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavMenuButton = styled.button`
  padding: 0;
  background-color: transparent;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledFaUser = styled(FaUser)`
  font-size: 1.75rem;
  fill: var(--clr-accent-0);
`;

const style = { color: '#F2D17C', fontSize: '3rem' };

type MainNavProps = {
  openNav: boolean;
  openUser: boolean;
  handleToggle: THandleNavToggle;
};

type StyledMainNav = {
  $isScrolled?: boolean;
};

export default function MainNav({ openNav,openUser, handleToggle }: MainNavProps) {
  const mainNavRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use useEffect to add event listener for scroll
  useEffect(() => {
    const handleScroll = () => {
      // Update the state based on scroll position
      setIsScrolled(window.scrollY > 0);
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledMainNav $isScrolled={isScrolled} ref={mainNavRef}>
      <StyledNav>
        <StyledNavLink to="/">
          <StyledTitle>Seed Flask</StyledTitle>
        </StyledNavLink>

        <NavSection>
          <UserButton onClick={(e)=>handleToggle(e,'user')}
          aria-label="user menu">
            <StyledFaUser >
              <NavLink to="/signin"></NavLink>
            </StyledFaUser>
          </UserButton>

          {openNav ? (
            <NavMenuButton aria-label="navigation menu">
              <FaCaretUp style={style} onClick={(e)=>handleToggle(e,'nav')} />
            </NavMenuButton>
          ) : (
            <NavMenuButton aria-label="navigation menu">
              <FaCaretDown style={style} onClick={(e)=>handleToggle(e,'nav')} />
            </NavMenuButton>
          )}
        </NavSection>
      </StyledNav>
      {openNav && <NavList />}
      {openUser && <UserNavList />}
    </StyledMainNav>
  );
}
