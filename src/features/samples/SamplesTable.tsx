import React from 'react'
import { Caption, StyledTable, TableContainer, TableHeader, TableHeaderCell, TableRow, Wrapper } from '../../styles/UtilStyles'
import SamplesRow from './SamplesRow'

export default function SamplesTable({samples}) {
  // console.log('samples in samplestable', samples)
  
  return (
    <Wrapper>
      <TableContainer>
        <StyledTable>
          <Caption>Samples</Caption>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>Sample ID</TableHeaderCell>
        {/* <TableHeaderCell>Cell Bank ID</TableHeaderCell>  */}
        <TableHeaderCell>Flask ID</TableHeaderCell>
        <TableHeaderCell>end date/time</TableHeaderCell>
        <TableHeaderCell>od600</TableHeaderCell>
        <TableHeaderCell>time since inoc hr</TableHeaderCell>
        <TableHeaderCell>completed</TableHeaderCell>
      </TableRow>
        </TableHeader>
          
      <tbody>
        {samples && samples?.map(sample => {
          return <SamplesRow key={sample.sample_id} sample={sample} />
        })}
      </tbody>


        </StyledTable>
      </TableContainer>
    </Wrapper>
  )
}
