import CellbanksRow from '../cellbanks/CellbanksRow';
import {

  StyledForm,
  LoaderWrapper,
} from '../../styles/UtilStyles';
import { useEffect, useMemo, useState } from 'react';
import {
  useAppSelector,
  useFilteredTableData,
  useSetSortColumn,
} from '../../hooks/hooks';
import { TUpdateCellbankForm } from '../cellbanks/cellbanks-types';
import ErrorMessage from '../../ui/ErrorMessage';
import { changePageLimit } from '../../redux/slices/pageSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageLimitDropDownSelector from '../../ui/table-ui/PageLimitDropDownSelector';
import TableHeaderCellComponent from '../../ui/table-ui/TableHeaderCellComponent';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import { useEditTableRowForm } from '../../hooks/table-hooks/useEditTableRowForm';
import SearchFormRow from '../../ui/SearchFormRow';
import {
  TFlasksColumns,
  TFlasksInfo,
  initialEditFlasksForm,
  updateFlaskSchema,
  flasksTableHeaderCellsArray,
} from '../flasks/flasks-types';
import FlasksRow from './FlasksRow';
import Button from '../../ui/Button';
import LoaderBar from '../../ui/LoaderBar';
import {
  clearSearchedFlasksList,
  setSearchedFlasksList,
} from '../../redux/slices/bookmarksSlice';
import { RootState } from '../../redux/store';
import { Caption, StyledTable, TableContainer, TableHeader, TableHeaderCell, TableHeaderRow } from '../../styles/table-styles/tableStyles';

export type TError = {
  message: string;
};

type TFlasksTable = {
  flasks: TFlasksInfo;
  flasksListData?: TFlasksInfo;
  handleAddBookmark?: (id: number) => void;
  // setSearchedFlasksList?: (flasks: number[]) => void;
};

