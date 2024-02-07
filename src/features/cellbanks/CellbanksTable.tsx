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
import { displayLocalTime, useDeleteRowMutation } from '../../lib/hooks';
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

  // delete row, only for cellbank (archive)
  // const {mutate: deleteCellbank, isPending: isPendingDelete, isError, error} = useDeleteCellbankMutation();

  const {mutate: deleteCellbank, isPending: isPendingDelete, error} = useDeleteRowMutation({tableName: 'cellbanks'});

const [searchedData, setSearchedData] = useState([]);  
const {searchText, setSearchText, SelectSearchField, performInputTextSearch} = useTextInputSearch();

const [editingId, setEditingId] = useState<number | null>(null);

  const handleEditFormSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation();
    submitEditedCellbankForm(editedForm);
    setEditingId(null)
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
                <TableHeaderCell>user/delete</TableHeaderCell>
                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {cellbanks.length > 0 &&
                cellbanks?.map((rowData) => (
                  <CellbanksRow
                    key={rowData.cell_bank_id}
                    rowData={rowData}
                    editedForm={editedForm}
                    setEditedForm={setEditedForm}
                    deleteCellbank={deleteCellbank}
                    handleAddBookmark={handleAddBookmark}
                    toggleTextTruncation={toggleTextTruncation}
                    isPendingUpdate={isPendingUpdate}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    isPendingDelete={isPendingDelete}
                  />
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
