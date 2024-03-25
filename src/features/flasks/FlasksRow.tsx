import React from 'react';
import {
  EditRow,
  EditTextArea,
  PreviousDataRow,
  TableDataCell,
  TableRow,
} from '../../styles/UtilStyles';
import { displayLocalTime } from '../../hooks/hooks';
import Button from '../../ui/Button';
import { initialCreateFlasksForm } from './flasks-types';

export default function FlasksRow({
  rowData,
  toggleCellbankData,
  editedForm,
  setEditedForm,
  setEditingId,
  editingId,
  deleteFlask,
  isPendingDelete,
  isPendingUpdate,
}) {
  const {
    flask_id,
    cell_bank_id,
    vessel_type,
    media,
    inoculum_ul,
    media_ml,
    temp_c,
    rpm,
    start_date,
    strain,
    target_molecule,
    username,
    user_id,
  } = rowData;
  const editing = editingId === flask_id;

  return (
    <>
      <PreviousDataRow $editing={editing}>
        {/* <TableRow> */}
        <TableDataCell data-cell="Flask ID">{flask_id}</TableDataCell>
        <TableDataCell data-cell="cell bank id">{cell_bank_id}</TableDataCell>
        <TableDataCell data-cell="vessel type">{vessel_type}</TableDataCell>
        <TableDataCell data-cell="media">{media}</TableDataCell>
        <TableDataCell data-cell="media mL">{media_ml}</TableDataCell>
        <TableDataCell data-cell="inoculum uL">{inoculum_ul}</TableDataCell>

        <TableDataCell data-cell="temp c">{temp_c}</TableDataCell>
        <TableDataCell data-cell="rpm">{rpm}</TableDataCell>
        <TableDataCell data-cell="start date (user's timezone)">
          {displayLocalTime(start_date)}
        </TableDataCell>
        <TableDataCell data-cell="user">{username}</TableDataCell>
        <TableDataCell
          data-cell="edit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (editing) {
              setEditingId(null);
              setEditedForm(initialCreateFlasksForm);
            } else {
              setEditingId(flask_id);
              setEditedForm({
                ...rowData,
                human_readable_date: displayLocalTime(start_date),
              });
              setEditingId(flask_id);
            }
          }}
        >
          <Button $size={'small'}>Edit</Button>
        </TableDataCell>

        {toggleCellbankData && (
          <>
            <TableDataCell data-cell="strain">{strain}</TableDataCell>
            <TableDataCell data-cell="target molecule">
              {target_molecule}
            </TableDataCell>
          </>
        )}
        {/* </TableRow> */}
      </PreviousDataRow>

      {editing && (
        <FlasksEditForm
          key={flask_id}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
          // isPendingUpdate={isPendingUpdate}
          deleteFlask={deleteFlask}
          isPendingDelete={isPendingDelete}
        />
      )}
    </>
  );
}

function FlasksEditForm({
  editedForm,
  setEditedForm,
  // isPendingUpdate,
  deleteFlask,
  isPendingDelete,
}) {
  const handleChange = (e) => {
    setEditedForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="flask id">
          {editedForm.flask_id}
        </TableDataCell>

        <TableDataCell data-cell="cell_bank_id">
          <EditTextArea
            
            name="cell_bank_id"
            onChange={handleChange}
            placeholder="cell_bank_id"
            required
            value={editedForm.cell_bank_id}
          >
            {editedForm.cell_bank_id}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="media">
          <EditTextArea
            
            name="media"
            onChange={handleChange}
            placeholder="media"
            required
            value={editedForm.media}
          >
            {editedForm.media}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="inoculum_ul">
          <EditTextArea
            
            name="inoculum_ul"
            onChange={handleChange}
            placeholder="inoculum_ul"
            required
            value={editedForm.inoculum_ul}
          >
            {editedForm.inoculum_ul}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="media_ml">
          <EditTextArea
            
            name="media_ml"
            onChange={handleChange}
            placeholder="media_ml"
            required
            value={editedForm.media_ml}
          >
            {editedForm.media_ml}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="temp_c">
          <EditTextArea
            
            name="temp_c"
            onChange={handleChange}
            placeholder="temp_c"
            required
            value={editedForm.temp_c}
          >
            {editedForm.temp_c}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="rpm">
          <EditTextArea
            
            name="rpm"
            onChange={handleChange}
            placeholder="rpm"
            required
            value={editedForm.rpm}
          >
            {editedForm.rpm}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="human_readable_date">
          <EditTextArea
            
            name="human_readable_date"
            onChange={handleChange}
            placeholder="human_readable_date"
            required
            value={editedForm.human_readable_date}
          >
            {editedForm.human_readable_date}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="update">
          <Button type="submit" $size={'small'}>update</Button>
        </TableDataCell>

        <TableDataCell data-cell="delete">
          <Button
            $size={'small'}
            type="button"
            disabled={isPendingDelete}
            onClick={() => {
              deleteFlask(editedForm.flask_id);
            }}
          >
            Delete
          </Button>
        </TableDataCell>
      </EditRow>
    </>
  );
}
