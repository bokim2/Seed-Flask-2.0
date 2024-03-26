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
import { useEffect, useState } from 'react';
import {
  useAppSelector,
  useFilterSortTableData,
  useSetSortColumn,
} from '../../hooks/hooks';
import {
  TCellbanks,
  TCellbanksColumns,
  TUpdateCellbankForm,
  cellbanksTableHeaderCellsArray,
  initialEditCellbankForm,
  updateCellbankSchema,
} from './cellbanks-types';
import ErrorMessage from '../../ui/ErrorMessage';
import { changePageLimit } from '../../redux/slices/pageSlice';
import { useDispatch } from 'react-redux';
import PageLimitDropDownSelector from '../../ui/table-ui/PageLimitDropDownSelector';
import TableHeaderCellComponent from '../../ui/table-ui/TableHeaderCellComponent';
import SearchForm from '../../ui/SearchForm';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import { useEditTableRowForm } from '../../hooks/table-hooks/useEditTableRowForm';
import SearchFormRow from '../../ui/SearchFormRow';
import Button from '../../ui/Button';

export type TError = {
  message: string;
};
export default function CellbanksTable({
  cellbanks,
  handleAddBookmark,
  toggleTextTruncation,
}) {
  // console.log('cellbanks in cellbanks table', cellbanks);

  const {
    editedForm,
    setEditedForm,
    editingId,
    setEditingId,
    submitEditedRowForm,
    isPendingUpdate,
    updateError,
    handleEditFormSubmit,
  } = useEditTableRowForm<TUpdateCellbankForm>({
    tableName: 'cellbanks',
    zodSchema: updateCellbankSchema,
    initialEditForm: initialEditCellbankForm,
    idColumnName: 'cell_bank_id',
    dateColumnName: 'date_timestamptz',
  });  

  // delete cellbank
  const {
    mutate: deleteCellbank,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'cellbanks' });

  // searched data - searching cellbanks table through text input - the SearchForm component will use setSearchedData to update this state
  const [searchedData, setSearchedData] = useState<any>([]);
console.log('searchedData in cellbankstable', searchedData)
  // filtered and sorted data that will be passed to child components
  const [filteredAndSortedData, setFilteredAndSortedData] =
    useState<TCellbanks>([]);

  // sort selected column
  const { sortColumn, handleSortColumn } =
    useSetSortColumn<TCellbanksColumns>();

  // page limit - how many rows to display per fetch  ex: 10, 20, 50
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit: number) => {
    dispatch(changePageLimit(limit));
  };

  // useEffect call to filter and sort data and keep it in sync

  useEffect(() => {
    console.log('USEEFFECT IN CELLBANKSTABLE searchedData in cellbanks table', searchedData)
   if(searchedData?.pages){
    const searchedDataAll = searchedData?.pages.map((data) => data.data).flat() || [];

    console.log('USEEFFECT IN CELLBANKSTABLE searchDataAll in cellbanks table', searchedDataAll)
    setFilteredAndSortedData(searchedDataAll);
   } else {
    setFilteredAndSortedData(cellbanks);
    // console.log('useEffect in dataName table', dataName);
   }
  }, [cellbanks, searchedData]);

  const data = useFilterSortTableData({
    dataName: cellbanks,
    filteredAndSortedData,
    sortColumn,
    setFilteredAndSortedData,
  });

  //state for multisearch
const [showSearchRow, setShowSearchRow] = useState(false);
  const [searchMultiError, setSearchMultiError] = useState(null);
  console.log(searchMultiError, 'searchMultiError');
  return (
    <>
    {searchMultiError && <p>{searchMultiError}</p>}
      {/* Search Section */}
      {/* <SearchForm setSearchedData={setSearchedData} tableName={'cellbanks'} /> */}

      {/* Page Limit Section */}
      <PageLimitDropDownSelector
        handleChoosePageLimit={handleChoosePageLimit}
        pageLimitSetting={pageLimitSetting}
        tableName={'cellbanks'}
      />

      {/* loading and error messages */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      {updateError?.message && <ErrorMessage error={updateError} />}
      {deleteError?.message && <ErrorMessage error={deleteError} />}
      {searchMultiError && <ErrorMessage error={searchMultiError} />}

      {/* Edit row form */}
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleEditFormSubmit(
            e,
            editedForm,
            submitEditedRowForm,
            setEditingId
          );
        }}
      >
        <Caption>Cell Banks Table</Caption>
        {/* Table Section */}
        <TableContainer id="CellbanksTableContainer">
          <StyledTable>
            <TableHeader>
              {/* select column to search */}
              <TableRow>
                {cellbanksTableHeaderCellsArray.map((headerCell, i) => (
                  <TableHeaderCellComponent
                    key={headerCell}
                    columnName={headerCell}
                    handleSortColumn={handleSortColumn}
                    sortColumn={sortColumn}
                  />
                ))}

                <TableHeaderCell><Button type="button" onClick={()=>setShowSearchRow(prev => !prev)} $size={'small'}>Open Search</Button></TableHeaderCell>
              </TableRow>

              {showSearchRow && <SearchFormRow
                setSearchedData={setSearchedData}
                tablePathName={'cellbanks'}
                tableColumnsHeaderCellsArray={cellbanksTableHeaderCellsArray}
                setSearchMultiError={setSearchMultiError}
              />}
            </TableHeader>
            <tbody>
              {filteredAndSortedData &&
                filteredAndSortedData.length > 0 &&
                filteredAndSortedData?.map((rowData) => (
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
