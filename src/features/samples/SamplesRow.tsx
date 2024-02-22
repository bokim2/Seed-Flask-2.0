import React from 'react';
import {
  EditRow,
  EditTextArea,
  PreviousDataRow,
  TableDataCell,
  TableRow,
} from '../../styles/UtilStyles';
import { displayLocalTime } from '../../hooks/hooks';
import { initialEditSampleForm } from './samples-types';
import { set } from 'date-fns';
import Button from '../../ui/Button';

export default function SamplesRow({
  rowData,
  editedForm,
  setEditedForm,
  setEditingId,
  editingId,
  deleteSample,
  isPendingUpdate,
  isPendingDelete,
}) {
  const {
    sample_id,
    flask_id,
    od600,
    time_since_inoc_hr,
    completed,
    end_date,
    human_readable_date,
  } = rowData;

  const editing = editingId === sample_id;

  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell data-cell="sample id">{sample_id}</TableDataCell>
        <TableDataCell data-cell="flask id">{flask_id}</TableDataCell>
        <TableDataCell data-cell="od600">{od600}</TableDataCell>
        <TableDataCell data-cell="time since inoc hr">
          {time_since_inoc_hr?.toFixed(2)}
        </TableDataCell>
        <TableDataCell data-cell="end date/time">
          {displayLocalTime(end_date)}
        </TableDataCell>
        <TableDataCell data-cell="completed">
          {completed ? 'completed' : 'in-progress'}
        </TableDataCell>
        <TableDataCell data-cell="user">username</TableDataCell>
        <TableDataCell
          data-cell="edit"
          onClick={(e) => {
            e.preventDefault();
            if (editingId === sample_id) {
              setEditingId(null);
              setEditedForm(initialEditSampleForm);
            } else {
              setEditingId(sample_id);
              setEditedForm({
                ...rowData,
                human_readable_date: displayLocalTime(end_date),
              });
              setEditingId(sample_id);
            }
          }}
        >
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <SamplesEditForm
          key={sample_id}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
          isPendingUpdate={isPendingUpdate}
          deleteSample={deleteSample}
          isPendingDelete={isPendingDelete}
        />
      )}
    </>
  );
}

function SamplesEditForm({
  setEditedForm,
  editedForm,
  isPendingUpdate,
  deleteSample,
  isPendingDelete,
}) {
  function handleChange(e) {
    setEditedForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="sample id">
          {editedForm.sample_id}
        </TableDataCell>

        <TableDataCell data-cell="flask id">
          <EditTextArea
            data-cell="flask id"
            name="flask_id"
            onChange={handleChange}
            placeholder="flask id"
            required
            value={editedForm.flask_id}
          ></EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="od600">
          <EditTextArea
            data-cell="od600"
            name="od600"
            onChange={handleChange}
            placeholder="od600"
            required
            value={editedForm.od600}
          ></EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="time since inoc hr">
          {editedForm?.time_since_inoc_hr}
        </TableDataCell>

        <TableDataCell data-cell="end date/time">
          <EditTextArea
            name="human_readable_date"
            onChange={handleChange}
            placeholder="YYYY-MM-DD HH:MM AM/PM"
            required
            value={editedForm.human_readable_date}
          ></EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="completed">
          <select
            id="completed"
            name="completed"
            value={editedForm.completed}
            onChange={handleChange}
          >
            <option value="true">completed</option>
            <option value="false">in-progress</option>
          </select>
        </TableDataCell>

        <TableDataCell>
          <Button type="submit" $size={'small'}>
            Submit
          </Button>
        </TableDataCell>

        <TableDataCell>
          <Button
            type="button"
            $size={'small'}
            onClick={() => {
              deleteSample(editedForm.sample_id);
            }}
          >
            Delete
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
