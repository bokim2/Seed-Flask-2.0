import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import {
  TableRow,
  TableDataCell,
  StyledForm,
  FormTextArea,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { CellbankMultiInput } from './CellbanksMultiInputForm';
import styled, { css } from 'styled-components';
import { InitialEditCellbankForm, initialForm } from '../../lib/constants';
import { TEditCellbankForm, TTableRow } from '../../lib/types';
import { baseUrl } from '../../../configs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { displayLocalTime } from '../../lib/hooks';

const EditCellbankTextArea = styled(FormTextArea)`
  width: 100%;
  height: auto;
`;

const PreviousDataRow = styled(TableRow)<TTableRow>`
  background-color: ${(props) => props.$editing && 'red'};
  &:nth-of-type(2n) {
    background-color: ${(props) => props.$editing && 'red'};
  }
  &:hover {
    background-color: ${(props) => props.$editing && 'red'};
  }
`;

const EditRow = styled.tr`
  background-color: yellow;
  color: turquoise;
`;

export default function CellbanksRow({
  cellbank,
  editedForm,
  setEditedForm,
  deleteCellbank,
  handleClickEdit,
  editing
}) {
 

  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell data-cell="cell bank id">
          {cellbank.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="strain">{cellbank.strain}</TableDataCell>
        <TableDataCell data-cell="target_molecule">
          {cellbank.target_molecule}
        </TableDataCell>
        <TableDataCell data-cell="description">
          {cellbank.description}
        </TableDataCell>
        <TableDataCell data-cell="notes">{cellbank.notes}</TableDataCell>
        <TableDataCell data-cell="date">
          {displayLocalTime(cellbank?.date_timestamptz)}
        </TableDataCell>
        <TableDataCell
          data-cell="edit"
          onClick={(e) => handleClickEdit(e, cellbank.cell_bank_id)}
        >
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>
        <TableDataCell data-cell="delete">
          <Button
            $size={'small'}
            type="button"
            onClick={() => {
              const isConfirmed = window.confirm(
                'Are you sure you want to delete this item?'
              );
              if (isConfirmed) {
                console.log(
                  'cellbank delete button clicked',
                  cellbank.cell_bank_id
                );
                deleteCellbank.mutate(cellbank.cell_bank_id);
              }
            }}
          >
            delete
          </Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <CellbanksEditForm
          key={cellbank.cell_bank_id}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
        />
      )}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({ setEditedForm, editedForm }) {
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('edit cellbank', e.target.value);
  };

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="cell bank id">
          {editedForm.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="strain">
          <EditCellbankTextArea
            data-cell="strain"
            id="strain"
            name="strain"
            onChange={handleChange}
            placeholder="strain"
            required
            value={editedForm.strain}
          >
            {editedForm.strain}
          </EditCellbankTextArea>
        </TableDataCell>
        <TableDataCell data-cell="target_molecule">
          <EditCellbankTextArea
            data-cell="target_molecule"
            id="target_molecule"
            name="target_molecule"
            onChange={handleChange}
            placeholder="target_molecule"
            required
            value={editedForm.target_molecule}
          >
            {editedForm.target_molecule}
          </EditCellbankTextArea>
        </TableDataCell>

        <TableDataCell>
          <EditCellbankTextArea
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="description"
            required
            value={editedForm.description}
          />
        </TableDataCell>
        <TableDataCell>
          <EditCellbankTextArea
            id="notes"
            name="notes"
            onChange={handleChange}
            placeholder="notes"
            value={editedForm.notes}
            required
          />
        </TableDataCell>
        <TableDataCell>
          <EditCellbankTextArea
            id="human_readable_date"
            name="human_readable_date"
            // placeholder="YYYY-MM-DD HH:MM AM/PM"
            onChange={handleChange}
            required
            value={editedForm.human_readable_date}
          />
        </TableDataCell>

        <TableDataCell>
          <Button
            $size={'small'}
            type="submit"
            // disabled={'isSubmitting EDIT THIS'}
          >
            Update
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
