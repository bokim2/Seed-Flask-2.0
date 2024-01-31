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
    background-color:${(props) => props.$editing && 'red'};
  }
`;

const EditRow = styled.tr`
  background-color: yellow;
  color: turquoise;
`;

export default function CellbanksRow({
  cellbank,
  cellbankRow,
  rowNumber,
  editingRowNumber,
  setEditingRowNumber,
  editedForm,
  setEditedForm,
  deleteCellbank,
}) {
  const editing = rowNumber === editingRowNumber;
  
  // editedForm = {...editedForm, human_readable_date: (editedForm?.date_timestamptz ?displayLocalTime(editedForm?.date_timestamptz) : null)};

  if(editing) {console.log('editedForm in cellbanksrow', editedForm, 'cellbankRow', cellbankRow);

}

useEffect(()=> {
  if (editing) {
    setEditedForm(prev => ({...prev, human_readable_date: displayLocalTime(prev.date_timestamptz) }));
}},[editing, setEditedForm, editedForm.date_timestamptz])

  // console.log('editingRowNumber in CellbanksRow:', editingRowNumber, 'rowNumber', rowNumber,' rowNumber === editingRowNumber', rowNumber === editingRowNumber);
  const handleClickEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditingRowNumber(prev => {
      if (prev === rowNumber) return null;
      return rowNumber;});
  };
  return (
    <>
      {/* <StyledForm onSubmit={()=> console.log('submit edited')}> */}
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
        <TableDataCell data-cell="edit" onClick={handleClickEdit}>
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
          cellbankRow={cellbankRow}
          rowNumber={rowNumber}
          setEditingRowNumber={setEditingRowNumber}
          editingRowNumber={editingRowNumber}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
        />
      )}
      {/* </StyledForm> */}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({
  cellbankRow,
  rowNumber,
  editingRowNumber,
  setEditingRowNumber,
  setEditedForm,
  editedForm,
}) {
  // const [editedForm, setEditedForm] = useState(InitialEditCellbankForm);
  // const [cellbanks, setCellbanks] = useState<any>([]);

  useEffect(() => {
    // Update form state only if cellbankRow is different from the current form state
    console.log('in useeffect cellbankseditform', cellbankRow, 'cellbankRow', editedForm, 'editedForm')
    if (cellbankRow && cellbankRow !== editedForm) {
      setEditedForm(cellbankRow);
    }
  }, []);

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
            value={editedForm.human_readable_date }
          />
        </TableDataCell>

        <TableDataCell>
          <Button
            $size={'small'}
            type="submit"
            // disabled={'isSubmitting EDIT THIS'}
            // onClick={async (e) => {
            //   // e.preventDefault();
            //   e.stopPropagation();

            //   // console.log(
            //   //   'editForm',
            //   //   editedForm,
            //   //   'editingRowNumber',
            //   //   editingRowNumber
            //   // );
            //   // await updateEditSubmit(editedForm.cell_bank_id, editedForm);
            //   // console.log('in button submit - submit edited');
            //   setEditingRowNumber(null);
            // }}
          >
            Update
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
