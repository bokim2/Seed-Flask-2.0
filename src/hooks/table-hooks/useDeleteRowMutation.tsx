
// delete a row

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../../../configs';

export async function deleteRow(id, tableName) {
    try {
      const res = await fetch(`${baseUrl}/api/${tableName}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to delete row, ${errText}`);
      }
      const { data } = await res.json();
      console.log('data after delete in deleteRow', data);
      return data;
    } catch (err) {
      console.error('error in deleteRow', err);
      throw err;
    }
  }
  
  export function useDeleteRowMutation({ tableName }) {
    const queryClient = useQueryClient();
    const { mutate, isPending, error, reset } = useMutation({
      mutationFn: (id: number) => deleteRow(id, tableName),
      onSuccess: () => {
        queryClient.invalidateQueries(tableName);
        reset();
      },
      onError: (err) => {
        console.error('error in useDeleteRowMutation', err);
        throw err;
      },
    });
    return { mutate, isPending, error };
  }