
import Button from '../../ui/Button';
import { displayLocalTime } from '../../hooks/hooks';
import { initialEditCellbankForm } from './cellbanks-types';
import { EditRow, EditTextArea, PreviousDataRow, TableDataCell } from '../../styles/table-styles/tableStyles';

export default function CellbanksRow({
  rowData,
  editedForm,
  setEditedForm,
  deleteCellbank,
  handleAddBookmark,
  toggleTextTruncation,
  isPendingUpdate,
  isPendingDelete,
  editingId,
  setEditingId,
}) {
  const {
    cell_bank_id,
    target_molecule,
    strain,
    description,
    notes,
    date_timestamptz,
    username,
    project,
    human_readable_date,
  } = rowData;

  const editing = editingId === cell_bank_id;
  return (
    <>
      <PreviousDataRow $editing={editing}>
        <TableDataCell
          data-cell="cell bank id"
          className="clickableId"
          onClick={() => handleAddBookmark(cell_bank_id)}
        >
          {cell_bank_id}
        </TableDataCell>

        <TableDataCell data-cell="strain">{strain}</TableDataCell>

        <TableDataCell data-cell="target molecule">
          {target_molecule}
        </TableDataCell>

        <TableDataCell data-cell="project">{project}</TableDataCell>

        <TableDataCell
          data-cell="description"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {description}
        </TableDataCell>

        <TableDataCell
          data-cell="notes"
          className={toggleTextTruncation ? '' : 'ellipsis'}
        >
          {notes}
        </TableDataCell>

        <TableDataCell data-cell="date" style={{whiteSpace: 'nowrap'}}>{human_readable_date || displayLocalTime(date_timestamptz)}</TableDataCell>

        <TableDataCell data-cell="user">{username}</TableDataCell>

        <TableDataCell
          // data-cell="edit"
          data-cell="none"
          // onClick={(e) => initializeCellbankEdit(e, cellbank.cell_bank_id)}
          // onClick={(e)=> initializeRowEdit(e, cellbank.cell_bank_id, "cell_bank_id")}

          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (editing) {
              setEditingId(null);
              setEditedForm(initialEditCellbankForm);
              return;
            } else {
              setEditedForm({
                ...rowData,
                human_readable_date: displayLocalTime(date_timestamptz),
              });
              setEditingId(cell_bank_id);
            }
          }}
        >
          <Button $size={'xsmall'}>Edit</Button>
        </TableDataCell>
      </PreviousDataRow>

      {editing && (
        <CellbanksEditForm
          key={cell_bank_id}
          // rowData={rowData}
          editedForm={editedForm}
          setEditedForm={setEditedForm}
          isPendingUpdate={isPendingUpdate}
          deleteCellbank={deleteCellbank}
          isPendingDelete={isPendingDelete}
        />
      )}
    </>

    // <div>{JSON.stringify(cellbank)}</div>
  );
}

function CellbanksEditForm({
  setEditedForm,
  editedForm,
  isPendingUpdate,
  deleteCellbank,
  // rowData,
  isPendingDelete,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditedForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('edit cellbank', e.target.value);
  };

  return (
    <>
      <EditRow>
        <TableDataCell data-cell="cell bank id">
          {editedForm.cell_bank_id}
        </TableDataCell>

        <TableDataCell data-cell="strain">
          <EditTextArea
            data-cell="strain"
            id="strain"
            name="strain"
            onChange={handleChange}
            placeholder="strain"
            required
            value={editedForm.strain}
          >
            {editedForm.strain}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="target_molecule">
          <EditTextArea
            data-cell="target molecule"
            id="target_molecule"
            name="target_molecule"
            onChange={handleChange}
            placeholder="target_molecule"
            required
            value={editedForm.target_molecule}
          >
            {editedForm.target_molecule}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="project">
          <EditTextArea
            data-cell="project"
            id="project"
            name="project"
            onChange={handleChange}
            placeholder="project"
            required
            value={editedForm.project}
          >
            {editedForm.project}
          </EditTextArea>
        </TableDataCell>

        <TableDataCell data-cell="description">
          <EditTextArea
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="description"
            required
            value={editedForm.description}
          />
        </TableDataCell>

        <TableDataCell data-cell="notes">
          <EditTextArea
            id="notes"
            name="notes"
            onChange={handleChange}
            placeholder="notes"
            value={editedForm.notes}
            required
          />
        </TableDataCell>

        <TableDataCell data-cell="date">
          <EditTextArea
            id="human_readable_date"
            name="human_readable_date"
            // placeholder="YYYY-MM-DD HH:MM AM/PM"
            onChange={handleChange}
            required
            value={editedForm.human_readable_date}
          />
        </TableDataCell>

        <TableDataCell data-cell="none">
          <Button $size={'small'} type="submit" disabled={isPendingUpdate}>
            Update
          </Button>
        </TableDataCell>

        <TableDataCell data-cell="none">
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
                deleteCellbank(editedForm.cell_bank_id);
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
