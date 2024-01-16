import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  @media (min-width: 600px) {
  }

`;

export const InputContainer = styled.div`
  font-size: 1.5rem;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-weight: 600;
`;

export const FormInput = styled.input`
  border: 0;
  font-family: inherit;
  font-weight: 500;

  @media (min-width: 600px) {
    width: 40vw;
  }
`;

export const FormTextArea = styled.textarea`
resize: both;
  border: 0;
  font-family: inherit;
  font-weight: 500;
  color: red;
  
  @media (min-width: 600px) {
    width: 40vw;
  }
`

export const FormButton = styled.button``;


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

export const StyledTable = styled.table`
  background-color: #262231;
  border-collapse: collapse;
  width: 100%;
`;

export const Wrapper = styled.div``;

export const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: scroll;
  background-color: lightblue;
  margin-block: 1rem;
`;

export const Caption = styled.caption`
  font-size: 2rem;
  margin-block: 1rem;
`;

export const TableHeader = styled.thead`
  background-color: orange;
`;

export const TableHeaderCell = styled.th`
  color: lime;
  @media (max-width: 600px) {
    display: none;
  }
`;
