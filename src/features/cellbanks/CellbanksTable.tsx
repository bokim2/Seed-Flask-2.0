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
// import { InitialEditCellbankForm } from '../../lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { displayLocalTime } from '../../lib/hooks';
import { useDeleteCellbankMutation, useTextInputSearch, useUpdateCellbankMutation } from './cellbanks-hooks';
import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { TUpdateCellbankForm, initialEditCellbankForm } from './cellbanks-types';


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

  const [editedForm, setEditedForm] = useState<TUpdateCellbankForm>(
    initialEditCellbankForm
  );

  // update and delete cellbank custom hooks
  const { mutate: submitEditedCellbankForm, isPending: isPendingUpdate } = useUpdateCellbankMutation(setEditedForm);

  const {mutate: deleteCellbank, isPending: isPendingDelete, isError, error} = useDeleteCellbankMutation();

const [searchedData, setSearchedData] = useState([]);  
const {searchText, setSearchText, SelectSearchField, performInputTextSearch} = useTextInputSearch();


  const handleEditFormSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation();
    submitEditedCellbankForm(editedForm);
  };

  // initialize single cellbank update form
  const initializeCellbankEdit = (e, cell_bank_id) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('e in initializeCellbankEdit', e);
    if (editedForm.cell_bank_id === cell_bank_id) {
      setEditedForm(initialEditCellbankForm);
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
          onClick={async()=> {
            try {
              const data = await performInputTextSearch();
              setSearchedData(data);
            } catch (err){
              console.log('error', err);
            }
          }}
        >
          Search
        </Button>
      </TextSearchContainer>

      {/* Table Section */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleEditFormSubmit(e, editedForm);
        }}
      >
        <TableContainer id="TableContainer">
          <StyledTable>
            <Caption>Cell Banks Table</Caption>
            <TableHeader>
              <TableRow onClick={SelectSearchField}>
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
                    initializeCellbankEdit={initializeCellbankEdit}
                    editing={cellbank.cell_bank_id === editedForm.cell_bank_id}
                    handleAddBookmark={handleAddBookmark}
                    toggleTextTruncation={toggleTextTruncation}
                    isPendingUpdate={isPendingUpdate}
                  />
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
