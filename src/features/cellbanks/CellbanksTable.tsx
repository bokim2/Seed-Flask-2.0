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
import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';
import styled from 'styled-components';

const TextSearchContainer = styled.div``;

const TextSearchInput = styled.input`
  margin: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 400px;
`;

export default function CellbanksTable({
  cellbanks,
  handleAddBookmark,
  toggleTextTruncation,
}) {
  // search functionality
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get('searchText') || ''
  );

  const [editedForm, setEditedForm] = useState<TEditCellbankForm>(
    InitialEditCellbankForm
  );

  // submit edited cellbank form and then reset form to initial
  const { mutate: submitEditedCellbankForm, isPending } =
    useEditCellbank(setEditedForm);

  const handleSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('isPending in handleSubmit', isPending);
    submitEditedCellbankForm(editedForm);
    console.log('isPending in handleSubmit AFTER', isPending);
  };

  // update in-progress cellbank edit
  const handleClickEdit = (e, cell_bank_id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('e in handleClickEdit', e);
    if (editedForm.cell_bank_id === cell_bank_id) {
      setEditedForm(InitialEditCellbankForm);
    } else {
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
    }
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

  // set search params for selected column for text search
  const handleSelectSearchColumn = (e) => {
    // console.log('e in selectSearchColumn', e);
    e.stopPropagation();
    const columnName = e.target.getAttribute('data-column-name');
    // console.log('columnName', columnName);
    searchParams.set('searchField', columnName);
    setSearchParams(searchParams);
  };

  const handleSetSearchText = async () => {
    if (!searchParams.get('searchField')) {
      searchParams.set('searchField', 'cell_bank_id');
    }
    searchParams.set('searchText', searchText);
    setSearchParams(searchParams);

    const fetchSearchParams = new URLSearchParams(searchParams).toString();
    // console.log('fetchSearchParams', fetchSearchParams);

    const res = await fetch(
      `${baseUrl}/api/cellbank/search?${fetchSearchParams}`
    );
    const data = await res.json();
    console.log('data in handleSetSearchText', data);
  };

  return (
    <>
      {/* Text Search Section */}
      <TextSearchContainer>
        <TextSearchInput
          type="text"
          id="search"
          placeholder="Text Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="button"
          $size={'small'}
          id="searchButton"
          onClick={handleSetSearchText}
        >
          Search
        </Button>
      </TextSearchContainer>

      {/* Table Section */}
      {isPending && <h1>edit is pending...</h1>}
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e, editedForm);
        }}
      >
        <TableContainer id="TableContainer">
          <StyledTable>
            <Caption>Cell Banks Table</Caption>
            <TableHeader>
              <TableRow onClick={handleSelectSearchColumn}>
                <TableHeaderCell data-column-name="cell_bank_id">
                  cell bank id
                </TableHeaderCell>
                <TableHeaderCell data-column-name="strain">
                  strain
                </TableHeaderCell>
                <TableHeaderCell data-column-name="target_molecule">
                  target molecule
                </TableHeaderCell>
                <TableHeaderCell data-column-name="details">
                  details
                </TableHeaderCell>
                <TableHeaderCell data-column-name="notes">
                  notes
                </TableHeaderCell>
                <TableHeaderCell data-column-name="date_timestampz">
                  date
                </TableHeaderCell>
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
                    editing={cellbank.cell_bank_id === editedForm.cell_bank_id}
                    handleAddBookmark={handleAddBookmark}
                    toggleTextTruncation={toggleTextTruncation}
                  />
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
