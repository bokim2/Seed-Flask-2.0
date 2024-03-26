import React, { useEffect } from 'react';
import { cellbanksTableHeaderCellsArray } from '../features/cellbanks/cellbanks-types';
import {
  ButtonsContainer,
  SearchInputAndButtonContainer,
  TableHeaderCell,
  TableSearchInput,
} from '../styles/UtilStyles';
import styled from 'styled-components';
import Button from './Button';
import { useMultiTextInputSearch } from '../hooks/table-hooks/useMultiTextInputSearch';
import { useInfiniteFetchMultiTextInputSearch } from '../hooks/table-hooks/useInfiniteFetchMultiTextInputSearch';

export const SearchTableRow = styled.tr`
  display: none;
  background-color: hsl(0, 0%, 0%, 0.5);
  &:nth-of-type(2n) {
    background-color: hsl(0, 0%, 0%, 0.2);
  }

  &:hover {
    background-color: hsl(0, 0%, 0%, 0);
    /* font-size: 120%; */
    /* transform: scale(1.01); */
  }

  @media (min-width: 850px) {
    display: table-row;
  }
`;

export default function SearchFormRow({
  setSearchedData,
  tablePathName,
  tableColumnsHeaderCellsArray,
  setSearchMultiError,
}) {
  // const {
  //   searchCriteria,
  //   handleSearchTextChange,
  //   handleSearchSubmit,
  //   handleSearchClear,
  // } = useMultiTextInputSearch({
  //   tableColumnsHeaderCellsArray,
  //   tablePathName,
  //   setSearchedData,
  //   setSearchMultiError,
  // });

  const {
    data,
    searchCriteria,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchClear,
  } = useInfiniteFetchMultiTextInputSearch({
    tableColumnsHeaderCellsArray,
    tablePathName,
    setSearchedData,
    setSearchMultiError,
    
  });

useEffect(()=> {
  if(data){
  setSearchedData(data)
  }
},[data])

  console.log('useInfiniteFetchMultiTextInputSearch data', data);
  // useEffect(() => {
  //   console.log(searchError, 'searchError');
  //   if (searchError) {
  //     setSearchMultiError(
  //       'searchError, no matching data found. Please try again.'
  //     );
  //   }
  // }, [searchError]);

  return (
    // <StyledSearchFormRow>
    <SearchTableRow>
      {/* <form onSubmit={handleSubmit}> */}
      {tableColumnsHeaderCellsArray.map((criterion, index) => (
        <TableHeaderCell>
          <SearchInputAndButtonContainer>
          <TableSearchInput
            data-column={criterion}
            value={searchCriteria[index].text}
            onChange={(e) => handleSearchTextChange(e, index)}
            placeholder="search..."
          />
          <Button
            $size="xxs"
            $variation="round"
            type="button"
            onClick={handleSearchSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                (e) => handleSearchSubmit(e);
              }
            }}
          >
            s
          </Button>
          </SearchInputAndButtonContainer>
        </TableHeaderCell>
      ))}
      <TableHeaderCell>
        <ButtonsContainer>
          {/* <Button
            $size="xs"
            type="button"
            onClick={handleSearchSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                (e) => handleSearchSubmit(e);
              }
            }}
          >
            Search
          </Button> */}
          <Button
            $size="xs"
            type="button"
            onClick={() => handleSearchClear(cellbanksTableHeaderCellsArray)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                () => handleSearchClear(cellbanksTableHeaderCellsArray);
              }
            }}
          >
            Clear
          </Button>
        </ButtonsContainer>
      </TableHeaderCell>
    </SearchTableRow>
  );
}
