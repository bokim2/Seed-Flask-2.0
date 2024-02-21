import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../configs';
import {
  TCreateCellbankSchema,
  cellbanksArraySchema,
  createCellbankSchema,
  initialEditCellbankForm,
  updateCellbankSchema,
} from './cellbanks-types';
import { getUtcTimestampFromLocalTime } from '../../lib/hooks';

// Utility or API service functions

// create a cellbank
// export async function createCellbank(form) {
//   const { strain, target_molecule, description, notes } = form;
//   const validationResult = createCellbankSchema.safeParse(form);
//   if (!validationResult.success) {
//     throw new Error(`Failed to validate createCellbank form: ${validationResult.error.message}`)
//   }
//   try {
//     console.log('form in postCellbank', form);
//     const res = await fetch(`${baseUrl}/api/cellbanks`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         strain,
//         target_molecule,
//         description,
//         notes,
//       }),
//     });
//     if (!res.ok) {
//       throw new Error('Failed to create cellbank');
//     }
//     const { data } = await res.json();
//     console.log('data in postCellbank', data);
//     return data;
//   } catch (err) {
//     console.error('Error in createCellbank', err);
//     throw err;
//   }
// }

// submit a single cellbank edit to the server
// async function updateCellbankEdit(editedForm) {
//   try {
//     console.log('editedForm in updateCellbankEdit', editedForm)
//     // console.log('cell_bank_id', editedForm.cell_bank_id);
//     const validationResult = updateCellbankSchema.safeParse(editedForm);
//     if (!validationResult.success) {
//       throw new Error(
//         `Failed to validate updateCellbankEdit form: ${validationResult.error.message}`
//       );
//     }
//     const { strain, target_molecule, description, notes, human_readable_date } =
//       editedForm;
//     const res = await fetch(
//       `${baseUrl}/api/cellbanks/${editedForm.cell_bank_id}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           strain,
//           target_molecule,
//           description,
//           notes,
//           date_timestamptz: getUtcTimestampFromLocalTime(human_readable_date),
//         }),
//       }
//     );
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const { data } = await res.json();
//     return data;
//   } catch (err) {
//     console.log('error in updateCellbankEdit', err);
//     throw err;
//   }
// }

// delete a single cellbank
// const deleteCellbankById = async (cell_bank_id: number) => {
//   try {
//     const response = await fetch(`${baseUrl}/api/cellbanks/${cell_bank_id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       const err = await response.text();
//       throw new Error(
//         err || 'Error deleting cellbank in deleteCellbankById function'
//       );
//     }
//     return response.json();
//   } catch (err) {
//     console.error('Error in deleteCellbankById', err);
//     throw err;
//   }
// };

// Custom hooks utilizing the above functions

// Get all cellbanks
// export function useFetchCellbanksQuery() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['cellbanks'],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/api/cellbanks`);
//       if (!res.ok)
//         throw new Error('Network response was not ok fetching cellbanks');
//       const { data } = await res.json();

//       const validatedData = cellbanksArraySchema.safeParse(data);

//       if (!validatedData.success) {
//         console.error(validatedData.error);
//       throw new Error('Failed to validate fetched cellbanks data');
//       }
//       // zod puts the data in data key
//       return validatedData.data;
//     },
//     meta: {
//       errorMessage: 'Failed to fetch cellbanks data (meta option useQuery)',
//     },
//     // staleTime: 1000 * 60 * 60,
//     // refetchOnWindowFocus: true,
//     // retry: true,
//     // enabled: true,
//   });

//   return [data, isLoading, error] as const;
// }

// // Create a new cellbank
// export function useCreateCellbankMutation() {
//   const queryClient = useQueryClient();
//   const { mutate, reset, isPending } = useMutation({
//     mutationFn: (form: TCreateCellbankSchema) => {
//       console.log('form in useCreateCellbankMutation', form);
//       return createCellbank(form);
//     },
//     onSuccess: () => {
//       console.log('success in useCreateCellbankMutation');
//       queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
//       reset();
//     },
//     onError: () => {
//       console.log('error in useCreateCellbankMutation mutation fn');
//     },
//   });

