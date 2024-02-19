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
  SearchInputPTag,
  TableHeaderCellInnerContainer,
} from '../../styles/UtilStyles';
import { ReactEventHandler, useEffect, useState } from 'react';
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
import SearchTableColumn from '../../ui/SearchTableColumn';
import SortTableColumnsArrows from '../../ui/SortTableColumnsArrows';

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

  // sort a column - client side, only with displayed data
  type TColumn =
    | 'cell_bank_id'
    | 'strain'
    | 'target_molecule'
    | 'project'
    | 'details'
    | 'notes'
    | 'date_timestampz'
    | 'username';
  type TOrder = 'asc' | 'desc' | '';
  type TSortColumn = { [key in TColumn]?: TOrder };
  const [sortColumn, setSortColumn] = useState<TSortColumn>({
    'cell_bank_id': '',
  });
  console.log(sortColumn, 'sortColumn');
  const handleSortColumn = (e, columnName) => {
    const eTarget = e.target as Element;
    if (
      eTarget.closest('.sort-caret-asc') ||
      eTarget.closest('.sort-caret-desc')
    ) {
      setSortColumn((prev) => {
        if(prev?.[columnName]) { return { [columnName]: '' } }
        const columnOrder = eTarget.closest('.sort-caret-asc') ? 'asc' : 'desc';
        return {
          [columnName]: columnOrder,
        };
      });
    }
  };

  // editing a row
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
      {/* Search Section */}
      <SearchTableColumn
        searchText={searchText}
        setSearchText={setSearchText}
        SelectSearchField={SelectSearchField}
        performInputTextSearch={performInputTextSearch}
        searchField={searchField}
        setSearchedData={setSearchedData}
      />

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

      {/* Edit row form */}
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
              {/* select column to search */}
              <TableRow
                onClick={(e) => {
                  // const eTarget = e.target as Element;
                  // if (eTarget.closest('.sort-caret-asc') || eTarget.closest('.sort-caret-desc')) {
                  //   setSortColumn(prev=> {
                  //     const columnName = eTarget.closest('[data-column-name]').value
                  //     const columnOrder = eTarget.closest('.sort-caret-asc') ? 'asc' : 'desc';
                  //     return {
                  //       [columnName]: columnOrder
                  //     }
                  //   })
                  // } else {

                  e.stopPropagation();
                  setSearchedData([]);
                  setSearchText('');
                  SelectSearchField(e);
                  // }
                }}
              >
                <TableHeaderCell
                  data-column-name="cell_bank_id"
                  className={`${
                    searchField == 'cell_bank_id' ? 'dbsearch' : ''
                  } 
                  ${
                    searchField == 'cell_bank_id' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                  onClick={(e) => {
                    handleSortColumn(e, 'cell_bank_id');
                  }}
                >
                  <TableHeaderCellInnerContainer>
                    cell bank id
                    <SortTableColumnsArrows
                      columnName="cell_bank_id"
                      sortColumn={sortColumn}
                    />
                  </TableHeaderCellInnerContainer>
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="strain"
                  className={`${searchField == 'strain' ? 'dbsearch' : ''} 
                  ${
                    searchField == 'strain' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  strain
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="target_molecule"
                  className={`${
                    searchField == 'target_molecule' ? 'dbsearch' : ''
                  } 
                  ${
                    searchField == 'target_molecule' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  target molecule
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="project"
                  className={`${searchField == 'project' ? 'dbsearch' : ''} 
                  ${
                    searchField == 'project' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  project
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="details"
                  className={`${searchField == 'details' ? 'dbsearch' : ''} 
                  ${
                    searchField == 'details' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  details
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="notes"
                  className={`${searchField == 'notes' ? 'dbsearch' : ''} 
                  ${
                    searchField == 'notes' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  notes
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="date_timestampz"
                  className={`${
                    searchField == 'date_timestampz' ? 'dbsearch' : ''
                  } 
                  ${
                    searchField == 'date_timestampz' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
                  date
                </TableHeaderCell>
                <TableHeaderCell
                  data-column-name="username"
                  className={`${searchField == 'username' ? 'dbsearch' : ''} 
                  ${
                    searchField == 'username' &&
                    searchedData?.length > 0 &&
                    'dbsearchActive'
                  }`}
                >
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
