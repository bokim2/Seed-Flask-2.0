// import CellbanksRow from '../../../cellbanks/CellbanksRow';
// import {
//   StyledTable,
//   Caption,
//   TableHeader,
//   TableRow,
//   TableHeaderCell,
//   StyledForm,
//   TableContainer,
// } from '../../../../styles/UtilStyles';
// import { useState } from 'react';
// import {
//   useAppSelector,
//   useFilterSortTableData,
//   useSetSortColumn,
// } from '../../../../hooks/hooks';
// import {

//   TUpdateCellbankForm,
//   cellbanksTableHeaderCellsArray,
// } from '../../../cellbanks/cellbanks-types';
// import ErrorMessage from '../../../../ui/ErrorMessage';
// import { changePageLimit } from '../../../../redux/slices/pageSlice';
// import { useDispatch } from 'react-redux';
// import PageLimitDropDownSelector from '../../../../ui/table-ui/PageLimitDropDownSelector';
// import TableHeaderCellComponent from '../../../../ui/table-ui/TableHeaderCellComponent';
// import SearchForm from '../../../../ui/SearchForm';
// import { useDeleteRowMutation } from '../../../../hooks/table-hooks/useDeleteRowMutation';
// import { useEditTableRowForm } from '../../../../hooks/table-hooks/useEditTableRowForm';
// import SearchFormRow from '../../../../ui/SearchFormRow';
// import { TFlasksColumns, TFlasksInfo, initialEditFlasksForm, updateFlaskSchema, flasksTableHeaderCellsArray } from '../../../flasks/flasks-types';
// import FilteredFlasksRow from './FilteredFlasksRow';


// export type TError = {
//   message: string;
// };
// export default function FilteredChartTable({
//   flasks,
// //   handleAddBookmark,
// //   toggleTextTruncation,
// }) {
//   // console.log('cellbanks in cellbanks table', cellbanks);

//   const {
//     editedForm,
//     setEditedForm,
//     editingId,
//     setEditingId,
//     submitEditedRowForm,
//     isPendingUpdate,
//     updateError,
//     handleEditFormSubmit,
//   } = useEditTableRowForm<TUpdateCellbankForm>({
//     tableName: 'flasks',
//     zodSchema: updateFlaskSchema,
//     initialEditForm: initialEditFlasksForm,
//     idColumnName: 'flask_id',
//     dateColumnName: 'start_date',
//   });

//   // delete cellbank
//   const {
//     mutate: deleteFlask,
//     isPending: isPendingDelete,
//     error: deleteError,
//   } = useDeleteRowMutation({ tableName: 'flasks' });

//   // searched data - searching table through text input - the SearchForm component will use setSearchedData to update this state
//   const [searchedData, setSearchedData] = useState<TFlasksInfo>([]);

//   // filtered and sorted data that will be passed to child components
//   const [filteredAndSortedData, setFilteredAndSortedData] =
//     useState<TFlasksInfo>([]);

//   // sort selected column
//   const { sortColumn, handleSortColumn } =
//     useSetSortColumn<TFlasksColumns>();

//   // page limit - how many rows to display per fetch  ex: 10, 20, 50
//   const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

//   const dispatch = useDispatch();
//   const handleChoosePageLimit = (limit: number) => {
//     dispatch(changePageLimit(limit));
//   };

//   // useEffect call to filter and sort data and keep it in sync
//   useFilterSortTableData({
//     dataName: flasks,
//     searchedData,
//     sortColumn,
//     setFilteredAndSortedData,
//   });

//   //state for multisearch

//   const [searchMultiError, setSearchMultiError] = useState(null);
//   console.log(searchMultiError, 'searchMultiError');
//   return (
//     <>
//     {searchMultiError && <p>{searchMultiError}</p>}
//       {/* Search Section */}
//       <SearchForm setSearchedData={setSearchedData} tableName={'cellbanks'} />

//       {/* Page Limit Section */}
//       <PageLimitDropDownSelector
//         handleChoosePageLimit={handleChoosePageLimit}
//         pageLimitSetting={pageLimitSetting}
//         tableName={'cellbanks'}
//       />

//       {/* loading and error messages */}
//       {isPendingUpdate && <h1>edit is pending Update...</h1>}
//       {isPendingDelete && <h1>edit is pending Delete...</h1>}
//       {updateError?.message && <ErrorMessage error={updateError} />}
//       {deleteError?.message && <ErrorMessage error={deleteError} />}
//       {searchMultiError && <ErrorMessage error={searchMultiError} />}

//       {/* Edit row form */}
//       <StyledForm
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleEditFormSubmit(
//             e,
//             editedForm,
//             submitEditedRowForm,
//             setEditingId
//           );
//         }}
//       >
//         <Caption>Flasks Table</Caption>
//         {/* Table Section */}
//         <TableContainer id="SearchFlasksTableContainer">
//           <StyledTable>
//             <TableHeader>
//               {/* select column to search */}
//               <TableRow>
//                 {flasksTableHeaderCellsArray.map((headerCell, i) => (
//                   <TableHeaderCellComponent
//                     key={headerCell}
//                     columnName={headerCell}
//                     handleSortColumn={handleSortColumn}
//                     sortColumn={sortColumn}
//                   />
//                 ))}

//                 <TableHeaderCell>edit</TableHeaderCell>
//               </TableRow>

//               <SearchFormRow
//                 setSearchedData={setSearchedData}
//                 tablePathName={'flasks'}
//                 tableColumnsHeaderCellsArray={flasksTableHeaderCellsArray}
//                 setSearchMultiError={setSearchMultiError}
//               />
//             </TableHeader>
//             <tbody>
//               {filteredAndSortedData &&
//                 filteredAndSortedData.length > 0 &&
//                 filteredAndSortedData?.map((rowData) => (
//                   <FilteredFlasksRow
//                     key={rowData.cell_bank_id}
//                     rowData={rowData}
//                     // toggleTextTruncation={toggleTextTruncation}
//                     editedForm={editedForm}
//                     setEditedForm={setEditedForm}
//                     setEditingId={setEditingId}
//                     editingId={editingId}
//                     deleteFlask={deleteFlask}
//                     isPendingUpdate={isPendingUpdate}
//                     isPendingDelete={isPendingDelete}
//                     // handleAddBookmark={handleAddBookmark}
//                   />
//                 ))}
//             </tbody>
//           </StyledTable>
//         </TableContainer>
//       </StyledForm>
//     </>
//   );
// }
