import React from 'react';
import { TableDataCell, TableRow } from '../../styles/UtilStyles';





export default function FlasksRow({ flask }) {
  return (
    <>
      <TableRow>
      <TableDataCell data-cell="flask id">{flask.flask_id}</TableDataCell>
        <TableDataCell data-cell="cell bank id">{flask.cell_bank_id}</TableDataCell>
        <TableDataCell data-cell="strain">{flask.strain}</TableDataCell>
        <TableDataCell data-cell="target molecule">{flask.target_molecule}</TableDataCell>
        <TableDataCell data-cell="inoculum uL">{flask.inoculum_ul}</TableDataCell>
        <TableDataCell data-cell="media mL">{flask.media_ml}</TableDataCell>
        <TableDataCell data-cell="start date">{flask.start_date}</TableDataCell>
        <TableDataCell data-cell="start date (pacific)">{flask.start_date_pacific}</TableDataCell>
        <TableDataCell data-cell="start date (pacific human readable">{flask.start_date_pacific_readable}</TableDataCell>
      </TableRow>
      
    </>
  );
}
