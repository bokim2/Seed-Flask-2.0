import React, { useState } from 'react';
import styled from 'styled-components';


export const StyledTabSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 10px solid red; */
  /* background-color: lightpink; */
`;

export const StyledTabSelectorInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 10px solid red;
  /* background-color: lightpink; */
  /* flex-grow: 1; */
  /* position: relative; */
  /* transform: translateY(-10px); */
`;

export const StyledTabUl = styled.ul`
  display: none;
  
  @media (min-width: 800px){
      /* display: block; */
      display: flex;
      /* flex-wrap: wrap; */
      align-items: stretch;
      /* justify-content: stretch; */
      height: 100%;
  }
`;

export const StyledTabLi = styled.li`
  /* flex: 1; */
  list-style: none;
  display: flex;
  /* align-items: stretch;
  justify-content: stretch; */
`;

export const TabButton = styled.button`
  /* flex-grow: 1;
width: 100%; */
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
/* transform: scale(.95); */
outline: none;
border: .25px solid lightgrey;

  &:active,
  &:focus,
  &.activeTab {
  
    background-color: lightgreen;
    /* transform: scale(1.05); */
  }
`;

export const DropdownSelect = styled.select`
background: lightblue;
border-radius: 5px;
display: block;
padding: .5rem 1rem;

@media(min-width: 800px){
    display: none;
}
`;

export const DropdownOption = styled.option`
background: lightblue;
display: block;

@media(min-width: 800px){
    display: none;
}
`;

type TTabSelectorContainer = {
  children: React.ReactNode;
  chartsTabNamesAndValues: Record<string, string>;
}

export default function TabSelectorContainer({ children, chartsTabNamesAndValues }: TTabSelectorContainer) {
  const [selectedTabName, setSelectedTabName] = useState('all');

  return (
    <StyledTabSelectorContainer>
      <StyledTabUl>
        {Object.entries(chartsTabNamesAndValues).map(([key, value]) => (
          <StyledTabLi key={key}>
            <TabButton
              className={selectedTabName === key ? 'activeTab' : ''}
              value={key}
              onClick={() => setSelectedTabName(key)}
            >
              {value}
            </TabButton>
          </StyledTabLi>
        ))}
      </StyledTabUl>

      {/* dropdown for mobile */}
      <DropdownSelect
        value={selectedTabName}
        onChange={(e) => setSelectedTabName(e.target.value)}
      >
        {Object.entries(chartsTabNamesAndValues).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </DropdownSelect>
      <StyledTabSelectorInnerContainer>
        {children}
      </StyledTabSelectorInnerContainer>
    </StyledTabSelectorContainer>
  );
}
