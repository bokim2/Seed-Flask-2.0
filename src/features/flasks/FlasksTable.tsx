import React, { useState } from 'react';
import { useDeleteRowMutation, useFlask, useFlasks, useUpdateRowMutation } from '../../lib/hooks';
import styled from 'styled-components';
import FlasksRow from './FlasksRow';
import { TCreateFlask, createFlaskSchema, editFlaskSchema } from './flasks-types';
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

  const { mutate: submitEditedFlaskForm, isPending: isPendingUpdate } = 
  useUpdateRowMutation({
    tableName: 'flasks',
    zodSchema: editFlaskSchema,
    initialEditForm: initialCreateFlasksForm,
    setEditedForm,
    idColumnName: 'flask_id',
    dateColumnName: 'start_date',
  })

  const {
    mutate: deleteFlask,
    isPending: isPendingDelete,
    error,
  } = useDeleteRowMutation({ tableName: 'flasks' });

  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  const handleEditFormSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation()
    submitEditedFlaskForm(editedForm);
    setEditingId(null);
  }
  
  return (
    <>
      <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
        cellbank data
      </Button>

      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleEditFormSubmit(e, editedForm)
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
