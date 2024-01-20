import React from 'react';
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

export default function FlasksTable({ flasks }) {
  console.log('flaks in flaskstable', flasks);

  return (
    <>
      <Wrapper>
        <TableContainer>
          <StyledTable>
            <Caption>Flasks Table</Caption>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Flask ID</TableHeaderCell>
                <TableHeaderCell>Cell Bank ID</TableHeaderCell>
                <TableHeaderCell>strain</TableHeaderCell>
                <TableHeaderCell>target molecule</TableHeaderCell>
                <TableHeaderCell>inoculum uL</TableHeaderCell>
                <TableHeaderCell>media mL</TableHeaderCell>
                <TableHeaderCell>Start date/time</TableHeaderCell>
                <TableHeaderCell>Start date/time (pacific)</TableHeaderCell>
                <TableHeaderCell>
                  Start date/time (pacific -human readable)
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {flasks &&
                flasks?.map((flask) => {
                  return <FlasksRow key={flask.flask_id} flask={flask} />;
                })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Wrapper>
    </>
  );
}
