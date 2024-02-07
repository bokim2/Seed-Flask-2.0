import React, { useEffect, useState } from 'react';
import { TableRow, TableDataCell, FormTextArea } from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import styled, { css } from 'styled-components';
import { TTableRow } from '../../lib/types';
import { displayLocalTime } from '../../lib/hooks';
import { initialEditFlasksForm } from '../flasks/flasks-types';

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
  rowData,
  editedForm,
  setEditedForm,
  deleteCellbank,
  handleAddBookmark,
  toggleTextTruncation,
  isPendingUpdate,
  isPendingDelete,
  editingId, setEditingId
}) {
  const { cell_bank_id, target_molecule, strain, description, notes, date_timestamptz } = rowData;
  
  const editing = editingId === rowData.cell_bank_id;
  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell
          data-cell="cell bank id"
          onClick={() => handleAddBookmark(rowData.cell_bank_id)}
        >
          {cell_bank_id}
        </TableDataCell>

        <TableDataCell data-cell="strain">{strain}</TableDataCell>

        <TableDataCell data-cell="target_molecule">
          {target_molecule}
        </TableDataCell>

        <TableDataCell
          data-cell="description"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {description}
        </TableDataCell>

        <TableDataCell
          data-cell="notes"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {notes}
        </TableDataCell>

        <TableDataCell data-cell="date">
          {displayLocalTime(date_timestamptz)}
        </TableDataCell>

        <TableDataCell data-cell="user">username</TableDataCell>

        <TableDataCell
          data-cell="edit"
          // onClick={(e) => initializeCellbankEdit(e, cellbank.cell_bank_id)}
          // onClick={(e)=> initializeRowEdit(e, cellbank.cell_bank_id, "cell_bank_id")}

          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (editing) {
              setEditingId(null);
              setEditedForm(initialEditFlasksForm);
              return;
            } else {
              setEditedForm({
                ...rowData,
                human_readable_date: displayLocalTime(
                  date_timestamptz
                  ),
                });
                setEditingId(cell_bank_id);
            }
          }}
        >
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <CellbanksEditForm
          key={cell_bank_id}
          // rowData={rowData}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
          isPendingUpdate={isPendingUpdate}
          deleteCellbank={deleteCellbank}
          isPendingDelete={isPendingDelete}
        />
      )}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({
  setEditedForm,
  editedForm,
  isPendingUpdate,
  deleteCellbank,
  // rowData,
  isPendingDelete
}) {
  
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

        <TableDataCell data-cell="delete">
          <Button
            $size={'small'}
            type="button"
            disabled={isPendingDelete}
            onClick={() => {
              const isConfirmed = window.confirm(
                'Are you sure you want to delete this item?'
              );
              if (isConfirmed) {
                console.log(
                  'cellbank delete button clicked',
                  editedForm.cell_bank_id
                );
                deleteCellbank(editedForm.cell_bank_id);
              }
            }}
          >
            delete
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
