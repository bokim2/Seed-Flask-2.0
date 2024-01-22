import React from 'react';
// import styled from 'styled-components';
import { TableRow, TableDataCell } from '../../styles/UtilStyles';
import Button from '../../ui/Button';

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
        <TableDataCell data-cell="edit">
          <Button $size={"small"}>Edit</Button>
        </TableDataCell>
        <TableDataCell data-cell="delete">
          <Button $size={"small"}>delete</Button>
        </TableDataCell>
      </TableRow>
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}
