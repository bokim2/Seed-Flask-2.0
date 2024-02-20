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
  TCellbanks,
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
import TableHeaderCellComponent from '../../ui/TableHeaderCellComponent';

export default function CellbanksTable({
  cellbanks,
  handleAddBookmark,
  toggleTextTruncation,
  // tableName,
  // refetch
}) {
  // filtered and sorted data that will be passed to child components 
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<TCellbanks>([]);

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
  const [searchedData, setSearchedData] = useState<TCellbanks>([]);
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
    | 'description'
    | 'notes'
    | 'date_timestampz'
    | 'username';
  type TOrder = 'asc' | 'desc' | '';
  type TSortColumn = { [key in TColumn]?: TOrder };
  const [sortColumn, setSortColumn] = useState<TSortColumn>({
    cell_bank_id: '',
  });
  console.log(sortColumn, 'sortColumn');

  const handleSortColumn = (e, columnName) => {
    e.stopPropagation()
    const eTarget = e.target as Element;

    const ascClicked = eTarget.closest('.sort-caret-asc');
    const descClicked = eTarget.closest('.sort-caret-desc');
    console.log(ascClicked, descClicked, 'ascClicked, descClicked');

    if (ascClicked || descClicked) {
      setSortColumn((prev) => {
        if (
          (prev?.[columnName] === 'asc' && ascClicked) ||
          (prev?.[columnName] === 'desc' && descClicked)
        ) {
          return { [columnName]: '' };
        }
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

  // seting table to data (sorted and searched if any)

  function filteredTableData(cellbanks, searchedData, sortColumn) {
    let filteredTableData = [...cellbanks];

    if (searchedData?.length > 0) {
      filteredTableData = searchedData;
    }
    // console.log('Object.values(sortColumn)[0]', Object.values(sortColumn)[0], Object.values(sortColumn))
    if (Object.values(sortColumn)[0]) {
      const sortDirection = Object.values(sortColumn)[0]; // asc or desc
      const sortColumnKey = Object.keys(sortColumn)[0]; // column name
      console.log('sortDirection', sortDirection)

      filteredTableData = [...filteredTableData].sort((a, b) => {
        console.log('a[sortColumnKey], b[sortColumnKey]', a[sortColumnKey], b[sortColumnKey])
        if (sortDirection === 'asc') {
          return a[sortColumnKey]?.localeCompare(b[sortColumnKey]);
        } else {
          return b[sortColumnKey]?.localeCompare(a[sortColumnKey]);
        }
      });
      
    }
    return filteredTableData;
  }

  useEffect(()=> {
    console.log('in useEffect', cellbanks, searchedData, sortColumn)
    const updatedData = filteredTableData(cellbanks, searchedData, sortColumn)
    setFilteredAndSortedData(updatedData)
  }, [cellbanks, searchedData, sortColumn, setFilteredAndSortedData])


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
                  e.stopPropagation();
                  setSearchedData([]);
                  setSearchText('');
                  SelectSearchField(e);
                }}
              >
                <TableHeaderCellComponent
                  columnName="cell_bank_id"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />
                <TableHeaderCellComponent
                  columnName="strain"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />
                <TableHeaderCellComponent
                  columnName="target_molecule"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />
                <TableHeaderCellComponent
                  columnName="project"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />

                <TableHeaderCellComponent
                  columnName="description"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />

                <TableHeaderCellComponent
                  columnName="notes"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />

                <TableHeaderCellComponent
                  columnName="date_timestampz"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />

                <TableHeaderCellComponent
                  columnName="username"
                  searchField={searchField}
                  searchedData={searchedData}
                  handleSortColumn={handleSortColumn}
                  sortColumn={sortColumn}
                />

                {/* <TableHeaderCell
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
                </TableHeaderCell> */}

                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <tbody>
              {filteredAndSortedData?.map(
                (rowData) => (
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
                )
              )}

              {/* {searchedData.length > 0 &&
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
                ))} */}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
