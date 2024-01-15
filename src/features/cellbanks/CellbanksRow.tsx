import React from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`
  background: hsl(0, 0%, 0%, 0.5);
  &:nth-of-type(2n) {
    background: hsl(0, 0%, 0%, 0.1);
  }
`;

const TableDataCell = styled.td`
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

export default function CellbanksRow({ cellbank }) {
  return (
    <>
      <TableRow>
        <TableDataCell data-cell="cell bank id">
          {cellbank.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="strain">{cellbank.strain}</TableDataCell>
        <TableDataCell data-cell="target_molecule">
          {cellbank.target_molecule}
        </TableDataCell>
        <TableDataCell data-cell="notes">{cellbank.notes}</TableDataCell>
        <TableDataCell data-cell="description">
          {cellbank.description}
        </TableDataCell>
        <TableDataCell data-cell="date">
          {cellbank.readable_start_date_pacific}
        </TableDataCell>
      </TableRow>
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}
