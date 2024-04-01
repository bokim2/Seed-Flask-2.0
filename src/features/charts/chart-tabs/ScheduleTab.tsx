import React from 'react'
import SchedulesTable from '../../schedules/SchedulesTable'
import { useBookmarkedFlasksGraphData } from '../chart-hooks';
import { useFetchValidatedTableQuery } from '../../../hooks/table-hooks/useFetchValidatedTableQuery';
import { schedulesArraySchema } from '../../schedules/schedules-types';
import ChartsTable from '../ChartsTable';

export default function ScheduleTab({flasks}) {
    const {
        data: schedulesAll,
        isLoading: isLoadingSchedules,
        error: errorSchedules,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching: isFetchingSchedules,
      } = useFetchValidatedTableQuery({
        tableName: 'schedules',
        zodSchema: schedulesArraySchema,
      });

    const {
        data: scheduleData,
        isLoading,
        error,
        isFetching,
        refetch,
      } = useBookmarkedFlasksGraphData([1,42]);


  return (
    <>
    {/* <ChartsTable 
    chartTitle={"Schedules"}
    flasks={schedulesAll}
    bookmarkedFlasks={schedulesAll}/> */}
    <SchedulesTable schedules={schedulesAll}/>
    </>
  )
}