//   return [mutate, isPending] as const;
// }

// update a single cellbank
// export function useUpdateCellbankMutation(setEditedForm) {
//   const queryClient = useQueryClient();
//   const { mutate, isPending, error, reset } = useMutation({
//     mutationFn: (editedForm) => updateCellbankEdit(editedForm),
//     onSuccess: () => {
//       // console.log('success in useUpdateCellbankMutation');
//       queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
//       setEditedForm(initialEditCellbankForm);
//       reset();
//       // console.log('isPending in onSuccess', isPending);
//     },
//     onError: () =>
//       console.log('error in useUpdateCellbankMutation mutation fn'),
//   });
//   return { mutate, isPending, error };
// }

// export function useDeleteCellbankMutation() {
//   const queryClient = useQueryClient();
//   const {
//     mutate: deleteCellbank,
//     isPending,
//     isError,
//     error,
//     reset,
//   } = useMutation({
//     mutationFn: (cell_bank_id: number) => deleteCellbankById(cell_bank_id),
//     onSuccess: () => {
//       // console.log('success');
//       queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
//       reset();
//     },
//     onError: (err) => {
//       console.error('error', err);
//     },
//   });

//   return { mutate: deleteCellbank, isPending, isError, error };
// }

// perform text search on cellbanks
// import { CellbankSearchParamsSchema } from './cellbanks-types';
// import { useSearchParams } from 'react-router-dom';
// import { useState } from 'react';

// export function useTextInputSearch() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [searchText, setSearchText] = useState(
//     searchParams.get('searchText') || ''
//   );
//   // set search params for selected column for text search
//   const SelectSearchField = (e) => {
//     e.stopPropagation();
//     // console.log(e.target, e.currentTarget)

//     let targetElement = e.target;

//     if (!targetElement.hasAttribute('data-column-name')) {
//       targetElement = e.target.closest('[data-column-name]');
//     }

//     let columnName = targetElement?.getAttribute('data-column-name');
//     if (!columnName) {
//       return;
//     }
//     if (columnName === 'human_readable_date') {
//       columnName = 'date_timestampz';
//     }

//     // console.log('columnName cellbank???', columnName);

//     searchParams.set('searchField', columnName);
//     setSearchParams(searchParams);
//   };

//   const performInputTextSearch = async () => {
//     if (!searchParams.get('searchField')) {
//       searchParams.set('searchField', 'cell_bank_id');
//     }

//     if (searchParams.get('searchField') === 'date_timestampz') {
//       console.log(
//         'searchText',
//         searchText,
//         'getUtcTimestampFromLocalTime(searchText)',
//         getUtcTimestampFromLocalTime(searchText)
//       );
//       searchParams.set('searchText', getUtcTimestampFromLocalTime(searchText));
//     } else {
//       searchParams.set('searchText', searchText);
//       setSearchParams(searchParams);
//     }

//     const validatedSearchParams = CellbankSearchParamsSchema.safeParse(
//       Object.fromEntries(searchParams)
//     );
//     if (!validatedSearchParams.success) {
//       console.log('error', validatedSearchParams.error);
//       return [];
//     }

//     try {
//       const fetchSearchParams = new URLSearchParams(
//         validatedSearchParams.data
//       ).toString();

//       const res = await fetch(
//         `${baseUrl}/api/cellbanks/search?${fetchSearchParams}`
//       );
//       const data = await res.json();
//       console.log('data in performInputTextSearch', data);
//       if (!res.ok) {
//         throw new Error('Failed to perform input text search');
//       }
//       return data;
//     } catch (err) {
//       console.error('Error in performInputTextSearch', err);
//       return [];
//     }
//   };

//   return {
//     searchText,
//     setSearchText,
//     SelectSearchField,
//     performInputTextSearch,
//     searchField: searchParams.get('searchField') || 'cell_bank_id',
//   };
// }
