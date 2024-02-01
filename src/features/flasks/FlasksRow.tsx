import React from 'react';
import { TableDataCell, TableRow } from '../../styles/UtilStyles';
import { displayLocalTime } from '../../lib/hooks';

export default function FlasksRow({ flask, toggleCellbankData }) {
  return (
    <>
      <TableRow>
        <TableDataCell data-cell="flask id">{flask.flask_id}</TableDataCell>
        <TableDataCell data-cell="cell bank id">
          {flask.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="start date">{flask.media}</TableDataCell>
        <TableDataCell data-cell="inoculum uL">
          {flask.inoculum_ul}
        </TableDataCell>
        <TableDataCell data-cell="media mL">{flask.media_ml}</TableDataCell>

        <TableDataCell data-cell="strain">{flask.temp_c}</TableDataCell>
        <TableDataCell data-cell="target molecule">{flask.rpm}</TableDataCell>
        <TableDataCell data-cell="start date (user's timezone)">
          {displayLocalTime(flask.start_date)}
        </TableDataCell>

        {toggleCellbankData && (
          <>
            <TableDataCell data-cell="strain">{flask.strain}</TableDataCell>
            <TableDataCell data-cell="target molecule">
              {flask.target_molecule}
            </TableDataCell>
          </>
        )}
      </TableRow>
    </>
  );
}
