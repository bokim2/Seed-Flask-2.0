import React from 'react'
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles'
import LoaderCircular from '../ui/LoaderCircular'
import SchedulesTable from '../features/schedules/SchedulesTable'
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import { schedulesArraySchema } from '../features/schedules/schedules-types';

export default function SchedulesPage() {

  const {
    data: schedules,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchValidatedTableQuery({
    tableName: 'schedules',
    zodSchema: schedulesArraySchema,
  });
  console.log('schedules in schedules page', schedules);

const schedulesAll = schedules?.pages.map((data) => data.data).flat() || [];

  return (
  <PageContainer>
    <InnerPageContainer>
    {/* <LoaderCircular/> three flasks bobbing */}
    <SchedulesTable 
    schedules={schedulesAll}
    />
    </InnerPageContainer>
  </PageContainer>
  )
}
