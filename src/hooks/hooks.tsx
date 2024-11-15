import { useEffect, useMemo, useState } from 'react';
import { baseUrl } from '../../configs';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

// ReduxToolkit - for typescript - Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useMainFilter({ selector }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['mainfilter', selector],
    queryFn: async () => {
      try {
        // console.log('running useMainFilter', selector);
        const response = await fetch(`${baseUrl}/api/uniques/${selector}`);
        // const response = await fetch(`${baseUrl}/api/uniques/project`)
        const { data } = await response.json();
        // console.log(data, 'data in useMainFilter');
        if (!response.ok) {
          const errorMessage =
            data?.error ||
            data?.message ||
            `Failed to fetch unique values from ${selector}, status: ${response.status}`;
          throw new Error(errorMessage);
        }
        return data;
        // console.log(
        //   'data[0]?.array_agg in useQuery, fetching projects',
        //   data[0]?.array_agg
        // );
        // return data[0]?.array_agg;
      } catch (err) {
        console.log(err, 'error in getting unique mainfilter values');
        throw err;
      }
    },
  });
  return { data, isLoading, isError } as const;
}

// seting table to data (sorted and searched if any)

// export function filteredTableData(
//   tableRowsData,
//   filteredAndSortedData,
//   sortColumn,
//   timestamp_column
// ) {
//   console.log(
//     tableRowsData,
//     filteredAndSortedData,
//     sortColumn,
//     timestamp_column,
//     'tableRowsData, searchedData, sortColumn, timestamp_column'
//   );
//   let filteredTableData = [...tableRowsData];
//   // console.log('filteredTableData.cellbankid', filteredTableData.map(e => e.cell_bank_id));
//   // console.log(
//   //   'timestamp_column',
//   //   timestamp_column,
//   //   'filteredTableData',
//   //   filteredTableData
//   // );

//   if (filteredAndSortedData && filteredAndSortedData?.length > 0) {
//     filteredTableData = [...filteredAndSortedData];
//   }

//   if (timestamp_column) {
//     filteredTableData = [...filteredTableData].map((tableRow) => {
//       // console.log(
//       //   'tableRow?.[timestamp_column]',
//       //   tableRow?.[timestamp_column]
//       // );
//       if (tableRow?.[timestamp_column]) {
//         // console.log(
//         //   'timestamp_column',
//         //   Boolean(timestamp_column),
//         //   'tableRow?.[timestamp_column]',
//         //   Boolean(tableRow?.[timestamp_column])
//         // );
//         return {
//           ...tableRow,
//           human_readable_date: displayLocalTime(tableRow[timestamp_column]),
//         };
//       }
//       // console.log('tableRow', tableRow);

//       return tableRow;
//     });
//   }

//   // console.log('Object.values(sortColumn)[0]', Object.values(sortColumn)[0], Object.values(sortColumn))
//   if (Object.values(sortColumn)[0]) {
//     const sortDirection = Object.values(sortColumn)[0]; // asc or desc
//     const sortColumnKey = Object.keys(sortColumn)[0]; // column name
//     // console.log('sortDirection', sortDirection);

//     filteredTableData = [...filteredTableData].sort((a, b) => {
//       // console.log(
//       //   'a[sortColumnKey], b[sortColumnKey]',
//       //   a[sortColumnKey],
//       //   b[sortColumnKey],
//       //   a[sortColumnKey] < b[sortColumnKey]

//       // );
//       const numericColumns = new Set([
//         'cell_bank_id',
//         'flask_id',
//         'sample_id',
//         'inoculum_ul',
//         'media_ml',
//         'rpm',
//         'temp_c',
//         'od600',
//         'time_since_inoc_hr',
//       ]);
//       if (!numericColumns.has(sortColumnKey)) {
//         if (sortDirection === 'asc') {
//           // console.log(
//           //   'a[sortColumnKey].localeCompare(b[sortColumnKey])', a[sortColumnKey], b[sortColumnKey], a[sortColumnKey].localeCompare(b[sortColumnKey])
//           // )
//           // console.log(
//           //   'a[sortColumnKey].localeCompare(b[sortColumnKey])', a[sortColumnKey], b[sortColumnKey], 'rgfdf'.localeCompare('1')
//           // )
//           return a[sortColumnKey].localeCompare(b[sortColumnKey]);
//         }
//         if (sortDirection === 'desc')
//           return b[sortColumnKey].localeCompare(a[sortColumnKey]);
//       } else {
//         if (sortDirection === 'asc') return a[sortColumnKey] - b[sortColumnKey];
//         if (sortDirection === 'desc')
//           return b[sortColumnKey] - a[sortColumnKey];
//       }
//     });
//   }
//   console.log('FINAL filteredTableData', filteredTableData);
//   return filteredTableData;
// }

const numericColumns = new Set([
  'cell_bank_id',
  'flask_id',
  'sample_id',
  'schedule_id',
  'inoculum_ul',
  'media_ml',
  'rpm',
  'temp_c',
  'od600',
  'time_since_inoc_hr',
  'completed'
]);

const timeDisplayVSColumnName = {
  'start date/time': 'start_date',
  'start_date': 'start_date',
  'end date/time': 'end_date',

}

