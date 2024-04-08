import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import styled, { keyframes } from 'styled-components';
import { TTableHeaderCell, TTableRow } from '../lib/types';
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
    animation: ${pulseAnimation} 1s infinite;
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
  margin-top: max(12vh, 5rem);

  justify-content: center;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 10vh;
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
  text-transform: capitalize;
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
    text-transform: capitalize;
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

export const Wrapper = styled.div``;

export const TableContainer = styled.div`
  position: relative;
  /* overflow-x: scroll; */
  /* background-color: lightblue; */
  margin-block: 1rem;
  width: 100%;

  /* overflow */
  /* max-height: 80vh;
  max-width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; */

  @media (min-width: 850px) {
    width: auto;
  }
`;

export const StyledTable = styled.table`
  /* padding-inline: 2rem; */
  /* border-radius: 50px; */
  background-color: rgba(var(--clr-table-100), 1); // #262231
  border-collapse: collapse;
  width: 100%;
  text-align: center;
`;

export const Caption = styled.p`
  position: sticky;
  width: 100%;
  /* display: flex;
  align-items: center; */
  text-align: center;
  z-index: 10;
  top: 10vh;
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: 0.2rem;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  color: var(--clr-text-1);
  /* background-color: #121118; */
  /* background-color: rgba(var(--clr-table-100), 1); */
  background-color: rgba(var(--clr-table-200), 1);
  padding-block: 1vh;
  pointer-events: none;

  @media (min-width: 850px) {
    top: 2vh;
    font-size: 2rem;
    background-color: transparent;
  }
`;

export const TableHeaderDiv = styled.div`
  position: sticky;
  z-index: 10;
  top: 10vh;
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: 0.2rem;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--clr-text-1);
  /* background-color: #121118; */
  /* background-color: rgba(var(--clr-table-100), 1); */
  background-color: rgba(var(--clr-table-200), 1);
  padding-block: 1vh;
  pointer-events: none;

  @media (min-width: 850px) {
    top: 2vh;
    background-color: transparent;
  }
`;

export const MainFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainFilterSelector = styled(Select)`
  font-family: var(--font-serif);
  /* background-color: transparent; */
  border-radius: 15px;
  padding-inline: 1rem;
`;

export const MainFilterSelectorOption = styled.option``;

export const MainFilterValue = styled.select``;

export const TableHeader = styled.thead`
  top: 9.7vh; // reference at NavBar styles
  background-color: black;
  
  @media (min-width: 850px) {
    position: sticky;
    /* top: 0; */
  }
`;

// type TTableHeaderCell = {
//   width?: string;
// };

export const TableHeaderCell = styled.th<TTableHeaderCell>`
  /* display: flex; */

  /* font-family: var(--font-serif); */
  /* background-color: orange; */
  /* line-height: .5; */

  padding: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  /* padding: 1rem 2rem; */
  color: rgba(var(--clr-accent-6), 0.8);

  width: ${(props) => props.width || 'auto'};

  /* font-family: var(--font-serif);
  letter-spacing: 0.09rem;
  font-weight: 800; */

  &:hover,
  &:focus,
  &:active,
  &.dbsearch {
    cursor: pointer;
    color: var(--clr-accent-7);
    transform: scale(1.05);
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }

  &.dbsearchActive {
    cursor: pointer;
    color: var(--clr-accent-7);
    border-bottom: 2px solid var(--clr-accent-7);
    transform: scale(1.05);
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }

  @media (max-width: 850px) {
    /* display: none; */

    display: flex;
width: 100%;

  }
`;

export const TableHeaderCellInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  /* svg {
    visibility: hidden;
  } */

  &:hover svg {
    visibility: visible;
  }
`;

export const TableRow = styled.tr`
  background-color: hsl(0, 0%, 0%, 0.5);
  &:nth-of-type(2n) {
    background-color: hsl(0, 0%, 0%, 0.2);
  }

  &:hover {
    background-color: hsl(0, 0%, 0%, 0);
    /* font-size: 120%; */
    /* transform: scale(1.01); */
  }
`;

export const TableHeaderRow = styled(TableRow)`
  display: none;

  @media (min-width: 850px) {
    display: table-row;
  }
`

export const TableSearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  color: inherit;
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);
  /* margin: 0.5rem; */
  /* border-radius: 5px; */
  /* padding: 0.5rem; */
  /* width: 200px; */

  /* @media (min-width: 850px) { */
    /* padding: 0rem 1rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.7rem;
    &::before {
      content: attr(data-cell) ':  ';
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    } */
  /* } */
`;

export const TableDataCell = styled.td`
display: table-cell;
  text-align: left;
  white-space: normal;
  overflow-wrap: break-word;
  /* max-width: 100%; */
  vertical-align: bottom;

  padding: 0.5rem;
  text-transform: none;
  /* max-width: 20vw; */

  &.ellipsis {
    max-width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 850px) {
    /* display: grid; */
    padding: 0rem 1rem;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: flex-end;
    align-items: flex-end; */
    font-size: 0.7rem;

    &::before {
      content: attr(data-cell) ':  ';
      vertical-align: bottom;
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    }

    /* &[data-cell='none'] {
      button {
        display: none;
      }
    } */

    &.ellipsis {
      display: none;
    }

    /* don't desplay notes or description on mobile */
    /* &[data-cell='notes'], &[data-cell='description'] {
          display: none;
        } */

    &:first-child {
      color: rgba(var(--clr-accent-3), 1);
      font-size: 1rem;
    }
  }
`;

// EDIT FORM STYLES

export const EditTextArea = styled(FormTextArea)`
  /* padding-top: 0rem !important; */
  /* text-align: left; */
  /* width: auto; */
  /* font-size: 1rem;
  height: 2rem;
  height: auto; */
  /* box-sizing: content-box; */
  /* background-color: red; */
  /* vertical-align: bottom; */

  /* &::before {
      background-color: red;
      content: attr(data-cell) ':  ';
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    } */

    /* line-height: .5; */
    width: 100%;
      height: 1.4rem;
  background-color: transparent;
  color: inherit;
  outline: none;
  /* border: none; */
  
  @media (min-width: 850px) {
    text-align: center;
    width: 100%;

  }
`;

export const PreviousDataRow = styled(TableRow)<TTableRow>`
  background-color: ${(props) => props.$editing && 'red'};
  &:nth-of-type(2n) {
    background-color: ${(props) => props.$editing && 'red'};
  }
  &:hover {
    background-color: ${(props) => props.$editing && 'red'};
  }

  /* bookmarked */
  background-color: ${(props) => props.$bookmarked && 'blue'};
  &:nth-of-type(2n) {
    background-color: ${(props) => props.$bookmarked && 'blue'};
  }
  &:hover {
    background-color: ${(props) => props.$bookmarked && 'blue'};
  }
`;

export const EditRow = styled.tr`
  /* background-color: rgba(var(--clr-accent-0), 1); */
  background-color: yellow;
  color: turquoise;
`;

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
  text-transform: capitalize;
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

// chart / graph

export const StyledGraphContainer = styled.div`
  max-height: 60vh;
  height: 50vh;
  max-width: 100%;
  @media (min-width: 850px) {
    padding: 1rem;
    height: 80vh;
  }
`;
