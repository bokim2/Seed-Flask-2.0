import React, { useEffect, useMemo, useState } from 'react';
import {

  StyledForm,
} from '../../styles/UtilStyles';
import SamplesRow from './SamplesRow';
import {
  TSamplesColumns,
  TSamplesInfo,
  TUpdateSampleForm,
  initialEditSampleForm,
  samplesTableHeaderCellsArray,
  updateSampleSchema,
} from './samples-types';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import { useEditTableRowForm } from '../../hooks/table-hooks/useEditTableRowForm';
import ErrorMessage from '../../ui/ErrorMessage';
import TableHeaderCellComponent from '../../ui/table-ui/TableHeaderCellComponent';
import {  useAppSelector, useFilteredTableData, useSetSortColumn } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { changePageLimit } from '../../redux/slices/pageSlice';
import Button from '../../ui/Button';
import SearchFormRow from '../../ui/SearchFormRow';
import { Caption, StyledTable, TableContainer, TableHeader, TableHeaderCell, TableHeaderRow } from '../../styles/table-styles/tableStyles';

export default function SamplesTable({ samples }) {
  // console.log('samples in samplestable', samples);

  // update row
  const {
    editedForm,
    setEditedForm,
    editingId,
    setEditingId,
    submitEditedRowForm,
    isPendingUpdate,
    updateError,
    handleEditFormSubmit,
  } = useEditTableRowForm<TUpdateSampleForm>({
    tableName: 'samples',
    zodSchema: updateSampleSchema,
    initialEditForm: initialEditSampleForm,
    idColumnName: 'sample_id',
    dateColumnName: 'end_date',
  });

  // delete a row
  const {
    mutate: deleteSample,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'samples' });



  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  type TPages = { status: string; data: TSamplesInfo };
  type TSearchData = {
    pages: TPages[];
    pageParams: number[];
  };
  // searched data - searching table through text input - the SearchForm component will use setSearchedData to update this state
  const [searchedData, setSearchedData] = useState<TSamplesInfo | null>(null);

  // filtered and sorted data that will be passed to child components
  const [filteredAndSortedData, setFilteredAndSortedData] =
    useState<TSamplesInfo>([]);

  // sort selected column
  const { sortColumn, handleSortColumn } = useSetSortColumn<TSamplesColumns>();

  // page limit - how many rows to display per fetch  ex: 10, 20, 50
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit: number) => {
    dispatch(changePageLimit(limit));
  };

  // useEffect call to filter and sort data and keep it in sync

  useEffect(() => {
    console.log(
      'USEEFFECT IN samplestable searchedData in sample table'
      // searchedData, searchedData?.pages, searchedData?.pages?.length > 0
    );



    if (searchedData && searchedData?.length > 0) {
      // const searchedDataAll =
      //   searchedData?.pages.map((data) => data?.data).flat() || [];

      console.log(
        'USEEFFECT IN sampletable searchDataAll ',
        searchedData,
        searchedData?.map((e) => {
          if (e && e?.flask_id) {
            return Number(e?.flask_id);
          }
        })
      );
      setFilteredAndSortedData(searchedData);

      // dispatch(
      //   setSearchedFlasksList(
      //     searchedData
      //       ?.map((e) => {
      //         if (e && e?.flask_id) {
      //           return Number(e?.flask_id);
      //         }
      //         return undefined;
      //       })
      //       .filter((id): id is number => id !== undefined)
      //   )
      // );
    } else {
      setFilteredAndSortedData(samples);
      // dispatch(clearSearchedFlasksList);
      // console.log('useEffect in dataName table', dataName);
    }
  }, [samples, searchedData]);

  // useEffect(() => {
  //   const filteredData = filteredTableData(
  //     flasks,
  //     filteredAndSortedData,
  //     sortColumn,
  //     'start_date'
  //   );
  //   setData(filteredData);
  //   console.log('data in flasks table', data);
  // }, [flasks, filteredAndSortedData, sortColumn]);

  const data = 
      useFilteredTableData(
        samples,
        filteredAndSortedData,
        sortColumn,
        'end_date'
      )

  //state for multisearch
  const [showSearchRow, setShowSearchRow] = useState(false);
  const [searchMultiError, setSearchMultiError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  console.log(searchMultiError, 'searchMultiError');


  return (
    <>
      {/* loading and error messages */}
      {isPendingUpdate && <h1>edit is pending Update...</h1>}
      {isPendingDelete && <h1>edit is pending Delete...</h1>}
      {updateError?.message && <ErrorMessage error={updateError} />}
      {deleteError?.message && <ErrorMessage error={deleteError} />}

      {/* <Button
        type="button"
        $variation="special"
        onClick={() => setShowSearchRow((prev) => !prev)}
        $size={'xsmall'}
      >
        Search
      </Button> */}

      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();

          console.log('editedForm in samples onsubmit', editedForm);
          handleEditFormSubmit(
            e,
            editedForm,
            submitEditedRowForm,
            setEditingId
          );
        }}
      >
        <TableContainer id="SamplesTableContainer">
            <Caption>Samples</Caption>
          <StyledTable>
            <TableHeader>
              <TableHeaderRow>
                {samplesTableHeaderCellsArray.map((headerCell) => (
                  <TableHeaderCellComponent
                    key={headerCell}
                    columnName={headerCell}
                    handleSortColumn={handleSortColumn}
                    sortColumn={sortColumn}
                  />
                ))}
              <TableHeaderCell>
                  {(
                    <Button
                    type="button"
                    $variation="special"
                    onClick={() => setShowSearchRow((prev) => !prev)}
                    $size={'xsmall'}
                    >
                      Search
                    </Button>
                  )}
                </TableHeaderCell>
                  </TableHeaderRow>

                  { showSearchRow && (
                <SearchFormRow
                  setSearchedData={setSearchedData}
                  tablePathName={'samples'}
                  tableColumnsHeaderCellsArray={samplesTableHeaderCellsArray}
                  setSearchMultiError={setSearchMultiError}
                  setSearchLoading={setSearchLoading}
                />
              )}
            </TableHeader>

            <tbody>
              {data &&
                data?.map((rowData) => {
                  return (
                    <SamplesRow
                      key={rowData.sample_id}
                      rowData={rowData}
                      editedForm={editedForm}
                      setEditedForm={setEditedForm}
                      setEditingId={setEditingId}
                      editingId={editingId}
                      deleteSample={deleteSample}
                      isPendingUpdate={isPendingUpdate}
                      isPendingDelete={isPendingDelete}
                    />
                  );
                })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
