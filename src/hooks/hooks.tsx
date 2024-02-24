import { useEffect, useState } from 'react';
import { baseUrl } from '../../configs';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../lib/store';

// ReduxToolkit - for typescript - Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



// seting table to data (sorted and searched if any)

export function filteredTableData(
  tableRowsData,
  searchedData,
  sortColumn,
  timestamp_column
) {
  // console.log(
  //   // tableRowsData,
  //   // searchedData,
  //   sortColumn,
  //   timestamp_column,
  //   'tableRowsData, searchedData, sortColumn, timestamp_column'
  // );
  let filteredTableData = [...tableRowsData];
  // console.log('filteredTableData.cellbankid', filteredTableData.map(e => e.cell_bank_id));

  if (timestamp_column) {
    filteredTableData = filteredTableData.map((tableRow) => {
      // console.log(
      //   'tableRow?.[timestamp_column]',
      //   tableRow?.[timestamp_column]
      // );
      if (tableRow?.[timestamp_column]) {
        return {
          ...tableRow,
          human_readable_date: displayLocalTime(tableRow[timestamp_column]),
        };
      }
      return tableRow;
    });
  }

  if (searchedData?.length > 0) {
    filteredTableData = searchedData;
  }
  // console.log('Object.values(sortColumn)[0]', Object.values(sortColumn)[0], Object.values(sortColumn))
  if (Object.values(sortColumn)[0]) {
    const sortDirection = Object.values(sortColumn)[0]; // asc or desc
    const sortColumnKey = Object.keys(sortColumn)[0]; // column name
    // console.log('sortDirection', sortDirection);

    filteredTableData = [...filteredTableData].sort((a, b) => {
      // console.log(
      //   'a[sortColumnKey], b[sortColumnKey]',
      //   a[sortColumnKey],
      //   b[sortColumnKey],
      //   a[sortColumnKey] < b[sortColumnKey]

      // );
      const numericColumns = new Set(['cell_bank_id', 'flask_id', 'sample_id']);
      if (!numericColumns.has(sortColumnKey)) {
        if (sortDirection === 'asc'){
          // console.log(
          //   'a[sortColumnKey].localeCompare(b[sortColumnKey])', a[sortColumnKey], b[sortColumnKey], a[sortColumnKey].localeCompare(b[sortColumnKey])
          // )
          // console.log(
          //   'a[sortColumnKey].localeCompare(b[sortColumnKey])', a[sortColumnKey], b[sortColumnKey], 'rgfdf'.localeCompare('1')
          // )
          return a[sortColumnKey].localeCompare(b[sortColumnKey]);
        }
        if (sortDirection === 'desc')
          return b[sortColumnKey].localeCompare(a[sortColumnKey]);
      } else {
        if (sortDirection === 'asc') return a[sortColumnKey] - b[sortColumnKey];
        if (sortDirection === 'desc')
          return b[sortColumnKey] - a[sortColumnKey];
      }
    });
  }
  // console.log('FINAL filteredTableData', filteredTableData);
  return filteredTableData;
}

// format column name - to remove _ and replace with ' '
export function formatColumnName(columnName) {
  if (columnName === 'human_readable_date') {
    return 'date';
  } else {
    return columnName.replace(/_/g, ' ');
  }
}

// set sorted column and asc or desc

export function useSetSortColumn<TTableColumns extends string>() {
  type TSortOrder = 'asc' | 'desc' | '';
  type TSortColumn = { [key in TTableColumns]?: TSortOrder };

  const [sortColumn, setSortColumn] = useState<TSortColumn>({});
  console.log(sortColumn, 'sortColumn');

  const handleSortColumn = (e, columnName, sortOrder) => {
    e.stopPropagation();

    const sortObject = {
      [columnName]: sortOrder,
    };

    if (sortOrder) {
      setSortColumn((prev) => {
        if (
          (prev?.[columnName] === 'asc') === sortOrder ||
          (prev?.[columnName] === 'desc') === sortOrder
        ) {
          return { [columnName]: '' };
        }
        return sortObject;
      });
    }
  };
  return { sortColumn, handleSortColumn, setSortColumn };
}

