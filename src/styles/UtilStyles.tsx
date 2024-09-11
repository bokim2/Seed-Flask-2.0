import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import styled, { keyframes } from 'styled-components';
import { TTableHeaderCell, TTableRow } from '../lib/types';
import { TableRow } from './table-styles/tableStyles';
// wrappers

export const InnerWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  /* height: 70%; */
  /* margin-top: auto; */

  /* justify-content: center; */
  /* align-items: center; */
  /* height: 70%; */

  @media (min-width: 800px) {
    flex-direction: row;
    /* height: revert; */
  }
`;

// a tag buttons
export const LinkButton = styled.a`
  box-sizing: border-box;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  /* margin: 1rem; */
  color: var(--clr-text-1);
  letter-spacing: 0.1rem;
  text-align: center;
  background-color: rgba(var(--clr-accent-5), 0.8);
  text-align: center;
  border: none;
  border-radius: 0.5em;
  /* color: var(--clr-text-1); */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(var(--clr-accent-5), 0.8);
  }

  @media (min-width: 850px) {
    padding: 0.5rem 1rem;
  }
`;

export const LoginButton = styled.button`
  box-sizing: border-box;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  /* margin: 1rem; */
  color: var(--clr-text-1);
  letter-spacing: 0.1rem;
  text-align: center;
  background-color: rgba(var(--clr-accent-5), 0.8);
  text-align: center;
  border: none;
  border-radius: 0.5em;
  /* color: var(--clr-text-1); */
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(var(--clr-accent-5), 0.8);
  }

  @media (min-width: 850px) {
    padding: 0.5rem 1rem;
  }
`;

// Nav

const pulseAnimation = keyframes`
  0%, 100% {
    border-width: 2px;
    border-color: blue;
  }
  25% {
    border-width: 14px;
    border-color: yellow;
  }
  10% { 
    border-width: 10px;
    border-color: red;
  }
`;

export const UserButton = styled.button`
  border-radius: 50%; /* Use 50% for a circular shape */
  aspect-ratio: 1/1;
  padding: 0.3rem; /* Add padding if needed */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &.loggingIn {
    /* border: 4px solid red; */
    animation: ${pulseAnimation} 1s 5;
  }

  @media (min-width: 850px) {
    padding: 0.5rem; /* Add padding if needed */
  }
`;

export const NavMenuButton = styled.button`
  padding: 0;
  background-color: transparent;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const NavSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  gap: 1.5rem;
`;

// Nav List

export const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  background-color: rgba(var(--clr-primary-900), 0.7);
  z-index: 10;
  list-style-type: none;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 2rem;

  &:active {
    color: red;
  }
`;

// Side Menu

// Main page styles

export const PageContainer = styled.section`
  /* margin-top: max(12vh, 5rem); */
  position: relative;
  margin-top: var(--nav-bar-height, 10vh);

  justify-content: center;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &#HomePageContainer {
    min-height: 80%;
  }
`;

export const InnerPageContainer = styled.section`
  width: 90%;
  padding-bottom: 3rem;
  max-width: 1700px;
`;

// loader styles
export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin-top: var(--nav-bar-height, 10vh);
  width: 100%;
  z-index: 100;
`;

// MAIN MENU STYLES

export const StyledMainMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: clamp(15rem, 40vw, 30rem);
  aspect-ratio: 4.5/1;
  border-radius: clamp(1rem, 2vw, 2rem);
  border: 0.341px solid #000;
  font-size: clamp(1.1rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.01794rem;
  color: var(--clr-text-2);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    filter: brightness(105%);
    /* box-shadow: 0 0px 3px rgba(var(--clr-accent-0), 1); */
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(var(--clr-accent-0), 1);
  }

  @media (min-width: 800px) {
    width: clamp(15rem, 30vw, 30rem);
  }
`;

// FORM STYLES

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  /* text-transform: capitalize; */
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 800px) {
  }
`;

export const InputContainer = styled.div`
  font-size: 1.5rem;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  color: white;
  gap: 0.25rem;
  margin-block: 1rem;

  &:focus-within label {
    color: rgba(var(--clr-accent-6), 0.8);
  }
  /* &::after {
    content: '';
    position: relative;
    inset: 0;
    height: 1px;
    background-color: red;
  } */
