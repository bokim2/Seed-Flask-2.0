import { useEffect, useState } from 'react';
import { baseUrl } from '../../configs';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import LoaderBar from '../ui/LoaderBar';

// ReduxToolkit - for typescript - Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
    retry: false,
    enabled: true,
  });
  const cellbanks = data?.data;

  // if (error instanceof Error) {
  //   console.log('error in useCellbanks react query', error.message);
  // }

  return [cellbanks, isLoading, error] as const;
}

export function useFlask(id: number | null) {

  const { isLoading, data, error } = useQuery({
    queryKey: ['flask', id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/flasks/${id}`);
      if (!res.ok)
        throw new Error(`Network response ${res.status}, was not ok fetching flask ${id}`);
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
        throw new Error('Network response ${res.status}, was not ok fetching flasks');
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
const {data, isLoading, error }= useQuery({
  queryKey: ['samples'],
  queryFn: async () => {
    const res = await fetch(`${baseUrl}/api/samples`)
    if (!res.ok) throw new Error ('Network response ${res.status}, was not ok fetching samples')
    const data = await res.json()
  return data
  },
  meta: {
    errorMessage: 'Failed to fetch samples data (meta option useQuery)',
  },
  staleTime: 1000 * 60 * 60,
})
const samples = data?.data
return [samples, isLoading, error] as const
}