import React, { useState } from 'react';
import { useDeleteRowMutation, useFlask, useFlasks } from '../../lib/hooks';
import styled from 'styled-components';
import FlasksRow from './FlasksRow';
import {
  Caption,
  StyledForm,
  StyledTable,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Wrapper,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { initialCreateFlasksForm } from './flasks-types';

export default function FlasksTable({ flasks }) {
  // console.log('flaks in flaskstable', flasks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedForm, setEditedForm] = useState(initialCreateFlasksForm);

  const {
    mutate: deleteFlask,
    isPending: isPendingDelete,
    error,
  } = useDeleteRowMutation({ tableName: 'flasks' });

  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  return (
    <>
      <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
        cellbank data
      </Button>

      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          // handleEditFormSubmit(editedForm)
        }}
      >
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
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Edit</TableHeaderCell>

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
                flasks?.map((rowData) => {
                  return (
                    <FlasksRow
                      key={rowData.flask_id}
                      rowData={rowData}
                      toggleCellbankData={toggleCellbankData}
                      editedForm={editedForm}
                      setEditedForm={setEditedForm}
                      setEditingId={setEditingId}
                      editingId={editingId}
                      deleteFlask={deleteFlask}
                      isPendingDelete={isPendingDelete}
                    />
                  );
                })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
      {/* </Wrapper> */}
    </>
  );
}
