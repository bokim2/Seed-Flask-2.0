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
// import { InitialEditCellbankForm } from '../../lib/constants';
import {
  handleEditFormSubmit,
  useAppSelector,
  useDeleteRowMutation,
  useFilterSortTableData,
  useSetSortColumn,
  useUpdateRowMutation,
} from '../../lib/hooks';
import {
  TCellbanks,
  TCellbanksColumns,
  TUpdateCellbankForm,
  cellbanksTableHeaderCellsArray,
  initialEditCellbankForm,
  updateCellbankSchema,
} from './cellbanks-types';
import ErrorMessage from '../../ui/ErrorMessage';
import { changePageLimit } from '../ui-state/pageSlice';
import { useDispatch } from 'react-redux';
import PageLimitDropDownSelector from '../../ui/table-ui/PageLimitDropDownSelector';
import TableHeaderCellComponent from '../../ui/table-ui/TableHeaderCellComponent';
import SearchForm from '../../ui/SearchForm';

export default function CellbanksTable({
  cellbanks,
  handleAddBookmark,
  toggleTextTruncation,
}) {
  // console.log('cellbanks in cellbanks table', cellbanks);

  // searched data - searching cellbanks table through text input - the SearchForm component will use setSearchedData to update this state
  const [searchedData, setSearchedData] = useState<TCellbanks>([]);

  // filtered and sorted data that will be passed to child components
  const [filteredAndSortedData, setFilteredAndSortedData] =
    useState<TCellbanks>([]);

  // state of edited form
  const [editedForm, setEditedForm] = useState<TUpdateCellbankForm>(
    initialEditCellbankForm
  );
  // id of edited cellbank
  const [editingId, setEditingId] = useState<number | null>(null);

  // update/edit a row
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

  // delete cellbank
  const {
    mutate: deleteCellbank,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'cellbanks' });

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
  useFilterSortTableData({
    cellbanks,
    searchedData,
    sortColumn,
    setFilteredAndSortedData,
  });

  return (
    <>
      {/* Search Section */}
      <SearchForm setSearchedData={setSearchedData} tableName={'cellbanks'} />

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

      {/* Edit row form */}
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleEditFormSubmit(
            e,
            editedForm,
            submitEditedCellbankForm,
            setEditingId
          );
        }}
      >
        {/* Table Section */}
        <TableContainer id="CellbanksTableContainer">
          <StyledTable>
            <Caption>Cell Banks Table</Caption>
            <TableHeader>
              {/* select column to search */}
              <TableRow>
                {cellbanksTableHeaderCellsArray.map((headerCell) => (
                  <TableHeaderCellComponent
                    columnName={headerCell}
                    handleSortColumn={handleSortColumn}
                    sortColumn={sortColumn}
                  />
                ))}
                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>
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
