import React, { useEffect, useState } from 'react';
import CellbanksSingleInputForm from '../features/cellbanks/CellbanksSingleInputForm';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import { InnerPageContainer, LoaderWrapper, PageContainer, Wrapper } from '../styles/UtilStyles';
import { useCellbanks } from '../lib/hooks';
import CellbanksMultiInputForm from '../features/cellbanks/CellbanksMultiInputForm';
import styled from 'styled-components';
import ErrorMessage from '../ui/ErrorMessage';
import LoaderBar from '../ui/LoaderBar';

export default function CellbankPage() {
  const [cellbanks, isLoading, error] = useCellbanks();
  

  // const fetchCellbanks = async () => {
  //   const res = await fetch(`${baseUrl}/api/cellbanks`);
  //   const { data } = await res.json();
  //   // console.log(data, 'in fetchcellbanks')
  //   setCellbanks(data);
  //   return data;
  // };

  // useEffect(() => {
  //   fetchCellbanks();
  //   // setCellbanks(data)
  // }, []);
  // const handleEditForm = (e) => {}

  return (
    <PageContainer id="CellbankPageContainer">
      <LoaderWrapper>
        {isLoading && <LoaderBar />}
      </LoaderWrapper>
      <InnerPageContainer id="CellbankInnerPageContainer">
        {/* {JSON.stringify(cellbanks)} */}
        <CellbanksMultiInputForm />
        <CellbanksSingleInputForm />
        {error && <ErrorMessage error={error} />}
        {!isLoading && <CellbanksTable cellbanks={cellbanks}  />}
      </InnerPageContainer>
    </PageContainer>
  );
}
