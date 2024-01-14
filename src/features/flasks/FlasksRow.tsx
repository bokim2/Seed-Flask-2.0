import React from 'react';
import styled from 'styled-components';

const TableRow = styled.tr`
  /* font-size: 0.5rem; */
`;

const TableCell = styled.th`
  color: purple;
`;

export default function FlasksRow({ flask }) {
  return (
    <>
      <TableRow>
        <TableCell>{flask.flask_id}</TableCell>
        <TableCell>{flask.cell_bank_id}</TableCell>
        <TableCell>{flask.strain}</TableCell>
        <TableCell>{flask.target_molecule}</TableCell>
        <TableCell>{flask.inoculum_ul}</TableCell>
        <TableCell>{flask.media_ml}</TableCell>
        <TableCell>{flask.start_date}</TableCell>
        <TableCell>{flask.start_date_pacific}</TableCell>
        <TableCell>{flask.start_date_pacific_readable}</TableCell>
      </TableRow>
    </>
  );
}