`;

export const FormTableCell = styled.td`
  display: flex;
  flex-wrap: wrap;

  &::before {
    content: attr(data-cell) ': ';
    font-weight: 700;
    /* text-transform: capitalize; */
    color: rgba(var(--clr-accent-0), 1);
  }

  @media (min-width: 850px) {
    display: table-cell;
  }
`;

export const FormInputCell = styled.td`
  // multi-form td
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  flex-direction: column-reverse;

  textarea:focus + label {
    color: rgba(var(--clr-accent-6), 1);
  }

  @media (min-width: 850px) {
    /* display: table-cell; */
    font-size: 1rem;
  }
`;

export const FormLabel = styled.label`
  font-weight: 600;
  text-transform: none;
  /* margin-block: 2rem; */
  /* font-family: var(--font-serif); */
  color: rgba(var(--clr-accent-0), 1);
  /* letter-spacing: .1rem; */
  font-size: 1rem;

  @media (min-width: 850px) {
    font-size: 1.5rem;
  }
`;

export const MultiFormInput = styled.textarea`
  // input for multi-form
  align-items: center;
  width: 95%;
  border: 0;
  font-family: inherit;
  font-weight: 400;
  background-color: transparent;
  color: inherit;
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);
  padding-top: 1.5rem;
  justify-self: center;
  align-self: center;

  &::placeholder {
    color: rgba(var(--clr-accent-1), 1); // #faf7f0
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(var(--clr-accent-6), 1);
  }

  @media (min-width: 800px) {
    /* width: 40vw; */
    justify-self: initial;
    align-self: initial;
  }
`;

export const FormSelect = styled.select`
  background-color: transparent;
  border: none;
  color: inherit;
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);
  width: 95%;
  padding-top: 0.5rem;
`;

// CellbanksSingleInput form.  NOT used currently
export const SingleFormInput = styled.input`
  border: 0;
  font-family: inherit;
  font-weight: 400;
  background-color: transparent;
  color: inherit;
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);
  /* width: 100%; */

  &::placeholder {
    color: rgba(var(--clr-accent-1), 1); // #faf7f0
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(var(--clr-accent-6), 0.9); //#10e7dc
  }

  @media (min-width: 800px) {
    width: 40vw;
  }
`;

export const FormTextArea = styled.textarea`
  resize: both;
  border: 0;
  font-family: inherit;
  font-weight: 500;
  color: inherit;
  background-color: transparent;
  /* height: 100px; */
  width: 100%; /* Make it take up the full width of its container */
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(var(--clr-accent-6)); // #10e7dc
  }

  @media (min-width: 800px) {
    width: 40vw;
  }
`;

export const FormButton = styled.button``;

// TABLE STYLES

// export const Wrapper = styled.div``;

// export const TableContainer = styled.div`
//   position: relative;
//   margin-block: 1rem;
//   /* width: 100%; */

//   @media (min-width: 850px) {
//     /* width: auto; */
//   }
// `;

// export const StyledTable = styled.table`
//   /* --table-border-radius: 100px;

//   border-radius: var(--table-border-radius); */
//   /* border-spacing: 0;
//   border-collapse: separate; */

//   background-color: rgba(var(--clr-table-100), 1); // #262231
//   border-collapse: collapse;
//   width: 100%;
//   text-align: center;
// `;

// export const Caption = styled.p`
//   position: sticky;
//   width: 100%;
//   text-align: center;
//   z-index: 10;
//   top: 9.8vh;
//   font-family: var(--font-serif);
//   font-weight: 900;
//   letter-spacing: 0.2rem;
//   font-size: 1.4rem;
//   margin-bottom: 2rem;
//   color: var(--clr-text-1);
//   background-color: rgba(var(--clr-table-200), 1);
//   padding-block: 1vh;
//   pointer-events: none;

//   @media (min-width: 850px) {
//     top: 0vh;
//     font-size: 2rem;
//     background-color: transparent;
//   }
// `;

