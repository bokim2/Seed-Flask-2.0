import React, { useState } from 'react';
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
import SamplesRow from './SamplesRow';
import {
  TUpdateSampleForm,
  initialEditSampleForm,
  updateSampleSchema,
} from './samples-types';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import {
  useEditTableRowForm,
} from '../../hooks/table-hooks/useEditTableRowForm';
import ErrorMessage from '../../ui/ErrorMessage';

export default function SamplesTable({ samples }) {
  console.log('samples in samplestable', samples);

  // update row
  const {
    editedForm,
    setEditedForm,
    editingId,
    setEditingId,
    submitEditedRowForm,
    isPendingUpdate,
    updateError,
    handleEditFormSubmit,
  } = useEditTableRowForm<TUpdateSampleForm>({
    tableName: 'samples',
    zodSchema: updateSampleSchema,
    initialEditForm: initialEditSampleForm,
    idColumnName: 'sample_id',
    dateColumnName: 'end_date_time',
  });

  // delete a row
  const {
    mutate: deleteSample,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'samples' });

  return (
    <>
      {/* loading and error messages */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      {updateError?.message && <ErrorMessage error={updateError} />}
      {deleteError?.message && <ErrorMessage error={deleteError} />}

      <StyledForm
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
        <TableContainer id="SamplesTableContainer">
          <StyledTable>
            <Caption>Samples</Caption>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Sample ID</TableHeaderCell>
                {/* <TableHeaderCell>Cell Bank ID</TableHeaderCell>  */}
                <TableHeaderCell>Flask ID</TableHeaderCell>
                <TableHeaderCell>od600</TableHeaderCell>
                <TableHeaderCell>time since inoc hr</TableHeaderCell>
                <TableHeaderCell>end date/time</TableHeaderCell>
                <TableHeaderCell>completed</TableHeaderCell>
                <TableHeaderCell>user</TableHeaderCell>
                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <tbody>
              {samples &&
                samples?.map((rowData) => {
                  return (
                    <SamplesRow
                      key={rowData.sample_id}
                      rowData={rowData}
                      editedForm={editedForm}
                      setEditedForm={setEditedForm}
                      setEditingId={setEditingId}
                      editingId={editingId}
                      deleteSample={deleteSample}
                      isPendingUpdate={isPendingUpdate}
                      isPendingDelete={isPendingDelete}
                    />
                  );
                })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
