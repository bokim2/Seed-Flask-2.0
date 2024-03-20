import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaUser } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LinkButton, MainFilterContainer, MainFilterSelector, MainFilterSelectorOption } from '../styles/UtilStyles';
import { useAppDispatch, useMainFilter } from '../hooks/hooks';

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
  padding-left: 0.2rem;
  color: rgba(var(--clr-accent-0));
  font-size: clamp(1.5rem, 3.5vw, 3rem);
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

  @media (min-width: 800px) {
    font-size: clamp(2rem, 3vw, 3rem);
  }
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
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const StyledLinkButton = styled(LinkButton)`
  display: none;
  border: none;

  @media (min-width: 850px) {
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

// main filter

export const StyledMainFilter = styled.div`
`

export default function MainNav() {
//   const dispatch = useAppDispatch();

//   const mainNavRef = useRef(null);
//   const userButtonRef = useRef<HTMLButtonElement | null>(null);


//   // handle toggle of user and nav menu
//   const [openNav, setOpenNav] = useState(false);
//   const [openUser, setOpenUser] = useState(false);
//   const userListRef = useRef<HTMLUListElement | null>(null);
//   const navListRef = useRef<HTMLUListElement | null>(null);
//   const navButtonRef = useRef<HTMLButtonElement | null>(null);


  // select mainfilter
  const [mainFilterSelector, setMainFilterSelector] = useState<string>('all');
  const [mainFilterValue, setMainFilterValue] = useState<string>('null');
  const {
    data: mainfilterData,
    isLoading: mainfilterLoading,
    isError: mainfilterError,
  } = useMainFilter({
    selector: 'project',
  });
  const mainfilterselectorOptions = [
    'Main Filter',
    'project',
    'username',
    'cellbank',
  ];
  

  return (
    <StyledMainFilter>

          {/* main filter - only show if user is logged in */}
          {/* {userProfile?.isAuthenticated && ( */}
            <MainFilterContainer>
              <MainFilterSelector
                value={mainFilterSelector}
                onChange={(e) => setMainFilterSelector(e.target.value)}
              >
                {mainfilterselectorOptions.map((option, i) => (
                  <MainFilterSelectorOption key={i} value={option}>
                    {option}
                  </MainFilterSelectorOption>
                ))}
              </MainFilterSelector>
              {mainfilterData && mainfilterData.length > 0 && (
                <MainFilterSelector
                  value={mainFilterValue}
                  onChange={(e) => setMainFilterValue(e.target.value)}
                >
                  {mainfilterData.map((option, i) => (
                    <MainFilterSelectorOption key={i} value={option}>
                      {option}
                    </MainFilterSelectorOption>
                  ))}
                  ))
                </MainFilterSelector>
              )}
            </MainFilterContainer>
          {/* )} */}

    </StyledMainFilter>
  );
}
