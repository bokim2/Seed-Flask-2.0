import React, { useEffect } from 'react';
import { cellbanksTableHeaderCellsArray } from '../features/cellbanks/cellbanks-types';
import {
  ButtonsContainer,
  LoaderWrapper,
  SearchInputAndButtonContainer,
  TableHeaderCell,
  TableSearchInput,
} from '../styles/UtilStyles';
import styled from 'styled-components';
import Button from './Button';
import { useMultiTextInputSearch } from '../hooks/table-hooks/useMultiTextInputSearch';
import { useInfiniteFetchMultiTextInputSearch } from '../hooks/table-hooks/useInfiniteFetchMultiTextInputSearch';
import LoaderBar from './LoaderBar';
import { formatColumnName } from '../hooks/hooks';

export const SearchTableRow = styled.tr`
  /* display: none; */
  
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
  setSearchLoading,
  
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
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteFetchMultiTextInputSearch({
    tableColumnsHeaderCellsArray,
    tablePathName,
    setSearchedData,
    setSearchMultiError,
    setSearchLoading,
  });

  useEffect(() => {
    if (data) {
      setSearchedData(data);
    }
  }, [data]);

  console.log('loading', isLoading);
  useEffect(() => {
    setSearchLoading(isFetching);
  }, [isFetching]);

  console.log('useInfiniteFetchMultiTextInputSearch data', data);
  // useEffect(() => {
  //   console.log(searchError, 'searchError');
  //   if (searchError) {
  //     setSearchMultiError(
  //       'searchError, no matching data found. Please try again.'
  //     );
  //   }
  // }, [searchError]);

  console.log(tableColumnsHeaderCellsArray, 'tableColumnsHeaderCellsArray');

  return (
    // <StyledSearchFormRow>
    <>
      <LoaderWrapper>{isLoading && <LoaderBar />}</LoaderWrapper>
      <SearchTableRow>
        {/* <form onSubmit={handleSubmit}> */}
        {tableColumnsHeaderCellsArray.map((criterion, index) => (
          <TableHeaderCell>
            <SearchInputAndButtonContainer data-cell={formatColumnName(criterion)}>
              <TableSearchInput
                data-column={criterion}
                // data-cell="none"
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
              onClick={() => handleSearchClear(tableColumnsHeaderCellsArray)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  () => handleSearchClear(tableColumnsHeaderCellsArray);
                }
              }}
            >
              Clear
            </Button>


            {data  && data?.length > 0 && <Button
              $size="xs"
              type="button"
              onClick={() => fetchNextPage()}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  () => fetchNextPage();
                }
              }}
            >
              load more data
            </Button>}
          </ButtonsContainer>
        </TableHeaderCell>
      </SearchTableRow>
    </>
  );
}
