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
import { displayLocalTime, useDeleteRowMutation, useUpdateRowMutation } from '../../lib/hooks';
import {  useTextInputSearch, useUpdateCellbankMutation } from './cellbanks-hooks';
import { useSearchParams } from 'react-router-dom';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { TUpdateCellbankForm, initialEditCellbankForm, updateCellbankSchema } from './cellbanks-types';


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
// id of edited cellbank
const [editingId, setEditingId] = useState<number | null>(null);

// update cellbank 
// const { mutate: submitEditedCellbankForm, isPending: isPendingUpdate } = useUpdateCellbankMutation(setEditedForm);

// update row
const {mutate: submitEditedCellbankForm, isPending: isPendingUpdate} = useUpdateRowMutation({tableName: 'cellbanks', zodSchema: updateCellbankSchema, initialEditForm: initialEditCellbankForm, setEditedForm: setEditedForm, idColumnName: 'cell_bank_id', dateColumnName: 'date_timestamptz'});

// delete row, only for cellbank (archive)
// const {mutate: deleteCellbank, isPending: isPendingDelete, isError, error} = useDeleteCellbankMutation();

// delete cellbank
  const {mutate: deleteCellbank, isPending: isPendingDelete, error} = useDeleteRowMutation({tableName: 'cellbanks'});

  // searching cellbanks table through text input
const [searchedData, setSearchedData] = useState([]);  
const {searchText, setSearchText, SelectSearchField, performInputTextSearch} = useTextInputSearch();



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
        <TableContainer id="CellbanksTableContainer">
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
                <TableHeaderCell>user</TableHeaderCell>
                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {cellbanks.length > 0 &&
                cellbanks?.map((rowData) => (
                  <CellbanksRow
                    key={rowData.cell_bank_id}
                    rowData={rowData}
                    toggleTextTruncation={toggleTextTruncation}
                    editedForm={editedForm}
                    setEditedForm={setEditedForm}
                    setEditingId={setEditingId}
                    editingId={editingId}
                    deleteCellbank={deleteCellbank}
                    isPendingUpdate={isPendingUpdate}
                    isPendingDelete={isPendingDelete}
                    handleAddBookmark={handleAddBookmark}
                  />
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
