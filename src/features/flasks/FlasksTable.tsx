import React, { useState } from 'react';
import styled from 'styled-components';
import FlasksRow from './FlasksRow';
import {
  TCreateFlask,
  TUpdateFlaskForm,
  createFlaskSchema,
  initialEditFlasksForm,
  updateFlaskSchema,
} from './flasks-types';
import {
  Caption,
  StyledForm,
  StyledTable,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { initialCreateFlasksForm } from './flasks-types';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import { useEditTableRowForm, useUpdateRowMutation } from '../../hooks/table-hooks/useEditTableRowForm';
import ErrorMessage from '../../ui/ErrorMessage';

export default function FlasksTable({ flasks }) {
  // console.log('flaks in flaskstable', flasks);
  // const [editingId, setEditingId] = useState<number | null>(null);
  // const [editedForm, setEditedForm] = useState(initialEditFlasksForm);

  // const { mutate: submitEditedFlaskForm, isPending: isPendingUpdate } =
  //   useUpdateRowMutation({
  //     tableName: 'flasks',
  //     zodSchema: editFlaskSchema,
  //     initialEditForm: initialCreateFlasksForm,
  //     setEditedForm,
  //     idColumnName: 'flask_id',
  //     dateColumnName: 'start_date',
  //   });
  // const handleEditFormSubmit = (e, editedForm) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   submitEditedFlaskForm(editedForm);
  //   setEditingId(null);
  // };

  const  {
    editedForm,
    setEditedForm,
    editingId,
    setEditingId,
    submitEditedRowForm,
    isPendingUpdate,
    updateError,
    handleEditFormSubmit
  } = useEditTableRowForm<TUpdateFlaskForm>({
    tableName: 'flasks',
    zodSchema: updateFlaskSchema,
    initialEditForm: initialEditFlasksForm,
    idColumnName: 'flask_id',
    dateColumnName: 'start_date',
  });

  const {
    mutate: deleteFlask,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'flasks' });

  const [toggleCellbankData, setToggleCellbankData] = useState(false);


  return (
    <>
      <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
        cellbank data
      </Button>

      {/* loading and error messages */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      {updateError?.message && <ErrorMessage error={updateError} />}
      {deleteError?.message && <ErrorMessage error={deleteError} />}

      <StyledForm
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   const formattedEditedForm = {
        //     flask_id: Number(editedForm.flask_id),
        //     cell_bank_id: Number(editedForm.cell_bank_id),
        //     vessel_type: 'flask',
        //     media: String(editedForm.media),
        //     media_ml: Number(editedForm.media_ml),
        //     inoculum_ul: Number(editedForm.inoculum_ul),
        //     temp_c: Number(editedForm.temp_c),
        //     rpm: Number(editedForm.rpm),
        //     start_date: String(editedForm.start_date),
        //     human_readable_date: String(editedForm.human_readable_date),
        //   };
        //   handleEditFormSubmit(e, formattedEditedForm);
        // }}
        onSubmit={(e) => {
          e.preventDefault();
          handleEditFormSubmit(
            e,
            editedForm,
            submitEditedRowForm,
            setEditingId
          );
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
              {Array.isArray(flasks) &&
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
