import React, { useState } from 'react';
import SchedulesTable from '../../schedules/SchedulesTable';
import { useBookmarkedFlasksGraphData } from '../chart-hooks';
import { useFetchValidatedTableQuery } from '../../../hooks/table-hooks/useFetchValidatedTableQuery';
import { schedulesArraySchema } from '../../schedules/schedules-types';
import ChartsTable from '../ChartsTable';
import FlasksListGraph from '../graphs/FlasksListGraph';

export default function ScheduleTab({ flasks }) {
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

  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  // const {
  //     data: scheduleData,
  //     isLoading,
  //     error,
  //     isFetching,
  //     refetch,
  //   } = useBookmarkedFlasksGraphData([1,42]);
  const selectIdHandler = (id) => {
    setSelectedScheduleId(id);
  };

  const selectedSchedule = schedulesAll.filter(
    (schedule) => schedule.schedule_id === selectedScheduleId
  );

  const flasksList: number[] =
    selectedSchedule[0]?.current_flasks.concat(
      selectedSchedule[0]?.flask_bookmark
    ) || [];

  return (
    <>
      <p>Selected Schedule Id: {JSON.stringify(selectedScheduleId)}</p>
      {/* <ChartsTable 
    chartTitle={"Schedules"}
    flasks={schedulesAll}
    bookmarkedFlasks={schedulesAll}/> */}
      <FlasksListGraph flasksList={flasksList} />
      <SchedulesTable
        schedules={schedulesAll}
        selectIdHandler={selectIdHandler}
      />
    </>
  );
}
