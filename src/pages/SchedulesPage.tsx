import React from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  StyledBackgroundImg,
} from '../styles/UtilStyles';
import LoaderCircular from '../ui/LoaderCircular';
import SchedulesTable from '../features/schedules/SchedulesTable';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import { schedulesArraySchema } from '../features/schedules/schedules-types';
import LoaderBar from '../ui/LoaderBar';
import ErrorMessage from '../ui/ErrorMessage';

export default function SchedulesPage() {
  const {
    data: schedulesAll,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useFetchValidatedTableQuery({
    tableName: 'schedules',
    zodSchema: schedulesArraySchema,
  });
  // console.log('schedules in schedules page', schedules);

  // const schedulesAll = schedules?.pages.map((data) => data.data).flat() || [];

  return (
    <>
      {/* <StyledBackgroundImg
          className="fit-logo"
          src="public/images/progressive/dylann-hendricks-vxd9c9WNauo-unsplash__1_.jpg"
          alt="calysta"
          /> */}
      <PageContainer>
        <LoaderWrapper>
          {(isLoading || isFetching) && <LoaderBar />}
        </LoaderWrapper>
        <InnerPageContainer>
          {/* <LoaderCircular/> three flasks bobbing */}
          {error && <ErrorMessage error={error} />}
          <SchedulesTable schedules={schedulesAll} />
        </InnerPageContainer>
      </PageContainer>
    </>
  );
}
