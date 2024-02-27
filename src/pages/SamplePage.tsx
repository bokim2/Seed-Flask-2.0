import React, { useEffect, useState } from 'react';
import {
  InnerPageContainer,
  LoaderWrapper,
  PageContainer,
  Wrapper,
} from '../styles/UtilStyles';
import { baseUrl } from '../../configs';
import SamplesTable from '../features/samples/SamplesTable';
import { useFetchValidatedTableQuery } from '../hooks/table-hooks/useFetchValidatedTableQuery';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';
import SamplesMultiInputForm from '../features/samples/SamplesMultiInputForm';
import { samplesInfoArraySchema } from '../features/samples/samples-types';

export default function SamplePage() {
  // const [samples, setSamples] = useState<any>([]);

  // const getSamples = async () => {
  //   const res = await fetch(`${baseUrl}/api/samples`);
  //   const { data } = await res.json();
  //   console.log('data in sample page', data);
  //   setSamples(data);
  //   return data;
  // };

  // useEffect(() => {
  //   getSamples();

  // }, []);

  // const [samples, isLoading, error] = useSamples();
  // console.log('samples', samples);

  const {
    data: samples,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchValidatedTableQuery({
    tableName: 'samples',
    zodSchema: samplesInfoArraySchema,
  });

  const samplesAll = samples?.pages.map((page) => page.data).flat() || [];

  return (
    <PageContainer id="SamplePageContainer">
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>

      <InnerPageContainer id="SampleInnerPageContainer">

        {/* input form and dilution calculator */}
        <SamplesMultiInputForm /> 
        {error && <ErrorMessage error={error} />}

        {!isLoading && samplesAll && <SamplesTable samples={samplesAll} />}
      </InnerPageContainer>
    </PageContainer>
  );
}
