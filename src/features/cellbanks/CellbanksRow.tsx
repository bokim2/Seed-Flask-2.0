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
import { TTableRow } from '../../lib/types';
import { baseUrl } from '../../../configs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const EditCellbankTextArea = styled(FormTextArea)`
  width: 100%;
  height: auto;
`;

const PreviousDataRow = styled(TableRow)<TTableRow>`
  background: ${(props) => (props.$editing && 'red' )};
  &:nth-of-type(2n) {
    background: ${(props) => (props.$editing && 'red')};
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
}) {
  const editing = rowNumber === editingRowNumber;
  // console.log('editingRowNumber in CellbanksRow:', editingRowNumber, 'rowNumber', rowNumber,' rowNumber === editingRowNumber', rowNumber === editingRowNumber); 
  const handleClickEdit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingRowNumber(rowNumber);
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
          {cellbank.readable_start_date_pacific}
        </TableDataCell>
        <TableDataCell data-cell="edit" onClick={handleClickEdit}>
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>
        <TableDataCell data-cell="delete">
          <Button $size={'small'}>delete</Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <CellbanksEditForm
          cellbankRow={cellbankRow}
          rowNumber={rowNumber}
          setEditingRowNumber={setEditingRowNumber}
          editingRowNumber={editingRowNumber}
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
}) {
  const [editedForm, setEditedForm] = useState(InitialEditCellbankForm);
  // const [cellbanks, setCellbanks] = useState<any>([]);

  useEffect(() => {
    if (cellbankRow) {
      setEditedForm(cellbankRow);
    }
  }, [cellbankRow]);

  const handleChange = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('edit cellbank', e.target.value);
  };

// const queryClient = useQueryClient();
// const {isLoading: isUpdating, mutate} = useMutation({
//   mutationFn: updateCellbank,
//   onSuccess: ()=> {
//     queryClient.invalidateQueries({
//       queryKey: [
//         'cellbanks',
//       ]
//     })
//   }
// })



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
            id="date"
            name="date"
            // placeholder="YYYY-MM-DD HH:MM AM/PM"
            onChange={handleChange}
            required
            value={editedForm?.readable_start_date_pacific}
          />
        </TableDataCell>

        <TableDataCell>
          <Button
            $size={'small'}
            type="submit"
            // disabled={'isSubmitting EDIT THIS'}
            onClick={async (e) => {
              // e.preventDefault();
              e.stopPropagation();

              console.log(
                'editForm',
                editedForm,
                'editingRowNumber',
                editingRowNumber
              );
              await updateEditSubmit(editedForm.cell_bank_id, editedForm);
              console.log('in button submit - submit edited');
              setEditingRowNumber(null);
            }}
          >
            Update
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}

async function updateEditSubmit(cell_bank_id, editedForm) {
  try {
    console.log('cell_bank_id', cell_bank_id);
    const { strain, target_molecule, description, notes, date } = editedForm;
    const res = await fetch(`${baseUrl}/api/cellbank/${cell_bank_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strain,
        target_molecule,
        description,
        notes,
        date_timestamptz: '2024-01-20T22:08:00.039Z',
      }),
    });
  } catch (error) {
    console.log(error, 'error in updateEditSubmit');
  }
}

function updateCellbank (){
  
}