import { useEffect, useState } from 'react';
import { baseUrl } from '../../configs';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// ReduxToolkit - for typescript - Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// fetch all rows in table
export function useFetchValidatedTableQuery({ tableName, zodSchema }) {
  const { data, isLoading, error } = useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/api/${tableName}`);
        if (!res.ok) throw new Error('Failed to fetch table data');
        const { data } = await res.json();

        const validatedData = zodSchema.safeParse(data);
        // console.log(validatedData, 'validatedData');
        if (!validatedData.success) {
          console.error(
            'useFetchValidatedTableQuery validation error',
            validatedData.error
          );
          throw new Error(`Data validation in ${tableName} table failed`);
        }
        // return data;

        // TURNED VALIDATION OFF FOR NOW!!!!
        return validatedData.data;
      } catch (err) {
        console.log(err, 'error in useFetchValidatedTableQuery');
        throw err;
      }
    },
    meta: {
      errorMessage: `Failed to fetch ${tableName} data (meta option useQuery)`,
    },
  });
  return [data, isLoading, error] as const;
}

// create one row in table

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
      queryClient.invalidateQueries(tableName);
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
  // const { ...columnNamesArray } = form;
  const validationResult = zodSchema.safeParse(form);
  if (!validationResult.success) {
    console.error('createRow validation error', validationResult.error);
    throw new Error(
      `Failed to validate createCellbank form: ${validationResult.error.message}`
    );
  }
  try {
    console.log('form in createRow', form);
    const res = await fetch(`${baseUrl}/api/${tableName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create cellbank');
    }
    const { data } = await res.json();
    console.log('data after post in createRow', data);
    return data;
  } catch (err) {
    console.error('Error in createCellbank', err);
    throw err;
  }
}

// delete a row

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

// update a row

async function updateRowEdit(editedForm, tableName, zodSchema, idColumnName, dateColumnName) {
  try {
    console.log('editedForm in updateRowEdit', editedForm, editedForm[idColumnName]);
    const validatedData = zodSchema.safeParse(editedForm);
    if (!validatedData.success) {
      console.log('updateRowEdit validation error', validatedData.error);
      throw new Error(`Failed to validate updateRowEdit form: ${validatedData.error.message}`)
    }
    const res = await fetch(`${baseUrl}/api/${tableName}/${editedForm[idColumnName]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: 
        JSON.stringify({
          ...editedForm, [dateColumnName]: getUtcTimestampFromLocalTime(editedForm.human_readable_date),
        })
      
    })
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to update row, ${errText}`);
    }
    const {data} = await res.json();
    return data
  } catch (err) {
    console.error('error in updateRowEdit', err);
    throw err;
  }

}

export function useUpdateRowMutation({ tableName, zodSchema, initialEditForm, setEditedForm, idColumnName, dateColumnName }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, reset} = useMutation({
    mutationFn: (editedForm)=> updateRowEdit(editedForm, tableName, zodSchema, idColumnName, dateColumnName),
    onSuccess: ()=> {
      // console.log('onSuccess in useUpdateRowMutation', tableName, [tableName])
      queryClient.invalidateQueries({ queryKey: [tableName]});
      setEditedForm(initialEditForm);
      reset()
    },
    onError: (err) => {
      console.error('error in useUpdateRowMutation', err);
      throw err;
    }
  })

  return {mutate, isPending, error}
}



// Flask hooks
export function useFlask(id: number | null) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['flask', id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/flasks/${id}`);
      if (!res.ok)
        throw new Error(
          `Network response ${res.status}, was not ok fetching flask ${id}`
        );
      const data = await res.json();
      // console.log('in query function')
      return data;
    },
    meta: {
      errorMessage: 'Failed to fetch flask data (meta option useQuery)',
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: Boolean(id),
    // onError: ()=> console.log('error in useFlask'),
  });
  // console.log('data in useFlask', data);
  const flask = data;
  return [flask, isLoading, error] as const;
}

export function useFlasks() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['flasks'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/flasks`);
      if (!res.ok)
        throw new Error(
          'Network response ${res.status}, was not ok fetching flasks'
        );
      const data = await res.json();
      // console.log('in query function')
      return data;
    },
    meta: {
      errorMessage: 'Failed to fetch flasks data (meta option useQuery)',
    },
    // staleTime: 1000 * 60 * 60,
    // staleTime: 1000 * 5,
    // refetchOnWindowFocus: true,
    // retry: false,
    // enabled: true,
  });
  // console.log('data in useFlask', data);
  const flasks = data?.data;

  return [flasks, isLoading, error] as const;
}

export function useSamples() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['samples'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/samples`);
      if (!res.ok)
        throw new Error(
          'Network response ${res.status}, was not ok fetching samples'
        );
      const data = await res.json();
      return data;
    },
    meta: {
      errorMessage: 'Failed to fetch samples data (meta option useQuery)',
    },
    staleTime: 1000 * 60 * 60,
  });
  const samples = data?.data;
  return [samples, isLoading, error] as const;
}

// toggle menus off when clicking outside of them
export function useOnClickOutside(refs, handlerFn) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target))
      ) {
        handlerFn();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [refs, handlerFn]);
}

// TIMEZONE CONVERSION FUNCTION

import { format, parse } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { isPending } from '@reduxjs/toolkit';
import { type } from 'os';
import {
  cellbanksArraySchema,
  createCellbankSchema,
} from '../features/cellbanks/cellbanks-types';
import { ZodSchema, z } from 'zod';

// convert UTC timestamp to local time

export function displayLocalTime(utcTimestamp) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log('timeZone', timeZone);
  const zonedTime = utcToZonedTime(utcTimestamp, timeZone);
  return format(zonedTime, 'yyyy-MM-dd hh:mm a');
}

// convert human readable local time to UTC timestampz for postgres

export function getUtcTimestampFromLocalTime(
  localTime,
  timeFormat = 'yyyy-MM-dd hh:mm a'
) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [date, time, amOrPm] = localTime.split(' ');
  // console.log('date', date, 'time', time, 'amOrPm', amOrPm);
  let [hours, mins] = time.split(':');
  hours = parseInt(hours);
  mins = parseInt(mins);

  if (amOrPm === 'PM' && hours < 12) hours += 12;

  const DateObject = parse(
    `${date} ${hours}:${mins}`,
    'yyyy-MM-dd HH:mm',
    new Date()
  );

  const utcDate = zonedTimeToUtc(DateObject, localTimeZone);

  return utcDate.toISOString();
}
