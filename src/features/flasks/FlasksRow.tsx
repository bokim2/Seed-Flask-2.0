import React from 'react';
import { displayLocalTime } from '../../hooks/hooks';
import Button from '../../ui/Button';
import { flaskVesselTypes, initialCreateFlasksForm } from './flasks-types';
import { useDispatch } from 'react-redux';
import { toggleCellbankBookmark, toggleFlaskBookmark } from '../../redux/slices/bookmarksSlice';
import { EditRow, EditTextArea, PreviousDataRow, TableDataCell } from '../../styles/table-styles/tableStyles';

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
  // handleAddBookmark,
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
    project,
  } = rowData;
  const editing = editingId === flask_id;

  const dispatch = useDispatch();
  const handleAddFlaskBookmark = (id: number) => {
    dispatch(toggleFlaskBookmark(id));
  };

  const handleAddCellbankBookmark = (id: number) => {
    dispatch(toggleCellbankBookmark(id));
  };

  return (
    <>
      <PreviousDataRow $editing={editing}>
        {/* <TableRow> */}
        <TableDataCell
          data-cell="flask id"
          className="clickableId"
          onClick={() => {
            console.log('+flask_id', +flask_id);
            handleAddFlaskBookmark(+flask_id);
          }}
        >
          {flask_id}
        </TableDataCell>
        <TableDataCell
          data-cell="cell bank id"
          className="clickableId"
          onClick={() => {
            handleAddCellbankBookmark(+cell_bank_id);
          }}
        >
          {cell_bank_id}
        </TableDataCell>
        <TableDataCell data-cell="vessel type">{vessel_type}</TableDataCell>
        <TableDataCell data-cell="media">{media}</TableDataCell>
        <TableDataCell data-cell="media mL">{media_ml}</TableDataCell>
        <TableDataCell data-cell="inoculum uL">{inoculum_ul}</TableDataCell>

        <TableDataCell data-cell="temp c">{temp_c}</TableDataCell>
        <TableDataCell data-cell="rpm">{rpm}</TableDataCell>
        <TableDataCell data-cell="start date" 
        // style={{ whiteSpace: 'nowrap' }}
        >
          {displayLocalTime(start_date)}
        </TableDataCell>
        <TableDataCell data-cell="user">{username}</TableDataCell>

        {/* {toggleCellbankData && (
          <> */}
        <TableDataCell data-cell="strain">{strain}</TableDataCell>
        <TableDataCell data-cell="target molecule">
          {target_molecule}
        </TableDataCell>
        <TableDataCell data-cell="project">{project}</TableDataCell>
        {/* </>
        )} */}

        <TableDataCell
          // data-cell="edit"
          data-cell="none"
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
          <Button $size={'xsmall'}>Edit</Button>
        </TableDataCell>

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

        <TableDataCell data-cell="cell bank id">
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

        <TableDataCell data-cell="vessel_type">
          <select
            id="vessel_type"
            name="vessel_type"
            value={editedForm.vessel_type}
            onChange={handleChange}
          >
            {flaskVesselTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
          <Button type="submit" $size={'small'}>
            update
          </Button>
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
