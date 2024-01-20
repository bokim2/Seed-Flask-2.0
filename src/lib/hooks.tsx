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
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: true,
    
  }
  );
  const cellbanks = data?.data;

  if (error instanceof Error) {
    console.log('error in useCellbanks react query', error.message);
  }

  return [cellbanks, isLoading, error] as const;
}

export function useFlask(id: number | null) {
  //   const [flask, setFlask] = useState<any>({});
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // console.log('in fetch data', import.meta.env.PROD);
  //         const res = await fetch(`${baseUrl}/api/flasks/${id}`);
  //         const data = await res.json();
  //         // console.log('Axios response:', res);
  //         // console.log('Data in useEffect:', res.data);
  //         setFlask(data.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const { isLoading, data, error } = useQuery({
    queryKey: ['flask', id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/flasks/${id}`);
      const data = await res.json();
      // console.log('in query function')
      return data;
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
      const data = await res.json();
      // console.log('in query function')
      return data;
    },
    staleTime: 1000 * 60 * 60,
    // staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
    retry: false,
    enabled: true,
    // onError: ()=> console.log('error in useFlask'),
  });
  // console.log('data in useFlask', data);
  const flasks = data?.data;

  if (error instanceof Error) {
    console.log('error in useFlasks react query', error.message);
  }

  return [flasks, isLoading, error] as const;
}
