import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../configs';
import { TCreateCellbankSchema, cellbanksArraySchema } from './cellbanks-types';
import { getUtcTimestampFromLocalTime } from '../../lib/hooks';
import { InitialEditCellbankForm } from '../../lib/constants';

// Cellbanks hooks
export function useFetchCellbanksQuery() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cellbanks'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/cellbanks`);
      if (!res.ok)
        throw new Error('Network response was not ok fetching cellbanks');
      const data = await res.json();

      const validatedData = cellbanksArraySchema.safeParse(data.data);

      if (!validatedData.success) {
        console.error(validatedData.error);
        return;
      }
      // zod puts the data in data key
      return validatedData.data;
    },
    meta: {
      errorMessage: 'Failed to fetch cellbanks data (meta option useQuery)',
    },
    // staleTime: 1000 * 60 * 60,
    // refetchOnWindowFocus: true,
    // retry: true,
    // enabled: true,
  });

  return [data, isLoading, error] as const;
}

// add a single cellbank
async function createCellbank(form) {
  const { strain, target_molecule, description, notes } = form;
  try {
    console.log('form in postCellbank', form);
    const res = await fetch(`${baseUrl}/api/cellbank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strain,
        target_molecule,
        description,
        notes,
      }),
    });
    const { data } = await res.json();
    console.log('data in postCellbank', data);
    return data;
  } catch (err) {
    console.log('error in postCellbank', err);
  }
}

// Create a new cellbank
export function useCreateCellbankMutation() {
  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (form: TCreateCellbankSchema) => {
      console.log('form in useCreateCellbankMutation', form);
      return createCellbank(form);
    },
    onSuccess: () => {
      console.log('success in useCreateCellbankMutation');
      queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
      reset();
    },
    onError: () =>
      console.log('error in useCreateCellbankMutation mutation fn'),
  });

  return [mutate, isPending] as const;
}

// submit a single cellbank edit to the server
async function updateCellbankEdit(editedForm) {
  try {
    // console.log('cell_bank_id', editedForm.cell_bank_id);
    const { strain, target_molecule, description, notes, human_readable_date } =
      editedForm;
    const res = await fetch(
      `${baseUrl}/api/cellbank/${editedForm.cell_bank_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          strain,
          target_molecule,
          description,
          notes,
          date_timestamptz: getUtcTimestampFromLocalTime(human_readable_date),
        }),
      }
    );
    const result = await res.json();
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return result.data;
  } catch (error) {
    console.log('error in updateCellbankEdit', error);
  }
}

export function useUpdateCellbankMutation(setEditedForm) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (editedForm) => updateCellbankEdit(editedForm),
    onSuccess: () => {
      // console.log('success in useUpdateCellbankMutation');
      queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
      setEditedForm(InitialEditCellbankForm);
      // console.log('isPending in onSuccess', isPending);
    },
    onError: () =>
      console.log('error in useUpdateCellbankMutation mutation fn'),
  });
  return { mutate, isPending };
}
