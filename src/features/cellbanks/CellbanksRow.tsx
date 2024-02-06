import React, { useEffect, useState } from 'react';
import { TableRow, TableDataCell, FormTextArea } from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import styled, { css } from 'styled-components';
import { TTableRow } from '../../lib/types';
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
  initializeCellbankEdit,
  editing,
  handleAddBookmark,
  toggleTextTruncation,
  isPendingUpdate,
}) {
  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell
          data-cell="cell bank id"
          onClick={() => handleAddBookmark(cellbank.cell_bank_id)}
        >
          {cellbank.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="strain">{cellbank.strain}</TableDataCell>
        <TableDataCell data-cell="target_molecule">
          {cellbank.target_molecule}
        </TableDataCell>
        <TableDataCell
          data-cell="description"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {cellbank.description}
        </TableDataCell>
        <TableDataCell
          data-cell="notes"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {cellbank.notes}
        </TableDataCell>
        <TableDataCell data-cell="date">
          {displayLocalTime(cellbank?.date_timestamptz)}
        </TableDataCell>
        <TableDataCell
          data-cell="edit"
          onClick={(e) => initializeCellbankEdit(e, cellbank.cell_bank_id)}
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
                deleteCellbank(cellbank.cell_bank_id);
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
          isPendingUpdate={isPendingUpdate}
        />
      )}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({ setEditedForm, editedForm, isPendingUpdate }) {
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
          <Button $size={'small'} type="submit" disabled={isPendingUpdate}>
            Update
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
