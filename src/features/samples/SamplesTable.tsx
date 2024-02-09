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
import { useDeleteRowMutation, useUpdateRowMutation } from '../../lib/hooks';

export default function SamplesTable({ samples }) {
  console.log('samples in samplestable', samples);
  const [editedForm, setEditedForm] = useState<TUpdateSampleForm>(
    initialEditSampleForm
  );
  const [editingId, setEditingId] = useState<number | null>(null); // id of edited sample

  // update row
  const { mutate: submitEditedSampleForm, isPending: isPendingUpdate } =
    useUpdateRowMutation({
      tableName: 'samples',
      zodSchema: updateSampleSchema,
      initialEditForm: initialEditSampleForm,
      setEditedForm,
      idColumnName: 'sample_id',
      dateColumnName: 'end_date',
    });

  // delete a row
  const {
    mutate: deleteSample,
    isPending: isPendingDelete,
    error,
  } = useDeleteRowMutation({ tableName: 'samples' });

  const handleEditFormSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation();
    const typedEditedForm = {
      ...editedForm,
      od600: Number(editedForm.od600),
      completed: editedForm.completed === 'true'
    }
    submitEditedSampleForm(typedEditedForm);
    setEditingId(null);
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        handleEditFormSubmit(e, editedForm);
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
                return <SamplesRow 
                key={rowData.sample_id} 
                rowData={rowData}
                editedForm={editedForm}
                setEditedForm={setEditedForm}
                setEditingId={setEditingId}
                editingId={editingId}
                deleteSample={deleteSample}
                isPendingUpdate={isPendingUpdate}
                isPendingDelete={isPendingDelete}
                
                />;
              })}
          </tbody>
        </StyledTable>
      </TableContainer>
    </StyledForm>
  );
}