// update table data based on filter and sort settings
export function useFilterSortTableData({
  cellbanks,
  searchedData,
  sortColumn,
  setFilteredAndSortedData,
}) {
  // update selected data based on filter and sort settings
  useEffect(() => {
    // console.log('in useEffect', cellbanks, searchedData, sortColumn);
    const updatedData = filteredTableData(
      cellbanks,
      searchedData,
      sortColumn,
      'date_timestamptz'
    );
    setFilteredAndSortedData(updatedData);
    // console.log('useEffect in cellbanks table', cellbanks);
  }, [cellbanks, searchedData, sortColumn, setFilteredAndSortedData]);
}

// toggle nav menus off when clicking outside of them
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

// // fetch all rows in table
// export function useFetchValidatedTableQuery({ tableName, zodSchema }) {
//   const { data, isLoading, error } = useQuery({
//     queryKey: [tableName],
//     queryFn: async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/${tableName}`, {
//           credentials: 'include', // Include cookies for cross-origin requests
//         });
//         const dbData = await response.json();
//         console.log('data in useFetchValidatedTableQuery', dbData);
//     if (!response.ok) {
//       const errorMessage = data.message || `Failed to fetch from ${tableName}`;
//       throw Object.assign(new Error(errorMessage), { statusCode: response.status, data });
//     }

//     // validation ON
//         const validatedData = zodSchema.safeParse(dbData.data);
//         // console.log(validatedData, 'validatedData');
//         if (!validatedData.success) {
//           console.error(
//             'useFetchValidatedTableQuery validation error',
//             validatedData.error
//           );
//           throw new Error(`Data validation in ${tableName} table failed`);
//         }
//         // return validatedData.data;
//         return dbData;

//         // TURNED VALIDATION OFF FOR NOW!!!!
//       } catch (err) {
//         console.log(err, 'error in useFetchValidatedTableQuery');
//         throw err;
//       }
//     },
//     retry: 2,
//     meta: {
//       errorMessage: `Failed to fetch ${tableName} data (meta option useQuery)`,
//     },
//   });
//   return {data, isLoading, error} as const;
// }

// create one row in table

// // Flask hooks
// export function useFlask(id: number | null) {
//   const { isLoading, data, error } = useQuery({
//     queryKey: ['flask', id],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/api/flasks/${id}`);
//       if (!res.ok)
//         throw new Error(
//           `Network response ${res.status}, was not ok fetching flask ${id}`
//         );
//       const data = await res.json();
//       // console.log('in query function')
//       return data;
//     },
//     meta: {
//       errorMessage: 'Failed to fetch flask data (meta option useQuery)',
//     },
//     staleTime: 1000 * 60 * 60,
//     refetchOnWindowFocus: true,
//     retry: false,
//     enabled: Boolean(id),
//     // onError: ()=> console.log('error in useFlask'),
//   });
//   // console.log('data in useFlask', data);
//   const flask = data;
//   return [flask, isLoading, error] as const;
// }

// export function useFlasks() {
//   const { isLoading, data, error } = useQuery({
//     queryKey: ['flasks'],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/api/flasks`);
//       if (!res.ok)
//         throw new Error(
//           'Network response ${res.status}, was not ok fetching flasks'
//         );
//       const data = await res.json();
//       // console.log('in query function')
//       return data;
//     },
//     meta: {
//       errorMessage: 'Failed to fetch flasks data (meta option useQuery)',
//     },
//     // staleTime: 1000 * 60 * 60,
//     // staleTime: 1000 * 5,
//     // refetchOnWindowFocus: true,
//     // retry: false,
//     // enabled: true,
//   });
//   // console.log('data in useFlask', data);
//   const flasks = data?.data;

//   return [flasks, isLoading, error] as const;
// }

// export function useSamples() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['samples'],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/api/samples`);
//       if (!res.ok)
//         throw new Error(
//           'Network response ${res.status}, was not ok fetching samples'
//         );
//       const data = await res.json();
//       return data;
//     },
//     meta: {
//       errorMessage: 'Failed to fetch samples data (meta option useQuery)',
//     },
//     staleTime: 1000 * 60 * 60,
//   });
//   const samples = data?.data;
//   return [samples, isLoading, error] as const;
// }
