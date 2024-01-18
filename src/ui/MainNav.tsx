import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import NavList from './NavList';
import { type } from 'os';
import { NavLink } from 'react-router-dom';

const StyledMainNav = styled.div<StyledMainNav>`
position: relative;
  z-index: 10;
  background-color: rgba(var(--clr-primary-950), 1);
  padding-block: 0.5rem;
  flex-grow: 1;
  height: 100%;
  /* height: 10vh; */

  opacity: ${(props) => props.$isScrolled ? 1 : 0.7
  }
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
  color: var(--clr-accent-0);
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: 0.08rem;
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

const StyledFaUser = styled(FaUser)`
font-size: 1.75rem;
fill: var(--clr-accent-0);
`;


const style = { color: '#F2D17C', fontSize: '3rem' };

type MainNavProps = {
  toggleNav: boolean;
  handleToggle: (e:  React.MouseEvent<SVGElement, MouseEvent>) => void;
};


type StyledMainNav = {
  $isScrolled?: boolean;
  
};

export default function MainNav({ toggleNav, handleToggle }: MainNavProps) {
  const mainNavRef = useRef(null)
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
    <StyledMainNav $isScrolled={isScrolled} ref={mainNavRef} >
      <StyledNav>
        <StyledNavLink to="/">
          <StyledTitle>Seed Flask</StyledTitle>
        </StyledNavLink>

        <NavSection>
          <RoundButton>
            <StyledFaUser />
          </RoundButton>

          {toggleNav ? (
            <ButtonWrapper>
              <FaCaretUp style={style} onClick={handleToggle}/>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <FaCaretDown style={style} onClick={handleToggle}/>
            </ButtonWrapper>
          )}
        </NavSection>
        
      </StyledNav>
      {toggleNav && <NavList />}
    </StyledMainNav>
  );
}
