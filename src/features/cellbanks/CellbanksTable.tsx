import CellbanksRow from './CellbanksRow';
import {
  TableContainer,
  StyledTable,
  Caption,
  TableHeader,
  TableRow,
  TableHeaderCell,
  StyledForm,
  SearchSection,
} from '../../styles/UtilStyles';
import { useEffect, useState } from 'react';
// import { InitialEditCellbankForm } from '../../lib/constants';
import {
  useAppSelector,
  useDeleteRowMutation,
  useUpdateRowMutation,
} from '../../lib/hooks';
import { useTextInputSearch } from './cellbanks-hooks';
import Button from '../../ui/Button';
import styled from 'styled-components';
import {
  TUpdateCellbankForm,
  initialEditCellbankForm,
  updateCellbankSchema,
} from './cellbanks-types';
import ErrorMessage from '../../ui/ErrorMessage';
import { ButtonsContainer } from './CellbanksMultiInputForm';
import { changePageLimit } from '../ui-state/pageSlice';
import { useDispatch } from 'react-redux';
import PageLimitDropDownSelector from '../../ui/PageLimitDropDownSelector';

const TextSearchContainer = styled.div``;

const TextSearchInput = styled.input`
  margin: 0.5rem;
  border-radius: 5px;
  padding: 0.5rem;
  width: 200px;

  @media (min-width: 600px) {
    width: 400px;
  }
`;

export default function CellbanksTable({
  cellbanks,
  handleAddBookmark,
  toggleTextTruncation,
  // tableName,
  // refetch
}) {
  // console.log('cellbanks in cellbanks table', cellbanks);
  const [editedForm, setEditedForm] = useState<TUpdateCellbankForm>(
    initialEditCellbankForm
  );
  // id of edited cellbank
  const [editingId, setEditingId] = useState<number | null>(null);

  // update cellbank
  // const { mutate: submitEditedCellbankForm, isPending: isPendingUpdate } = useUpdateCellbankMutation(setEditedForm);

  // update row
  const {
    mutate: submitEditedCellbankForm,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateRowMutation({
    tableName: 'cellbanks',
    zodSchema: updateCellbankSchema,
    initialEditForm: initialEditCellbankForm,
    setEditedForm: setEditedForm,
    idColumnName: 'cell_bank_id',
    dateColumnName: 'date_timestamptz',
  });

  // delete row, only for cellbank (archive)
  // const {mutate: deleteCellbank, isPending: isPendingDelete, isError, error} = useDeleteCellbankMutation();

  // delete cellbank
  const {
    mutate: deleteCellbank,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'cellbanks' });

  // searching cellbanks table through text input
  const [searchedData, setSearchedData] = useState<any>([]);
  const {
    searchText,
    setSearchText,
    SelectSearchField,
    performInputTextSearch,
    searchField,
  } = useTextInputSearch();

  const handleEditFormSubmit = (e, editedForm) => {
    e.preventDefault();
    e.stopPropagation();
    submitEditedCellbankForm(editedForm);
    setEditingId(null);
  };

  // page limit
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit) => {
    dispatch(changePageLimit(limit));
    
  };

  return (
    <>
      {/* Text Search Section */}
      <SearchSection>
        <h3>
          Click on column to search:
          <p>
            {` ${
              searchField == 'date_timestampz'
                ? 'date'
                : searchField.replace(/_/g, ' ')
            }`}
          </p>
        </h3>
        <TextSearchContainer>
          <TextSearchInput
            required
            type="text"
            id="search"
            placeholder="Text Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ButtonsContainer>
            <Button
              type="button"
              $size={'small'}
              className="searchButton"
              onClick={async () => {
                try {
                  const data = await performInputTextSearch();
                  setSearchedData(data);
                } catch (err) {
                  console.log('error', err);
                }
              }}
            >
              Search
            </Button>

            <Button
              type="button"
              $size={'small'}
              className="clearSearchButton"
              onClick={() => setSearchedData([])}
            >
              Clear Search
            </Button>
          </ButtonsContainer>
        </TextSearchContainer>
      </SearchSection>

      {/* Page Limit Section */}
      <PageLimitDropDownSelector
        handleChoosePageLimit={handleChoosePageLimit}
        pageLimitSetting={pageLimitSetting}
        // tableName={tableName}
      />

      {/* Table Section */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      {updateError?.message && <ErrorMessage error={updateError} />}
      {deleteError?.message && <ErrorMessage error={deleteError} />}
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
                <TableHeaderCell data-column-name="project">
                  project
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
                <TableHeaderCell data-column-name="username">
                  username
                </TableHeaderCell>

                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {cellbanks.length > 0 &&
                searchedData.length === 0 &&
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

              {searchedData.length > 0 &&
                searchedData?.map((rowData) => (
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
