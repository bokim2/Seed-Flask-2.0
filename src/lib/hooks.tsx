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

// Cellbanks hooks
export function useCellbanks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cellbanks'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/cellbanks`);
      if (!res.ok)
        throw new Error('Network response was not ok fetching cellbanks');
      const data = await res.json();
      return data;
    },
    meta: {
      errorMessage: 'Failed to fetch cellbanks data (meta option useQuery)',
    },
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
    retry: true,
    enabled: true,
  });
  const cellbanks = data?.data;
  // console.log('cellbanks data.data', cellbanks);

  // if (error instanceof Error) {
  //   console.log('error in useCellbanks react query', error.message);
  // }

  return [cellbanks, isLoading, error] as const;
}

// add a single cellbank
async function createCellbank(form) {
  const { strain, target_molecule, description, notes } = form;
  try {
    console.log('form in postCellbank', form);
    const res = await fetch(`${baseUrl}/api/cellbank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          strain,
          target_molecule,
          description,
          notes,
        }),
      },
    );
    const {data} = await res.json();
    console.log('data in postCellbank', data);
    return data;
  } catch (err) {
    console.log('error in postCellbank', err);
  }
}

export function useCreateCellbank() {
  const queryClient = useQueryClient();
  const { mutate, reset, isPending } = useMutation({
    mutationFn: (form: TForm) => {
      console.log('form in useCreateCellbank', form);
      return createCellbank(form)},
    onSuccess: () => {
      console.log('success in useCreateCellbank');
      queryClient.invalidateQueries({ queryKey: ['cellbanks'] });
      reset();
    },
    onError: () => console.log('error in useCreateCellbank mutation fn'),
  });

  return [mutate, isPending] as const;
}

// submit a single cellbank edit to the server
async function updateEditSubmit(editedForm) {
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log('put request sent');
    window.location.reload();
  } catch (error) {
    // console.log('error in updateEditSubmit');
    console.log('error in updateEditSubmit', error);
  }
}

export function useEditCellbank() {
  const { mutate } = useMutation({
    mutationFn: (editedForm) => updateEditSubmit(editedForm),
    onSuccess: () => console.log('success in useEditCellbank'),
  });
  return mutate;
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
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: true,
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
import { TForm } from './types';

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
