import {
  TableRow,
  TableDataCell,
  FormTextArea,
  PreviousDataRow,
  EditRow,
  EditTextArea,
} from '../../styles/UtilStyles';
import Button from '../../ui/Button';
import styled, { css } from 'styled-components';
import { TTableRow } from '../../lib/types';
import { displayLocalTime } from '../../hooks/hooks';
import { initialEditFlasksForm } from '../flasks/flasks-types';
import { initialEditScheduleForm } from './schedules-types';
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
}) {
  const {
    schedule_id,
    start_date,
    time_since_inoc_hr,
    notes,
    username,
    flask_bookmark,
    flask_id,
  } = rowData;

  const editing = editingId === schedule_id;
  console.log('schedule row data', rowData);
  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell
          data-cell="schedule id"
          // onClick={() => handleAddBookmark(cell_bank_id)}
        >
          {schedule_id}
        </TableDataCell>

        <TableDataCell data-cell="start date/time">
          {displayLocalTime(start_date)}
        </TableDataCell>

        <TableDataCell data-cell="time since inoc hr">
          {time_since_inoc_hr}
        </TableDataCell>

        <TableDataCell data-cell="notes">{notes}</TableDataCell>

        <TableDataCell data-cell="flask_bookmark">
          {Array.isArray(flask_bookmark) && flask_bookmark?.join(', ')}
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
  console.log('ScheduleeditedForm', editedForm);
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('edit cellbank', e.target.value);
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
            name="start_date"
            onChange={handleChange}
            placeholder="start_date"
            required
            value={displayLocalTime(editedForm?.start_date)}
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
            value={editedForm.time_since_inoc_hr}
          >
            {editedForm.time_since_inoc_hr}
          </EditTextArea>
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
            required
          />
        </TableDataCell>

        <TableDataCell>
          <EditTextArea
            id="flask_id"
            name="flask"
            // placeholder="YYYY-MM-DD HH:MM AM/PM"
            onChange={handleChange}
            required
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
            onClick={() => {
              const isConfirmed = window.confirm(
                'Are you sure you want to delete this item?'
              );
              if (isConfirmed) {
                console.log(
                  'cellbank delete button clicked',
                  editedForm.cell_bank_id
                );
                deleteSchedule(editedForm.cell_bank_id);
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
