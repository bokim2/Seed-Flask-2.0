// update a row

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUtcTimestampFromLocalTime } from '../hooks';
import { baseUrl } from '../../../configs';
import { useState } from 'react';

async function updateRowEdit(
  editedForm,
  tableName,
  zodSchema,
  idColumnName,
  dateColumnName
) {
  try {
    console.log(
      'editedForm in updateRowEdit',
      editedForm,
      editedForm[idColumnName]
    );
    const validatedData = zodSchema.safeParse(editedForm);
    if (!validatedData.success) {
      console.log('updateRowEdit validation error', validatedData.error);
      throw new Error(
        `Failed to validate updateRowEdit form on client: ${validatedData.error.message}`
      );
    }
    const res = await fetch(
      `${baseUrl}/api/${tableName}/${editedForm[idColumnName]}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedForm,
          [dateColumnName]:
            tableName === 'schedules'
              ? editedForm.human_readable_date
              : getUtcTimestampFromLocalTime(editedForm.human_readable_date),
        }),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to update row, ${errText}`);
    }
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error('error in updateRowEdit', err);
    throw err;
  }
}

export function useUpdateRowMutation({
  tableName, // ex: 'cellbanks', 'flasks'
  zodSchema, // ex: updateCellbankSchema, updateFlaskSchema
  initialEditForm,
  setEditedForm,
  idColumnName, // ex: 'cell_bank_id', 'flask_id'
  dateColumnName, // ex: 'date_timestamptz', 'start_date'
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (editedForm) =>
      updateRowEdit(
        editedForm,
        tableName,
        zodSchema,
        idColumnName,
        dateColumnName
      ),
    onSuccess: () => {
      // console.log('onSuccess in useUpdateRowMutation', tableName, [tableName])
      queryClient.invalidateQueries({ queryKey: [tableName] });
      // queryClient.invalidateQueries({ queryKey: ['chart/cellbanks'] });
      if (tableName !== 'cellbanks') {
        queryClient.removeQueries({ queryKey: ['chart/cellbanks'] });
      }
      // queryClient.invalidateQueries({ queryKey: ['flasks'] });
      setEditedForm(initialEditForm);
      reset();
    },
    onError: (err) => {
      console.error('error in useUpdateRowMutation', err);
      throw err;
    },
  });

  return { mutate, isPending, error };
}

// submit edited row form - submitting in Table in StyledForm
// might want to erase this, it doesn't add anything.  just move it into styledForm
// actually it helped w typescript errors.  keep for now.

export function useEditTableRowForm<TUpdateCellbankForm>({
  tableName,
  zodSchema,
  initialEditForm,
  idColumnName,
  dateColumnName,
}) {
  const [editedForm, setEditedForm] =
    useState<TUpdateCellbankForm>(initialEditForm);
  // id of edited cellbank
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleEditFormSubmit(e, editedForm, submitEditedForm, setEditingId) {
    // console.log('editedForm in handleEditFormSubmit', editedForm);
    // e.preventDefault();
    // e.stopPropagation();
    submitEditedRowForm(editedForm);
    setEditingId(null);
  }

  const {
    mutate: submitEditedRowForm,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateRowMutation({
    tableName,
    zodSchema,
    initialEditForm,
    setEditedForm,
    idColumnName,
    dateColumnName,
  });

  return {
    editedForm,
    setEditedForm,
    editingId,
    setEditingId,
    submitEditedRowForm,
    isPendingUpdate,
    updateError,
    handleEditFormSubmit,
  };
}
