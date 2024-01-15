import React from 'react'
import styled from 'styled-components'

const TableRow = styled.tr`
`

export default function CellbanksRow({cellbank}) {
  return (
<>

<TableRow>
    <td>{cellbank.cell_bank_id}</td>
    <td>{cellbank.strain}</td>
    <td>{cellbank.target_molecule}</td>
    <td>{cellbank.notes}</td>
    <td>{cellbank.description}</td>
    <td>{cellbank.readable_start_date_pacific}</td>
    
</TableRow>
</>



    // <div>{JSON.stringify(cellbank)}</div>
  )
}
