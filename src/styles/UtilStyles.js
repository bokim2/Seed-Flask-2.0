import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
`;

// loader styles
export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  margin-top: 10vh;
  width: 100%;
`;

// MAIN MENU STYLES

export const StyledMainMenuButtons = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: clamp(7rem, 60vw, 30rem);
  aspect-ratio: 4.5/1;
  border-radius: clamp(1rem, 2vw, 2rem);
  border: 0.341px solid #000;
  font-size: clamp(1rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: 0.01794rem;
  color: var(--clr-text-2);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    filter: brightness(105%);
  }

  &:active {
    transform: scale(0.98);
    filter: brightness(114%);
    box-shadow: 0 0px 12px rgba(255, 255, 255, 0.75);
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
    color: rgba(var(--clr-accent-6),.8);
  }
  /* &::after {
    content: '';
    position: relative;
    inset: 0;
    height: 1px;
    background-color: red;
  } */
`;

export const FormLabel = styled.label`
  font-weight: 600;
  margin-block: 1rem;
  /* font-family: var(--font-serif); */
  color: #f2d17c;
  /* letter-spacing: .1rem; */
  font-size: 1.75rem;
`;

export const FormInput = styled.input`
  border: 0;
  font-family: inherit;
  font-weight: 400;
  background-color: transparent;
  color: inherit;
  border-bottom: 2px solid #f2d17c;
  /* width: 100%; */

  &::placeholder {
    color: #faf7f0;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(var(--clr-accent-6), .9);
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
  height: 100px; /* Set the initial height */
  width: 100%; /* Make it take up the full width of its container */
  border-bottom: 2px solid #f2d17c;

  &:focus {
    outline: none;
    border-bottom: 2px solid rgba(var(--clr-accent-6));
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
  max-width: 100%;
  /* overflow-x: scroll; */
  /* background-color: lightblue; */
  margin-block: 1rem;
  max-height: 80vh;
  overflow-y: scroll;
`;

export const StyledTable = styled.table`
/* padding-inline: 2rem; */
  background-color: #262231;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
`;




export const Caption = styled.caption`
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: 0.2rem;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--clr-text-1);
  /* background-color: red; */
`;

export const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: black;
`;

export const TableHeaderCell = styled.th`
  /* font-family: var(--font-serif); */
  font-weight: 600;
  font-size: 1.1rem;
  padding-block: 1rem;
  color: rgba(var(--clr-accent-6), .8);
  @media (max-width: 600px) {
    display: none;
  }
`;

export const TableRow = styled.tr`
  background: hsl(0, 0%, 0%, 0.5);
  &:nth-of-type(2n) {
    background: hsl(0, 0%, 0%, 0.1);
  }
`;

export const TableDataCell = styled.td`
  padding: 1rem;

  @media (max-width: 600px) {
    display: grid;
    &::before {
      content: attr(data-cell) ': ';
      font-weight: 700;
      text-transform: capitalize;
      color: yellow;
    }

    /* don't desplay notes or description on mobile */
    /* &[data-cell='notes'], &[data-cell='description'] {
          display: none;
        } */

    &[data-cell='cell bank id'] {
      font-size: 1.5rem;
    }
  }
`;
