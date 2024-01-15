import React from 'react';
import styled from 'styled-components';
import CellbanksRow from './CellbanksRow';

const StyledCellbanksTable = styled.table`
  /* border: 1px solid green; */
  background-color: #262231;
  border-collapse: collapse;
  width: 100%;
`;

const Wrapper = styled.div``;

const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`;

const Caption = styled.caption``;

const TableHeader = styled.thead`
  background-color: orange;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  color: lime;
  @media (max-width: 600px) {
    display: none;
  }
`;

export default function CellbanksTable({ cellbanks }) {
  console.log(cellbanks, 'in cellbankstable');
  return (
    <Wrapper>
      <TableContainer>
        <StyledCellbanksTable>
          <Caption>Cell Banks Table</Caption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>cell bank id</TableHeaderCell>
              <TableHeaderCell>strain</TableHeaderCell>
              <TableHeaderCell>target molecule</TableHeaderCell>
              <TableHeaderCell>notes</TableHeaderCell>
              <TableHeaderCell>details</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {cellbanks &&
              cellbanks?.map((cellbank) => (
                <CellbanksRow key={cellbank.cell_bank_id} cellbank={cellbank} />
              ))}
          </tbody>
        </StyledCellbanksTable>
      </TableContainer>
    </Wrapper>
  );
}
