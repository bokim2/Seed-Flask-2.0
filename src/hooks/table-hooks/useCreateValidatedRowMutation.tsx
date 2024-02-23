import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { baseUrl } from '../../../configs';

// create a row
export function useCreateValidatedRowMutation({
    tableName,
    zodSchema,
    // apiEndpoint
  }) {
    const queryClient = useQueryClient();
    type TzodSchema = z.infer<typeof zodSchema>;
  
    const { mutate, isPending, reset, error } = useMutation({
      mutationFn: (form: TzodSchema) => createRow(form, tableName, zodSchema),
      onSuccess: () => {
        // console.log('onSuccess in useCreateValidatedRowMutation!!!!', tableName);
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(tableName),
        });
        // queryClient.invalidateQueries(tableName);
        // queryClient.refetchQueries({ queryKey: [tableName] });
        reset();
      },
      onError: (err) => {
        throw err;
      },
    });
    return { mutate, isPending, error };
  }
  
  // create a row
  export async function createRow(form, tableName, zodSchema) {
    const validationResult = zodSchema.safeParse(form);
    console.log('validationResult in createRow', validationResult);
    if (!validationResult.success) {
      console.error('createRow validation error', validationResult.error);
      throw new Error(
        `Failed to validate createRow form: ${validationResult.error.message}`
      );
    }
    try {
      console.log('form in createRow', form);
      const response = await fetch(`${baseUrl}/api/${tableName}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...validationResult.data,
        }),
      });
      console.log('res in createRow', response);
      const data = await response.json();
  
      if (!response.ok) {
        const errorMessage =
          data.message || `Failed to post entry in ${tableName}`;
        // You can further customize the error object here if needed
        throw Object.assign(new Error(errorMessage), {
          statusCode: response.status,
          data,
        });
      }
  
      console.log('data after post in createRow', data);
      return data.data;
    } catch (err) {
      console.error('Error in createCellbank', err);
      throw err;
    }
  }
  