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

const EditCellbankTextArea = styled(FormTextArea)`
  width: 100%;
  height: auto;
`;

const PreviousDataRow = styled.tr<{ $editing?: boolean; }>`
background: ${props => props.$editing ? 'red' : 'transparent'};
`;

const EditRow = styled.tr`
  background-color: yellow;
  color:turquoise;
`;

export default function CellbanksRow({ cellbank, cellbankRow }) {
  const [editing, setEditing] = useState<boolean>(false);

  const handleClickEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditing(!editing);
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

      {editing && <CellbanksEditForm cellbankRow={cellbankRow} />}
      {/* </StyledForm> */}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({ cellbankRow }) {
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

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="cell bank id">
          {editedForm.cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="strain">{editedForm.strain}</TableDataCell>
        <TableDataCell data-cell="target_molecule">
          {editedForm.target_molecule}
        </TableDataCell>
        {/* <TableDataCell>
          <CellbankMultiInput
            type="text"
            id="strain"
            name="strain"
            placeholder="strain (e.g. aspergillus)"
            value={editedForm.target_molecule}
            // onChange={(e) => handleChange(e, i)}
            required
            autoFocus
            // value={bulkForm[i].strain}
          />
        </TableDataCell> */}
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
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   console.log('in button submit - submit edited');
            // }}
          >
            Update
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
