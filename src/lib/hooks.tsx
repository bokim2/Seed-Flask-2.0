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
useFetchQuery ()


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
import { cellbanksArraySchema } from '../features/cellbanks/cellbanks-types';

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