// export const TableHeaderDiv = styled.div`
//   position: sticky;
//   z-index: 10;
//   top: var(--nav-bar-height, 10vh);
//   font-family: var(--font-serif);
//   font-weight: 900;
//   letter-spacing: 0.2rem;
//   /* font-size: 1rem; */
//   margin-bottom: 2rem;
//   color: var(--clr-text-1);

//   padding-block: 1vh;
//   pointer-events: none;

//   @media (min-width: 850px) {
//     top: 2vh;
//   }
// `;

// export const MainFilterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// export const MainFilterSelector = styled(Select)`
//   font-family: var(--font-serif);
//   /* background-color: transparent; */
//   border-radius: 15px;
//   padding-inline: 1rem;
// `;

// export const MainFilterSelectorOption = styled.option``;

// export const MainFilterValue = styled.select``;

// EDIT FORM STYLES

// search section

export const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-block: 1rem;
`;

export const SearchInputPTag = styled.p`
  color: var(--clr-accent-7);
  font-weight: 600;
  font-size: 1.3rem;
  /* text-transform: capitalize; */
`;

export const TextSearchContainer = styled.div``;

export const TextSearchInput = styled.input`
  margin: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 200px;

  @media (min-width: 850px) {
    width: 400px;
  }
`;

export const SearchInputAndButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 100%;

  @media (max-width: 850px) {
    padding: 0rem 1rem;
    display: flex;
    /* flex-wrap: wrap; */
    font-size: 0.7rem;
    /* width: 400px; */
    &::before {
      background-color: red;
      content: attr(data-cell) ':  ';
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    }
  }
`;

// multi-input form

export const BulkInputTextArea = styled.textarea`
  background-color: transparent;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
  margin: 1rem;
`;

export const CreateEntryTable = styled.table`
  /* padding-inline: 2rem; */
  /* border-radius: 50px; */
  background-color: hsl(0, 0%, 0%, 0.8); // #262231
  border-radius: 20px;
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: hsl(0, 0%, 0%, 0.2);
    /* font-size: 120%; */
    /* transform: scale(1.01); */
  }
`;

export const CreateEntryTableRow = styled.tr`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* font-size: 1.5rem; */
  gap: 1rem;
  padding: 1rem;
  border-radius: 20px;

  @media (min-width: 850px) {
    /* display: table-row; */
    flex-direction: row;
  }
`;

export const MultiInputFormBody = styled.tbody``;

export const MultiInputFormCell = styled(FormInputCell)``; // td

export const MultiInput = styled(MultiFormInput)`
  font-size: 1rem;
  padding-top: 0.7rem;
  height: 2.5rem;
  /* background-color: yellow; */
  /* vertical-align: bottom; */

  /* &:focus {

    font-size: 14px;
  } */
`; // input

// buttons container
export const ButtonsContainer = styled.div`
  display: flex;
  margin: 1rem;
  gap: 1rem;
`;

// full screen container - for page < or  > buttons

export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  /* left: 1rem; */
  /* align-items: center; */
  /* height: 100vh; */
  /* width: 100vw; */
  z-index: 9;
  /* background-color: rgba(var(--clr-primary-900), 0.8); */

  &.leftSide {
    left: 0.25rem;
  }
  &.rightSide {
    right: 0.25rem;
  }

  @media (min-width: 850px) {
    /* width: 100vw; */
    &.leftSide {
      left: 0.5rem;
    }
    &.rightSide {
      right: 0.5rem;
    }
  }
`;

// displayed bookmark style <p>

export const StyledBookmarkContainer = styled.div`
  padding: 1rem;
  color: var(--clr-text-2);
  /* background-color: red; */
  @media (min-width: 850px) {
    font-size: 1.5rem;
    padding: 2rem 0.5rem;
  }
`;

export const StyledBookmark = styled.p`
  padding: 0.25rem;

  @media (min-width: 850px) {
    font-size: 1.5rem;
    /* padding: .5rem .5rem; */
  }
`;

// background image entire page

export const StyledBackgroundImg = styled.img`
  position: fixed;
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
