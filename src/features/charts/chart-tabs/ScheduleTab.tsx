import React, { useEffect, useState } from 'react';
import SchedulesTable from '../../schedules/SchedulesTable';
import { useFetchBookmarkedFlasksGraphData } from '../chart-hooks';
import { useFetchValidatedTableQuery } from '../../../hooks/table-hooks/useFetchValidatedTableQuery';
import { schedulesArraySchema } from '../../schedules/schedules-types';
import ChartsTable from '../ChartsTable';
import FlasksListGraph from '../graphs/FlasksListGraph';
import FlasksTable from '../../flasks/FlasksTable';
import { LoaderWrapper } from '../../../styles/UtilStyles';
import LoaderBar from '../../../ui/LoaderBar';

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
    schedulesAll[0]?.schedule_id || null
  );
  const [flasksList, setFlasksList] = useState<number[]>([]);

  useEffect(() => {
    if (schedulesAll?.length > 0) {
      setSelectedScheduleId(schedulesAll[0]?.schedule_id);
    }
  }, [schedulesAll]);

  console.log(
    'schedulesAll',
    schedulesAll,
    'schedulesAll[0]?.schedule_id',
    schedulesAll[0]?.schedule_id
  );
  // const {
  //     data: scheduleData,
  //     isLoading,
  //     error,
  //     isFetching,
  //     refetch,
  //   } = useFetchBookmarkedFlasksGraphData([1,42]);
  const selectIdHandler = (id) => {
    console.log(
      'selectedScheduleId, selectIdHandler fired',
      selectedScheduleId
    );
    setSelectedScheduleId(id);
  };

  const selectedSchedule = schedulesAll.filter(
    (schedule) => schedule.schedule_id === selectedScheduleId
  );

  useEffect(() => {
    const selectedSchedule = schedulesAll.find(
      (schedule) => schedule.schedule_id === selectedScheduleId
    );
    if (selectedSchedule) {
      const combinedFlasksList = (selectedSchedule.current_flasks || []).concat(
        selectedSchedule.flask_bookmark || []
      );
      if (selectedSchedule?.flask_id) {
        combinedFlasksList.push(selectedSchedule.flask_id);
      }
      setFlasksList(combinedFlasksList);
    }
  }, [selectedScheduleId, schedulesAll]);

  const {
    data: flasksListData,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useFetchBookmarkedFlasksGraphData({
    bookmarkedFlasks: flasksList || [],
    flasksListRoute: 'list',
  });

  console.log(
    'selectedSchedule',
    selectedSchedule,
    'flasksTAbledata',
    flasksListData,
    'flasksList',
    flasksList
  );
  return (
    <>
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>
      <p>Selected Schedule Id: {selectedScheduleId}</p>
      {/* <ChartsTable 
    chartTitle={"Schedules"}
    flasks={schedulesAll}
    bookmarkedFlasks={schedulesAll}/> */}
      <FlasksListGraph flasksList={flasksList} />
      <SchedulesTable
        schedules={schedulesAll}
        selectIdHandler={selectIdHandler}
      />

      <FlasksTable flasks={flasks} flasksListData={flasksListData} />
    </>
  );
}
