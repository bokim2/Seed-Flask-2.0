import React, { useEffect, useState } from 'react';
import CellbanksSingleInputForm from '../features/cellbanks/CellbanksSingleInputForm';
import { baseUrl } from '../../configs';
import CellbanksTable from '../features/cellbanks/CellbanksTable';
import { InnerPageContainer, PageContainer } from '../styles/UtilStyles';
import { useCellbanks } from '../lib/hooks';
import CellbanksMultiInputForm from '../features/cellbanks/CellbanksMultiInputForm';
import styled from 'styled-components';

export const CellbankPageContainer = styled.section`
  margin-top: 16vh;

  justify-content: center;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
align-items: center;
`;

export const CellbankInnerPageContainer = styled.section`

width: 90%;
/* display: flex;
flex-direction: column;  */

`;



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
    <CellbankPageContainer id="CellbankPageContainer">
      <CellbankInnerPageContainer id="CellbankInnerPageContainer">
        {/* {JSON.stringify(cellbanks)} */}
        <CellbanksMultiInputForm />
        <CellbanksSingleInputForm />
        <CellbanksTable cellbanks={cellbanks} />
      </CellbankInnerPageContainer>
    </CellbankPageContainer>
  );
}
