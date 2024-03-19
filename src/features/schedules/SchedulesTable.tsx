import React, { useState } from 'react';
import styled from 'styled-components';
import {
  TCreateFlask,
  createFlaskSchema,
  initialEditFlasksForm,
  updateFlaskSchema,
} from '../flasks/flasks-types';
import {
  Caption,
  StyledForm,
  StyledTable,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Wrapper,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import { initialCreateFlasksForm } from '../flasks/flasks-types';
import {
  useEditTableRowForm,
  useUpdateRowMutation,
} from '../../hooks/table-hooks/useEditTableRowForm';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import PageLimitDropDownSelector from '../../ui/table-ui/PageLimitDropDownSelector';
import {
  transformListStringToArray,
  useAppSelector,
  useFilterSortTableData,
  useSetSortColumn,
} from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { changePageLimit } from '../ui-state/pageSlice';
import SchedulesRow from './SchedulesRow';
import {
  TSchedule,
  TSchedules,
  TSchedulesColumns,
  TUpdateScheduleForm,
  initialCreateSchedulesForm,
  initialEditScheduleForm,
  schedulesTableHeaderCellsArray,
} from './schedules-types';
import TableHeaderCellComponent from '../../ui/table-ui/TableHeaderCellComponent';
import SearchFormRow from '../../ui/SearchFormRow';
import ErrorMessage from '../../ui/ErrorMessage';
import SearchForm from '../../ui/SearchForm';
import { updateScheduleSchema } from '../../../server/zodSchemas';
import { flushSync } from 'react-dom';
// import Scheduler from './add-to-schedule/Scheduler';

export default function SchedulesTable({
  schedules,
  // chartTitle,
  // bookmarkedFlasks,
  // setBookmarkedFlasks,
}) {
  console.log('schedules in schedules table', schedules);
  // const [editingId, setEditingId] = useState<number | null>(null);
  // const [editedForm, setEditedForm] = useState(initialEditScheduleForm);

  // const { mutate: submitEditedScheduleForm, isPending: isPendingUpdate } =
  //   useUpdateRowMutation({
  //     tableName: 'schedules',
  //     zodSchema: updateScheduleSchema,
  //     initialEditForm: initialCreateSchedulesForm,
  //     setEditedForm,
  //     idColumnName: 'schedule_id',
  //     dateColumnName: 'start_date',
  //   });

  // const {
  //   mutate: deleteSchedule,
  //   isPending: isPendingDelete,
  //   error,
  // } = useDeleteRowMutation({ tableName: 'schedule' });

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
  } = useEditTableRowForm<TUpdateScheduleForm>({
    tableName: 'schedules',
    zodSchema: updateScheduleSchema,
    initialEditForm: initialEditScheduleForm,
    idColumnName: 'schedule_id',
    dateColumnName: 'start_date',
  });

  // delete schedule
  const {
    mutate: deleteSchedule,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'schedules' });

  // searched data - searching cellbanks table through text input - the SearchForm component will use setSearchedData to update this state
  const [searchedData, setSearchedData] = useState<TSchedules>([]);

  // filtered and sorted data that will be passed to child components
  const [filteredAndSortedData, setFilteredAndSortedData] =
    useState<TSchedules>([]);

  // sort selected column
  const { sortColumn, handleSortColumn } =
    useSetSortColumn<TSchedulesColumns>();

  // page limit - how many rows to display per fetch  ex: 10, 20, 50
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit: number) => {
    dispatch(changePageLimit(limit));
  };

  // useEffect call to filter and sort data and keep it in sync
  useFilterSortTableData({
    dataName: schedules,
    searchedData,
    sortColumn,
    setFilteredAndSortedData,
  });

  //state for multisearch

  const [searchMultiError, setSearchMultiError] = useState(null);
  console.log(searchMultiError, 'searchMultiError');

  return (
    <>
      {/* Search Section */}
      <SearchForm setSearchedData={setSearchedData} tableName={'schedules'} />

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
          // flushSync(() => {
          //   console.log('INITIAL editedForm', editedForm);
          //   setEditedForm((prev) => {
          //     return {
          //       ...prev,
          //       flask_bookmark: transformListStringToArray(
          //         editedForm.flask_bookmark
          //       ),
          //       current_flasks: transformListStringToArray(
          //         editedForm.current_flasks
          //       ),
          //     };
          //   });
          // });
          console.log('AFTER FLUSHSYNC editedForm', editedForm);
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
        <TableContainer id="SchedulesTableContainer">
          <StyledTable>
            <TableHeader>
              {/* select column to search */}
              <TableRow>
                {schedulesTableHeaderCellsArray.map((headerCell, i) => (
                  <TableHeaderCellComponent
                    key={headerCell}
                    columnName={headerCell}
                    handleSortColumn={handleSortColumn}
                    sortColumn={sortColumn}
                  />
                ))}

                <TableHeaderCell>edit</TableHeaderCell>
              </TableRow>

              {/* <SearchFormRow setSearchedData={setSearchedData} tableName={'schedules'} 
            tableColumnsHeaderCellsArray={schedulesTableHeaderCellsArray}
            setSearchMultiError={setSearchMultiError}
            /> */}
            </TableHeader>
            <tbody>
              {filteredAndSortedData &&
                filteredAndSortedData.length > 0 &&
                filteredAndSortedData?.map((rowData) => (
                  <SchedulesRow
                    key={rowData.schedule_id}
                    rowData={rowData}
                    // toggleTextTruncation={toggleTextTruncation}
                    editedForm={editedForm}
                    setEditedForm={setEditedForm}
                    setEditingId={setEditingId}
                    editingId={editingId}
                    deleteSchedule={deleteSchedule}
                    isPendingUpdate={isPendingUpdate}
                    isPendingDelete={isPendingDelete}
                    // handleAddBookmark={handleAddBookmark}
                  />
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
    </>
  );
}
