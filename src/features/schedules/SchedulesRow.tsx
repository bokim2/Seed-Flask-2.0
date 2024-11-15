
import Button from '../../ui/Button';
import styled, { css } from 'styled-components';
import { TTableRow } from '../../lib/types';
import { addHoursToTimestamp, displayLocalTime } from '../../hooks/hooks';
import { initialEditFlasksForm } from '../flasks/flasks-types';
import { initialEditScheduleForm } from './schedules-types';
import { EditRow, EditTextArea, PreviousDataRow, TableDataCell } from '../../styles/table-styles/tableStyles';
// import { initialEditCellbankForm } from './schedules-types';

export default function SchedulesRow({
  rowData,
  editedForm,
  setEditedForm,
  deleteSchedule,
  // handleAddBookmark,
  // toggleTextTruncation,
  isPendingUpdate,
  isPendingDelete,
  editingId,
  setEditingId,
  selectIdHandler,
}) {
  const {
    schedule_id,
    start_date,
    time_since_inoc_hr,
    notes,
    username,
    flask_bookmark,
    flask_id,
    current_flasks,

  } = rowData;

  const editing = editingId === schedule_id;
  // console.log('schedule row data', rowData);
  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell
          data-cell="schedule id"
          onClick={() => selectIdHandler(schedule_id)}
        >
          {schedule_id}
        </TableDataCell>

        <TableDataCell data-cell="start date/time">
          {displayLocalTime(start_date)}
        </TableDataCell>

        <TableDataCell data-cell="time since inoc hr">
          {time_since_inoc_hr && parseFloat(time_since_inoc_hr).toFixed(2)}
        </TableDataCell>

        <TableDataCell data-cell="sample date/time">
          {displayLocalTime(
            addHoursToTimestamp(start_date, time_since_inoc_hr)
          )}
        </TableDataCell>

        <TableDataCell data-cell="notes">{notes}</TableDataCell>

        <TableDataCell data-cell="flask_bookmark">
          {Array.isArray(flask_bookmark) && flask_bookmark?.join(', ')}
        </TableDataCell>

        <TableDataCell data-cell="current flasks">
          {Array.isArray(current_flasks) && current_flasks?.join(', ')}
        </TableDataCell>

        <TableDataCell data-cell="flask id">{flask_id}</TableDataCell>

        <TableDataCell
          data-cell="username"
          // className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {username}
        </TableDataCell>

        <TableDataCell
          data-cell="edit"
          // onClick={(e) => initializeCellbankEdit(e, cellbank.cell_bank_id)}
          // onClick={(e)=> initializeRowEdit(e, cellbank.cell_bank_id, "cell_bank_id")}

          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (editing) {
              setEditingId(null);
              setEditedForm(initialEditScheduleForm);
              return;
            } else {
              setEditedForm({
                ...rowData,
                human_readable_date: displayLocalTime(start_date),
              });
              setEditingId(schedule_id);
            }
          }}
        >
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <ScheduleEditForm
          key={schedule_id}
          // rowData={rowData}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
          isPendingUpdate={isPendingUpdate}
          deleteSchedule={deleteSchedule}
          isPendingDelete={isPendingDelete}
        />
      )}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function ScheduleEditForm({
  setEditedForm,
  editedForm,
  isPendingUpdate,
  deleteSchedule,
  // rowData,
  isPendingDelete,
}) {
  // console.log('ScheduleeditedForm', editedForm);
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEditedForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log('edit cellbank', e.target.value);
  };

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="schedule id">
          {editedForm.schedule_id}
        </TableDataCell>

        <TableDataCell data-cell="start date">
          <EditTextArea
            data-cell="start_date"
            id="start_date"
            name="human_readable_date"
            onChange={handleChange}
            placeholder="start_date"
            required
            // value={displayLocalTime(editedForm?.start_date)}
            value={editedForm?.human_readable_date}
          >
            {editedForm.start_date}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="time_since_inoc_hr">
          <EditTextArea
            data-cell="time_since_inoc_hr"
            id="time_since_inoc_hr"
            name="time_since_inoc_hr"
            onChange={handleChange}
            placeholder="time_since_inoc_hr"
            required
            value={
              editedForm?.time_since_inoc_hr && editedForm?.time_since_inoc_hr
            }
          >
            {editedForm.time_since_inoc_hr}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="sample date/time">
          {displayLocalTime(
            addHoursToTimestamp(
              editedForm.start_date,
              editedForm.time_since_inoc_hr
            )
          )}
        </TableDataCell>

        <TableDataCell data-cell="notes">
          <EditTextArea
            data-cell="notes"
            id="notes"
            name="notes"
            onChange={handleChange}
            placeholder="notes"
            required
            value={editedForm.notes}
          >
            {editedForm.notes}
          </EditTextArea>
        </TableDataCell>

        {/* <TableDataCell>
          <EditTextArea
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="username"
            required
            value={editedForm.username}
          />
        </TableDataCell> */}

        <TableDataCell>
          <EditTextArea
            id="flask_bookmark"
            name="flask_bookmark"
            onChange={handleChange}
            placeholder="flask_bookmark"
            value={editedForm.flask_bookmark}
            // required
          />
        </TableDataCell>

        <TableDataCell>
          <EditTextArea
            id="current_flasks"
            name="current_flasks"
            onChange={handleChange}
            placeholder="current_flasks"
            value={editedForm.current_flasks}
            // required
          />
        </TableDataCell>

        <TableDataCell>
          <EditTextArea
            id="flask_id"
            name="flask_id"
            // placeholder="YYYY-MM-DD HH:MM AM/PM"
            onChange={handleChange}
            // required
            value={editedForm.flask_id}
          />
        </TableDataCell>

        <TableDataCell>
          <Button $size={'small'} type="submit" disabled={isPendingUpdate}>
            Update
          </Button>
        </TableDataCell>

        <TableDataCell data-cell="delete">
          <Button
            $size={'small'}
            type="button"
            disabled={isPendingDelete}
            onClick={async () => {
              try {
                const isConfirmed = window.confirm(
                  'Are you sure you want to delete this item?'
                );
                if (isConfirmed) {
                  // console.log(
                  //   'cellbank delete button clicked',
                  //   editedForm.cell_bank_id
                  // );
                  // console.log('deleteSchedule', editedForm.schedule_id);
                  await deleteSchedule(editedForm.schedule_id);
                }
              } catch (error) {
                console.error('error in deleteSchedule', error);
                throw error;
              }
            }}
          >
            delete
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
