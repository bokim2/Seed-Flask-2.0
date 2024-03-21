import React, { useState } from 'react';
import styled from 'styled-components';
import FlasksRow from './ChartsRow';
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
import ChartsRow from './ChartsRow';
import { useUpdateRowMutation } from '../../hooks/table-hooks/useEditTableRowForm';
import { useDeleteRowMutation } from '../../hooks/table-hooks/useDeleteRowMutation';
import PageLimitDropDownSelector from '../../ui/table-ui/PageLimitDropDownSelector';
import { useAppSelector } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { changePageLimit } from '../ui-state/pageSlice';
import Scheduler from './add-to-schedule/Scheduler';

export default function ChartsTable({
  flasks,
  chartTitle,
  bookmarkedFlasks,
  setBookmarkedFlasks,
}) {
  // console.log('flaks in charts table', flasks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedForm, setEditedForm] = useState(initialEditFlasksForm);

  const { mutate: submitEditedFlaskForm, isPending: isPendingUpdate } =
    useUpdateRowMutation({
      tableName: 'flasks',
      zodSchema: updateFlaskSchema,
      initialEditForm: initialCreateFlasksForm,
      setEditedForm,
      idColumnName: 'flask_id',
      dateColumnName: 'start_date',
    });

  // const {
  //   mutate: deleteFlask,
  //   isPending: isPendingDelete,
  //   error,
  // } = useDeleteRowMutation({ tableName: 'flasks' });

  const [toggleCellbankData, setToggleCellbankData] = useState(false);

  // const handleEditFormSubmit = (e, editedForm) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   submitEditedFlaskForm(editedForm);
  //   setEditingId(null);
  // };

  // page limit - how many rows to display per fetch  ex: 10, 20, 50
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const dispatch = useDispatch();
  const handleChoosePageLimit = (limit: number) => {
    dispatch(changePageLimit(limit));
  };

  // console.log(
  //   'chartTitle, bookmarkedFlasks, flasks',
  //   chartTitle,
  //   bookmarkedFlasks,
  //   flasks
  // );

  return (
    <>
      <Button onClick={() => setToggleCellbankData((prev) => !prev)}>
        cellbank data
      </Button>

      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          // const formattedEditedForm = {
          //   flask_id: Number(editedForm.flask_id),
          //   cell_bank_id: Number(editedForm.cell_bank_id),
          //   vessel_type: 'flask',
          //   media: String(editedForm.media),
          //   media_ml: Number(editedForm.media_ml),
          //   inoculum_ul: Number(editedForm.inoculum_ul),
          //   temp_c: Number(editedForm.temp_c),
          //   rpm: Number(editedForm.rpm),
          //   // start_date: String(editedForm.start_date),
          //   // human_readable_date: String(editedForm.human_readable_date),
          // };
          // handleEditFormSubmit(e, formattedEditedForm);
          
        }}
      >
        <TableContainer>
          {/* Page Limit Section */}
          <PageLimitDropDownSelector
            handleChoosePageLimit={handleChoosePageLimit}
            pageLimitSetting={pageLimitSetting}
            tableName={'cellbanks'}
          />
          <StyledTable>
            <Caption>{chartTitle}</Caption>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Flask ID</TableHeaderCell>
                <TableHeaderCell>Cell Bank ID</TableHeaderCell>
                <TableHeaderCell>Project</TableHeaderCell>
                <TableHeaderCell>media</TableHeaderCell>
                <TableHeaderCell>inoculum uL</TableHeaderCell>
                <TableHeaderCell>media mL</TableHeaderCell>
                <TableHeaderCell>temperature C</TableHeaderCell>
                <TableHeaderCell>RPM</TableHeaderCell>
                <TableHeaderCell>Start date/time</TableHeaderCell>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>bookmark</TableHeaderCell>

                {toggleCellbankData && (
                  <>
                    <TableHeaderCell>strain</TableHeaderCell>
                    <TableHeaderCell>target molecule</TableHeaderCell>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <tbody>
              {Array.isArray(flasks) &&
                flasks?.map((rowData) => {
                  return (
                    <ChartsRow
                      key={rowData.flask_id}
                      rowData={rowData}
                      bookmarked={bookmarkedFlasks.includes(
                        parseInt(rowData?.flask_id)
                      )}
                      toggleCellbankData={toggleCellbankData}
                      // editedForm={editedForm}
                      // setEditedForm={setEditedForm}
                      // setEditingId={setEditingId}
                      // editingId={editingId}
                      // deleteFlask={deleteFlask}
                      // isPendingDelete={isPendingDelete}
                      bookmarkedFlasks={bookmarkedFlasks}
                      setBookmarkedFlasks={setBookmarkedFlasks}
                    />
                  );
                })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </StyledForm>
      {/* </Wrapper> */}
    </>
  );
}
