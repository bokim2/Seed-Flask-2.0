import React from 'react'
import { TableDataCell, TableRow } from '../../styles/UtilStyles'

export default function SamplesRow({sample}) {
  return (
    <TableRow>
      <TableDataCell data-cell="sample id">{sample.sample_id}</TableDataCell>
      <TableDataCell data-cell="flask id">{sample.flask_id}</TableDataCell>
      <TableDataCell data-cell="end date/time">{sample.readable_end_date_pacific}</TableDataCell>
      <TableDataCell data-cell="od600">{sample.od600}</TableDataCell>
      <TableDataCell data-cell="time since inoc hr">{sample.time_since_inoc_hr.toFixed(2)}</TableDataCell>
      <TableDataCell data-cell="completed">{sample.completed? 
      "completed" : "in-progress"}</TableDataCell>

    </TableRow>

    
  )
}
