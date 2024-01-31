import CellbanksRow from './CellbanksRow';
import {
  TableContainer,
  StyledTable,
  Caption,
  TableHeader,
  TableRow,
  TableHeaderCell,
  StyledForm,
} from '../../styles/UtilStyles';
import { useState } from 'react';
import { baseUrl } from '../../../configs';
import { TEditCellbankForm } from '../../lib/types';
import { InitialEditCellbankForm } from '../../lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { displayLocalTime, useEditCellbank } from '../../lib/hooks';

export default function CellbanksTable({ cellbanks }) {
  const [editedForm, setEditedForm] = useState<TEditCellbankForm>(
    InitialEditCellbankForm
  );

  // console.log(
  //   'cellbanks in cellbankstable',
  //   cellbanks,
  //   'editedForm',
  //   editedForm
  // );

  // edit a cellbank
  const handleClickEdit = (e, cell_bank_id) => {
    e.preventDefault();
    e.stopPropagation();

    setEditedForm(() => {
      const editedCellbankData = cellbanks.find(
        (e) => e.cell_bank_id === cell_bank_id
      );
      return {
        ...editedCellbankData,
        human_readable_date: displayLocalTime(
          editedCellbankData.date_timestamptz
        ),
      };
    });
  };

  // delete a cellbank
  const queryClient = useQueryClient();
  const deleteCellbank = useMutation({
    mutationFn: (cell_bank_id: number) => deleteCellbankHandler(cell_bank_id),
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
      deleteCellbank.reset();
    },
  });

  const deleteCellbankHandler = async (cell_bank_id: number) => {
    return fetch(`${baseUrl}/api/cellbank/${cell_bank_id}`, {
      method: 'DELETE',
    });
  };

  const submitEditedCellbankForm = useEditCellbank();
  const handleSubmit = (editedForm) => {
    submitEditedCellbankForm(editedForm);
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log('editedForm in FORM submit', editedForm);
        handleSubmit(editedForm);
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
              <TableHeaderCell width="15vw">details</TableHeaderCell>
              <TableHeaderCell width="15vw">notes</TableHeaderCell>
              <TableHeaderCell>date</TableHeaderCell>
              <TableHeaderCell>edit</TableHeaderCell>
              <TableHeaderCell>delete</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {cellbanks &&
              cellbanks?.map((cellbank) => (
                <CellbanksRow
                  key={cellbank.cell_bank_id}
                  cellbank={cellbank}
                  editedForm={editedForm}
                  setEditedForm={setEditedForm}
                  deleteCellbank={deleteCellbank}
                  handleClickEdit={handleClickEdit}
                />
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </StyledForm>
    // </Wrapper>
  );
}