export function useFilteredTableData(
  tableRowsData,
  filteredAndSortedData,
  sortColumn,
  timestamp_column
) {
  const formattedData = useMemo(() => {
    if (timestamp_column) {
      tableRowsData.map((row) => ({
        ...row,
        human_readable_date: displayLocalTime(row[timestamp_column]),
      }));
    }
  }, [tableRowsData, timestamp_column]);

  const dataToSort =
    filteredAndSortedData && filteredAndSortedData?.length > 0
      ? filteredAndSortedData
      : formattedData;
  const sortedData = useMemo(() => {
    if (!Object.values(sortColumn)[0]) return dataToSort; // Skip sorting if no sortColumn is defined

    const sortDirection = Object.values(sortColumn)[0]; // 'asc' or 'desc'
    const sortColumnKey = Object.keys(sortColumn)[0]; // column name to sort by

    return [...dataToSort].sort((a, b) => {
      console.log('sortColumnKey , timestamp_column', sortColumnKey , timestamp_column, 'timeDisplayVSColumnName?.[sortColumnKey]', timeDisplayVSColumnName?.[sortColumnKey])
      const isNumeric = numericColumns.has(sortColumnKey);
      if (isNumeric) {
        return sortDirection === 'asc'
          ? a[sortColumnKey] - b[sortColumnKey]
          : b[sortColumnKey] - a[sortColumnKey];
      } else if (timeDisplayVSColumnName?.[sortColumnKey] === timestamp_column) {
        console.log('sorting by timestamp');
        const dateA = new Date(a?.[timestamp_column]).getTime();
        const dateB = new Date(b?.[timestamp_column]).getTime();
        console.log('dateA, dateB', dateA, dateB);
        return sortDirection === 'asc'
          ? dateA - dateB : dateB - dateA;
      } else {
        console.log('sorting by string, else statement')
        return sortDirection === 'asc'
          ? a[sortColumnKey].localeCompare(b[sortColumnKey])
          : b[sortColumnKey].localeCompare(a[sortColumnKey]);
      }
    });
  }, [dataToSort, sortColumn, timestamp_column]);

  return sortedData;
}

// format column name - to remove _ and replace with ' '
export function formatColumnName(columnName) {
    if (columnName === 'human_readable_date'|| columnName === 'start_date' || columnName === 'end_date' || columnName === 'date_timestamptz' || columnName === 'date') {
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

  const handleSortColumn = (
    e: React.MouseEvent,
    columnName: TTableColumns,
    sortOrder: TSortOrder
  ) => {
    e.stopPropagation();

    setSortColumn((prev: TSortColumn) => {
      // Using type assertion to ensure the return type matches TSortColumn
      const newSortState = {
        [columnName]: sortOrder === prev[columnName] ? '' : sortOrder,
      } as TSortColumn;

      return newSortState;
    });
  };

  return { sortColumn, handleSortColumn, setSortColumn };
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
import { cellbanksArraySchema } from '../features/cellbanks/cellbanks-types';
import { ZodSchema, z } from 'zod';
import { useQuery } from '@tanstack/react-query';

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

// for schedules table - add time_since_inoc_hr to get sample_date timestamp

export function addHoursToTimestamp(timestamp, hrsToAdd) {
  const startDate = new Date(timestamp);
  const milisecondsToAdd = hrsToAdd * 60 * 60 * 1000;
  const newTimestamp = startDate.getTime() + milisecondsToAdd;

  const newDate = new Date(newTimestamp);
  return newDate.toISOString();
}

export function formatDateTime(date) {
  return format(new Date(date), 'yyyy-MM-dd hh:mm a');
}

export function combineDateAndTime(dateString, timeString) {
  const dateTimeString = `${dateString}T${timeString}`;
  const resultDate = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm", new Date());
  return resultDate;
}

// check if current flask list is valid
export function validateCurrentFlasks(currentFlasksString) {
  if (currentFlasksString.length == 0) return true;

  const regex = /^[0-9, \s-]+$/;
  return regex.test(currentFlasksString);
}

export function transformListStringToArray(listString) {
  if (Array.isArray(listString)) {
    console.log('liststring is an array', listString, String(listString));

    return listString;
  }

  if (!validateCurrentFlasks(listString)) return [];

  const commaSplitArray = listString.split(',').map((e) => e.trim());

  const resultSet: Set<number> = new Set();

  commaSplitArray.forEach((rangePortion) => {
    if (rangePortion.includes('-')) {
      const [start, end] = rangePortion
        .split('-')
        .map((rangeSegment) => Number(rangeSegment.trim()));

      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          resultSet.add(i);
        }
      }
    } else {
      const unprocessedRangePortion = Number(rangePortion);
      if (!isNaN(unprocessedRangePortion)) {
        resultSet.add(Number(rangePortion.trim()));
      }
    }
  });
  const resultArray = Array.from(resultSet).sort((a, b) => a - b);
  if (resultArray?.[0] == 0) return [];
  return resultArray;
}

// multi-input open/close state management

export function useMultiInputState() {
  const [isOpenMultiInput, setIsOpen] = useState(false);
  const handleToggleMultiInputState = () => setIsOpen((prev) => !prev);
  // const close = () => setIsOpen(false);
  return { isOpenMultiInput, handleToggleMultiInputState };
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
