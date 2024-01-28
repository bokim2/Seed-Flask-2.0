import CellbanksRow from './CellbanksRow';
import {
  TableContainer,
  StyledTable,
  Caption,
  TableHeader,
  TableRow,
  TableHeaderCell,
  Wrapper,
  StyledForm,
} from '../../styles/UtilStyles';
import { useState } from 'react';
import { baseUrl } from '../../../configs';
import { TEditCellbankForm } from '../../lib/types';
import { InitialEditCellbankForm } from '../../lib/constants';

export default function CellbanksTable({ cellbanks }) {
  // console.log(cellbanks, 'in cellbankstable');
  const [editingRowNumber, setEditingRowNumber] = useState<number | null>(null);
  const [updateEditSubmitArgs, setUpdateEditSubmitArgs] = useState<any>(null);
  const [editedForm, setEditedForm] = useState<TEditCellbankForm>(InitialEditCellbankForm);

  async function updateEditSubmit(editedForm) {
    try {
      console.log('cell_bank_id', editedForm.cell_bank_id);
      const { strain, target_molecule, description, notes, date } = editedForm;
      const res = await fetch(`${baseUrl}/api/cellbank/${editedForm.cell_bank_id}`, {
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

      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log('put request sent')
      window.location.reload();
    } catch (error) {
      console.log( 'error in updateEditSubmit');
      console.log('error in updateEditSubmit', error);
    }
  }

  return (
    // <Wrapper>
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log('editedForm in FORM submit', editedForm);
      updateEditSubmit(editedForm)
      setEditingRowNumber(null);
        console.log('submit in FORM submit', e.target);
      }}
    >
      <TableContainer id="TableContainer">
        <StyledTable>
          <Caption>Cell Banks Table</Caption>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>cell bank id</TableHeaderCell>
              <TableHeaderCell>strain</TableHeaderCell>
              <TableHeaderCell>target molecule</TableHeaderCell>
              <TableHeaderCell>details</TableHeaderCell>
              <TableHeaderCell>notes</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
              <TableHeaderCell>edit</TableHeaderCell>
              <TableHeaderCell>delete</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {cellbanks &&
              cellbanks?.map((cellbank, i) => (
                <CellbanksRow
                  key={cellbank.cell_bank_id}
                  cellbank={cellbank}
                  cellbankRow={{ ...cellbanks[i] }}
                  rowNumber={i}
                  editingRowNumber={editingRowNumber}
                  setEditingRowNumber={setEditingRowNumber}
                  editedForm={editedForm}
                  setEditedForm={setEditedForm}
                  
                />
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </StyledForm>
    // </Wrapper>
  );
}
