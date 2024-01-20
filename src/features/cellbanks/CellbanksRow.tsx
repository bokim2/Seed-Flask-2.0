import React from 'react';
// import styled from 'styled-components';
import { TableRow, TableDataCell } from '../../styles/UtilStyles';

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
        <TableDataCell data-cell="description">
          {cellbank.description}
        </TableDataCell>
        <TableDataCell data-cell="notes">{cellbank.notes}</TableDataCell>
        <TableDataCell data-cell="date">
          {cellbank.readable_start_date_pacific}
        </TableDataCell>
      </TableRow>
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}
