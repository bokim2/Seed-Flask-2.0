import React, { useState } from 'react';
import { useFlask, useFlasks } from '../../lib/hooks';
import styled from 'styled-components';
import FlasksRow from './FlasksRow';
import {
  Caption,
  StyledTable,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Wrapper,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';

export default function FlasksTable({ flasks }) {
  // console.log('flaks in flaskstable', flasks);
  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  return (
    <>
      <Button onClick={()=>setToggleCellbankData(prev => !prev)}>cellbank data</Button>
      <TableContainer>
        <StyledTable>
          <Caption>Flasks Table</Caption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Flask ID</TableHeaderCell>
              <TableHeaderCell>Cell Bank ID</TableHeaderCell>
              <TableHeaderCell>media</TableHeaderCell>
              <TableHeaderCell>inoculum uL</TableHeaderCell>
              <TableHeaderCell>media mL</TableHeaderCell>
              <TableHeaderCell>temperature C</TableHeaderCell>
              <TableHeaderCell>RPM</TableHeaderCell>
              <TableHeaderCell>Start date/time</TableHeaderCell>
              {toggleCellbankData && (
                <>
                  <TableHeaderCell>strain</TableHeaderCell>
                  <TableHeaderCell>target molecule</TableHeaderCell>
                </>
              )}
            </TableRow>
          </TableHeader>
          <tbody>
            {flasks &&
              flasks?.map((flask) => {
                return (
                  <FlasksRow
                    key={flask.flask_id}
                    flask={flask}
                    toggleCellbankData={toggleCellbankData}
                  />
                );
              })}
          </tbody>
        </StyledTable>
      </TableContainer>
      {/* </Wrapper> */}
    </>
  );
}
