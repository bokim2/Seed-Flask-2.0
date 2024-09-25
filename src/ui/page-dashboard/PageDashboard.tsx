import React from 'react';
import CellbanksMultiInputForm from '../../features/cellbanks/CellbanksMultiInputForm';
import styled from 'styled-components';
import BentoItem from './BentoItem';
import Button from '../Button';
import { set } from 'date-fns';

const PageDashboardContainer = styled.div`
  background-color: red;
  width: 100%;
`;

const PageDashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const CELLBANK_DASHBOARD = [
  {
    id: 1,
    title: 'CellbanksMultiInputForm',
    component: <CellbanksMultiInputForm />,
  },
  {
    id: 2,
    title: 'Test CellbanksMultiInputForm',
    component: <CellbanksMultiInputForm />,
  },
];

export default function PageDashboard() {
  const [selectedComponent, setSelectedComponent] = React.useState<JSX.Element | null>(
    null
  );
  const handleChoose = (id: number) => {
    const selected = CELLBANK_DASHBOARD.find((item) => item.id === id);
    if (selected && selected?.component) {
      setSelectedComponent(selected?.component);
    }
  };
  return (
    <PageDashboardContainer>
      <PageDashboardGrid>
        <BentoItem $span="2" $bgColor="pink" title="multiinput" onClick={()=>handleChoose(1)}/>
          {/* <CellbanksMultiInputForm /> */}
      
      </PageDashboardGrid>

      <Button>Close</Button>
      {selectedComponent}
    </PageDashboardContainer>

    // <PageDashboardContainer>
    //   <PageDashboardGrid>
    //     <BentoItem $span="2" $bgColor='pink' title='multiinput'>

    //       <CellbanksMultiInputForm />
    //     </BentoItem>
    //      <BentoItem $span="2" $bgColor='pink' title='testing title'>

    //       <CellbanksMultiInputForm />
    //     </BentoItem>
    //   <Button>Close</Button>
    //   </PageDashboardGrid>
    // </PageDashboardContainer>
  );
}
