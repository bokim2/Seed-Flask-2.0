import React, { useEffect, useState } from 'react';
import CellbanksSingleInputForm from '../features/cellbanks/CellbanksSingleInputForm';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles';
import { useCellbanks } from '../lib/hooks';
import CellbanksMultiInputForm from '../features/cellbanks/CellbanksMultiInputForm';
import styled from 'styled-components';




export default function CellbankPage() {
  const [cellbanks, isLoading, error] = useCellbanks();
  
  // const [cellbanks, setCellbanks] = useState<any>([]);

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

  return (
    <PageContainer id="CellbankPageContainer">
      <InnerPageContainer id="CellbankInnerPageContainer">
        {/* {JSON.stringify(cellbanks)} */}
        <CellbanksMultiInputForm />
        <CellbanksSingleInputForm />
        <CellbanksTable cellbanks={cellbanks} />
      </InnerPageContainer>
    </PageContainer>
  );
}