export default function FlasksTable({
  flasks,
  flasksListData,
}: // handleAddBookmark,
// setSearchedFlasksList
// handleAddBookmark,
//   toggleTextTruncation,
TFlasksTable) {
  // console.log('cellbanks in cellbanks table', cellbanks);
  // const [data, setData] = useState<TFlasksInfo>(flasks);
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
    tableName: 'flasks',
    zodSchema: updateFlaskSchema,
    initialEditForm: initialEditFlasksForm,
    idColumnName: 'flask_id',
    dateColumnName: 'start_date',
  });

  // delete cellbank
  const {
    mutate: deleteFlask,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteRowMutation({ tableName: 'flasks' });

  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  type TPages = { status: string; data: TFlasksInfo };
  type TSearchData = {
    pages: TPages[];
    pageParams: number[];
  };

  // searched data - searching table through text input - the SearchForm component will use setSearchedData to update this state
  const [searchedData, setSearchedData] = useState<TFlasksInfo | null>(null);

  // filtered and sorted data that will be passed to child components
  // const [filteredAndSortedData, setFilteredAndSortedData] =
  //   useState<TFlasksInfo>([]);

  // sort selected column
  const { sortColumn, handleSortColumn } = useSetSortColumn<TFlasksColumns>();

  // page limit - how many rows to display per fetch  ex: 10, 20, 50
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit: number) => {
    dispatch(changePageLimit(limit));
  };

  // useEffect call to filter and sort data and keep it in sync

  // useEffect(() => {
  //   if (flasksListData && flasksListData?.length > 0) {
  //     setFilteredAndSortedData(flasksListData);
  //     return;
  //   }

  //   if (searchedData && searchedData?.length > 0) {
  //     setFilteredAndSortedData(searchedData);

  //     dispatch(
  //       setSearchedFlasksList(
  //         searchedData
  //           ?.map((e) => {
  //             if (e && e?.flask_id) {
  //               return Number(e?.flask_id);
  //             }
  //             return undefined;
  //           })
  //           .filter((id): id is number => id !== undefined)
  //       )
  //     );
  //   } else {
  //     setFilteredAndSortedData(flasks);
  //   }
  // }, [flasks, searchedData, flasksListData]);

  const filteredAndSortedData = useMemo(() => {
    if (flasksListData && flasksListData?.length > 0) {
      return flasksListData;
    }
    if (searchedData && searchedData?.length > 0) {
      dispatch(
        setSearchedFlasksList(
          searchedData
            ?.map((e) => {
              if (e && e?.flask_id) {
                return Number(e?.flask_id);
              }
              return undefined;
            })
            .filter((id): id is number => id !== undefined)
        )
      );
      return searchedData;
    } else {
      return flasks;
    }
  }, [flasks, searchedData, flasksListData]);

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
        flasks,
        filteredAndSortedData,
        sortColumn,
        'start_date'
      )


  //state for multisearch
  const [showSearchRow, setShowSearchRow] = useState(false);
  const [searchMultiError, setSearchMultiError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  console.log(searchMultiError, 'searchMultiError');
  return (
    <>
      {searchMultiError && <p>{searchMultiError}</p>}
      <LoaderWrapper>{searchLoading && <LoaderBar />}</LoaderWrapper>
      <LoaderWrapper>
        {searchLoading && <p>SEARCH IS LOADING!!!!!</p>}
      </LoaderWrapper>

      <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
        cellbank data
      </Button>
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

      {/* <Button
        type="button"
        onClick={() => setShowSearchRow((prev) => !prev)}
        $size={'small'}
      >
        Open Search
      </Button> */}

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
        {/* Table Section */}
        <TableContainer id="SearchFlasksTableContainer">

          <StyledTable>
          <Caption>Flasks Table</Caption>
            <TableHeader>
              {/* select column to search */}
              <TableHeaderRow>
                {/* {!toggleCellbankData
                  ? flasksTableHeaderCellsArray.map((headerCell, i) => (
                      <TableHeaderCellComponent
                        key={headerCell}
                        columnName={headerCell}
                        handleSortColumn={handleSortColumn}
                        sortColumn={sortColumn}
                      />
                    ))
                  : [
                      ...flasksTableHeaderCellsArray,
                      'strain',
                      'target molecule',
                      'project'
                    ].map((headerCell, i) => (
                      <TableHeaderCellComponent
                        key={headerCell}
                        columnName={headerCell}
                        handleSortColumn={handleSortColumn}
                        sortColumn={sortColumn}
                      />
                    ))} */}

                {flasksTableHeaderCellsArray.map((headerCell, i) => (
                  <TableHeaderCellComponent
                    key={headerCell}
                    columnName={headerCell}
                    handleSortColumn={handleSortColumn}
                    sortColumn={sortColumn}
                  />
                ))}
                <TableHeaderCell>
                  {!flasksListData && (
                    <Button
                      type="button"
                      $variation="special"
                      onClick={() => setShowSearchRow((prev) => !prev)}
                      $size={'xs'}
                    >
                      {!showSearchRow ? 'Search' : 'Close'}
                    </Button>
                  )}
                </TableHeaderCell>
              </TableHeaderRow>

              {!flasksListData && showSearchRow && (
                <SearchFormRow
                  setSearchedData={setSearchedData}
                  tablePathName={'flasks'}
                  tableColumnsHeaderCellsArray={flasksTableHeaderCellsArray}
                  setSearchMultiError={setSearchMultiError}
                  setSearchLoading={setSearchLoading}
                />
              )}
            </TableHeader>
            <tbody>
              {data &&
                data?.length > 0 &&
                data?.map((rowData) => (
                  <FlasksRow
                    key={rowData.flask_id}
                    rowData={rowData}
                    // toggleTextTruncation={toggleTextTruncation}
                    editedForm={editedForm}
                    setEditedForm={setEditedForm}
                    setEditingId={setEditingId}
                    editingId={editingId}
                    deleteFlask={deleteFlask}
                    isPendingUpdate={isPendingUpdate}
                    isPendingDelete={isPendingDelete}
                    toggleCellbankData={toggleCellbankData}
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

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import FlasksRow from './FlasksRow';
// import {
//   TCreateFlask,
//   TUpdateFlaskForm,
//   createFlaskSchema,
//   initialEditFlasksForm,
//   updateFlaskSchema,
// } from './flasks-types';
// import {
//   Caption,
//   StyledForm,
//   StyledTable,
//   TableContainer,
//   TableHeader,
//   TableHeaderCell,
//   TableRow,
// } from '../../styles/UtilStyles';
// import Button from '../../ui/Button';
// import { initialCreateFlasksForm } from './flasks-types';
// import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
// import { useEditTableRowForm, useUpdateRowMutation } from '../../hooks/table-hooks/useEditTableRowForm';
// import ErrorMessage from '../../ui/ErrorMessage';

// export default function FlasksTable({ flasks }) {
//   // console.log('flaks in flaskstable', flasks);
//   // const [editingId, setEditingId] = useState<number | null>(null);
//   // const [editedForm, setEditedForm] = useState(initialEditFlasksForm);

//   // const { mutate: submitEditedFlaskForm, isPending: isPendingUpdate } =
//   //   useUpdateRowMutation({
//   //     tableName: 'flasks',
//   //     zodSchema: editFlaskSchema,
//   //     initialEditForm: initialCreateFlasksForm,
//   //     setEditedForm,
//   //     idColumnName: 'flask_id',
//   //     dateColumnName: 'start_date',
//   //   });
//   // const handleEditFormSubmit = (e, editedForm) => {
//   //   e.preventDefault();
//   //   e.stopPropagation();

//   //   submitEditedFlaskForm(editedForm);
//   //   setEditingId(null);
//   // };

//   const  {
//     editedForm,
//     setEditedForm,
//     editingId,
//     setEditingId,
//     submitEditedRowForm,
//     isPendingUpdate,
//     updateError,
//     handleEditFormSubmit
//   } = useEditTableRowForm<TUpdateFlaskForm>({
//     tableName: 'flasks',
//     zodSchema: updateFlaskSchema,
//     initialEditForm: initialEditFlasksForm,
//     idColumnName: 'flask_id',
//     dateColumnName: 'start_date',
//   });

//   const {
//     mutate: deleteFlask,
//     isPending: isPendingDelete,
//     error: deleteError,
//   } = useDeleteRowMutation({ tableName: 'flasks' });

//   const [toggleCellbankData, setToggleCellbankData] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
//         cellbank data
//       </Button>

//       {/* loading and error messages */}
//       {isPendingUpdate && <h1>edit is pending Update...</h1>}
//       {isPendingDelete && <h1>edit is pending Delete...</h1>}
//       {updateError?.message && <ErrorMessage error={updateError} />}
//       {deleteError?.message && <ErrorMessage error={deleteError} />}

//       <StyledForm
//         // onSubmit={(e) => {
//         //   e.preventDefault();
//         //   const formattedEditedForm = {
//         //     flask_id: Number(editedForm.flask_id),
//         //     cell_bank_id: Number(editedForm.cell_bank_id),
//         //     vessel_type: 'flask',
//         //     media: String(editedForm.media),
//         //     media_ml: Number(editedForm.media_ml),
//         //     inoculum_ul: Number(editedForm.inoculum_ul),
//         //     temp_c: Number(editedForm.temp_c),
//         //     rpm: Number(editedForm.rpm),
//         //     start_date: String(editedForm.start_date),
//         //     human_readable_date: String(editedForm.human_readable_date),
//         //   };
//         //   handleEditFormSubmit(e, formattedEditedForm);
//         // handleEditFormSubmit(
//         //   e,
//         //   editedForm,
//         //   submitEditedRowForm,
//         //   setEditingId
//         // );

//         // }}
//         onSubmit={(e) => {
//           e.preventDefault();
//           console.log('editedForm in flasks onsubmit',editedForm)

//           handleEditFormSubmit(
//             e,
//             editedForm,
//             submitEditedRowForm,
//             setEditingId
//           );
//         }}
//       >
//         <TableContainer>
//           <StyledTable>
//             <Caption>Flasks Table</Caption>
//             <TableHeader>
//               <TableRow>
//                 <TableHeaderCell>Flask ID</TableHeaderCell>
//                 <TableHeaderCell>Cell Bank ID</TableHeaderCell>
//                 <TableHeaderCell>media</TableHeaderCell>
//                 <TableHeaderCell>inoculum uL</TableHeaderCell>
//                 <TableHeaderCell>media mL</TableHeaderCell>
//                 <TableHeaderCell>temperature C</TableHeaderCell>
//                 <TableHeaderCell>RPM</TableHeaderCell>
//                 <TableHeaderCell>Start date/time</TableHeaderCell>
//                 <TableHeaderCell>User</TableHeaderCell>
//                 <TableHeaderCell>Edit</TableHeaderCell>

//                 {toggleCellbankData && (
//                   <>
//                     <TableHeaderCell>strain</TableHeaderCell>
//                     <TableHeaderCell>target molecule</TableHeaderCell>
//                   </>
//                 )}
//               </TableRow>
//             </TableHeader>
//             <tbody>
//               {Array.isArray(flasks) &&
//                 flasks?.map((rowData) => {
//                   return (
//                     <FlasksRow
//                       key={rowData.flask_id}
//                       rowData={rowData}
//                       toggleCellbankData={toggleCellbankData}
//                       editedForm={editedForm}
//                       setEditedForm={setEditedForm}
//                       setEditingId={setEditingId}
//                       editingId={editingId}
//                       deleteFlask={deleteFlask}
//                       isPendingDelete={isPendingDelete}
//                     />
//                   );
//                 })}
//             </tbody>
//           </StyledTable>
//         </TableContainer>
//       </StyledForm>
//       {/* </Wrapper> */}
//     </>
//   );
// }
