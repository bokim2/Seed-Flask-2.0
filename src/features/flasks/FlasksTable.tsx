import React from 'react';
import { useFlask, useFlasks } from '../../lib/hooks';
import styled from 'styled-components';
import FlasksRow from './FlasksRow';

const FlaskTable = styled.table`
border: 1px solid red;
`;

const TableHeaders = styled.thead`
color: yellow;
`;


const TableHeaderCell = styled.th`
/* font-size: 0.5rem; */
`;

const TableRow = styled.tr`
/* font-size: .5rem; */
`;



export default function FlasksTable({render}) {
  const [flasks, isLoading] = useFlasks();


  return (
    <>
      <FlaskTable>
        <TableHeaders>
          <TableRow>
            <TableHeaderCell>Flask ID</TableHeaderCell>
            <TableHeaderCell>Cell Bank ID</TableHeaderCell>
            <TableHeaderCell>strain</TableHeaderCell>
            <TableHeaderCell>target molecule</TableHeaderCell>
            <TableHeaderCell>inoculum uL</TableHeaderCell>
            <TableHeaderCell>media mL</TableHeaderCell>
            <TableHeaderCell>Start date/time</TableHeaderCell>
            <TableHeaderCell>Start date/time (pacific)</TableHeaderCell>
            <TableHeaderCell>Start date/time (pacific -human readable)</TableHeaderCell>
          </TableRow>
        </TableHeaders>
        <tbody>
        {flasks?.map(render)
        }
        </tbody>
      </FlaskTable>

      <div style={{ color: 'white' }}>{JSON.stringify(flasks)}</div>
    </>
  );
}
