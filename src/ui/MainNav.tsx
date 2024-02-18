import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import NavList from './NavList';
import { NavLink } from 'react-router-dom';
import UserNavList from './UserNavList';
import { THandleNavToggle, TNavOrUser } from '../lib/types';
import { useOnClickOutside } from '../lib/hooks';
import {
  LinkButton,
  NavMenuButton,
  NavSection,
  UserButton,
} from '../styles/UtilStyles';
import { ProdUrl, baseUrl } from '../../configs';

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
height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
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
  cursor: pointer;
  transition: transform 100ms ease-in-out, color 100ms ease-in-out,
    filter 100ms ease-in-out;

  &:hover {
    color: #ffe390;
    transform: scale(1.015);
  }

  &:active {
    transform: scale(0.99);
    filter: brightness(90%);
  }

  /* &:active {
    color:#b6c7f1;
  }
  &:focus {
    color:#b6c7f1;
  } */
`;

export const StyledFaUser = styled(FaUser)`
  font-size: 1.75rem;
  fill: var(--clr-accent-0);
`;

export const StyledUser = styled.img`
  font-size: 1.75rem;
  fill: var(--clr-accent-0);
  opacity: 1;
  z-index: 100;
  /* max-width: 50%; */
  padding: 0;
  margin: 0;
  height: 70%;
  /* width: clamp(2rem, 4vw, 4rem); */
  border-radius: 50%;
`;

const UserIconContainer = styled.div`
height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
`;

const StyledLinkButton = styled(LinkButton)`
  display: none;

  @media (min-width: 600px) {
    display: block;
  }
`;

const style = {
  color: '#F2D17C',
  fontSize: '3rem',
  height: 'auto',
  width: 'auto',
  cursor: 'pointer',
};

type MainNavProps = {
  // openNav: boolean;
  // openUser: boolean;
  // handleToggle: THandleNavToggle;
};

type StyledMainNav = {
  $isScrolled?: boolean;
};

export default function MainNav({ userProfile }) {
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

  // handle toggle of user and nav menu
  const [openNav, setOpenNav] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const userListRef = useRef<HTMLUListElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const navButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle: THandleNavToggle = (e, navOrUser) => {
    // console.log('e.target, e.currentTarget', e.target, e.currentTarget)
    e.stopPropagation();
    if (navOrUser === 'nav') {
      setOpenUser(false);
      setOpenNav((prev) => !prev);
    }
    if (navOrUser === 'user') {
      setOpenNav(false);
      setOpenUser((prev) => !prev);
    }
  };

  useOnClickOutside([userListRef, navListRef], () => {
    setOpenNav(false);
    setOpenUser(false);
  });

  useEffect(() => {
    if (userListRef.current || navListRef.current) {
      const firstListItem =
        userListRef.current?.querySelector('li:first-child') ||
        navListRef.current?.querySelector('li:first-child');

      if (firstListItem) {
        (firstListItem as HTMLElement).focus();
      }
    }
  }, [openNav, openUser]);

  useEffect(() => {
    const handleEscapeMenus = (e) => {
      if (e.key === 'Escape') {
        setOpenUser((prev) => {
          if (prev) {
            console.log('openuser was open');
            navButtonRef.current?.focus();
          }
          return false;
        });

        setOpenNav(false);
      }
    };

    if (openNav || openUser) {
      document.addEventListener('keydown', handleEscapeMenus);
    }

    return () => document.removeEventListener('keydown', handleEscapeMenus);
  }, [openNav, openUser]);

  // useEffect(() => {
  //   if (openUser === false) {
  //     navButtonRef.current?.focus();
  //   }
  // }, [openUser]);
  const roleUrl = ProdUrl + '/role';

  return (
    <StyledMainNav $isScrolled={isScrolled} ref={mainNavRef}>
      <StyledNav>
        <StyledNavLink to="/">
          <StyledTitle>Seed Flask</StyledTitle>
        </StyledNavLink>

        <NavSection>
          {!userProfile?.name ? (
            <StyledLinkButton href={`${baseUrl}/login/`}>
              login
            </StyledLinkButton>
          ) : (
            <StyledLinkButton href={`${baseUrl}/logout/`}>
              logout
            </StyledLinkButton>
          )}

          {userProfile?.picture ? (
            <UserIconContainer
              onClick={(e) => handleToggle(e, 'user')}
              aria-label="user and settings menu"
            >
              <StyledUser src={userProfile.picture}></StyledUser>
              <p>{JSON.stringify(userProfile)}</p>
              <small>
                {
                  userProfile[
                    'https://seedflask.com/roles'
                  ]
                }
              </small>
            </UserIconContainer>
          ) : (
            <UserButton
              onClick={(e) => handleToggle(e, 'user')}
              aria-label="user and settings menu"
            >
              <StyledFaUser>
                {/* <NavLink to="/signin"></NavLink> */}
              </StyledFaUser>
            </UserButton>
          )}

          {openNav ? (
            <NavMenuButton aria-label="navigation menu">
              <FaCaretUp
                style={style}
                onClick={(e) => handleToggle(e, 'nav')}
                // onKeyPress={e=> handleToggle(e,'nav')}
              />
            </NavMenuButton>
          ) : (
            <NavMenuButton
              aria-label="navigation menu"
              ref={navButtonRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleToggle(e, 'nav');
                }
              }}
            >
              <FaCaretDown
                style={style}
                onClick={(e) => handleToggle(e, 'nav')}
              />
            </NavMenuButton>
          )}
        </NavSection>
      </StyledNav>

      {openNav && <NavList ref={navListRef} />}
      {openUser && <UserNavList ref={userListRef} />}
    </StyledMainNav>
  );
}
