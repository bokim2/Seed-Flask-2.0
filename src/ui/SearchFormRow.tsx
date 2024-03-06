import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { baseUrl } from '../../configs';
import {
  cellbanksTableHeaderCellsArray,
  cellbanksValidFields,
} from '../features/cellbanks/cellbanks-types';
import { formatColumnName } from '../hooks/hooks';
import {
  ButtonsContainer,
  TableHeaderCell,
  TableRow,
  TableSearchInput,
  TextSearchInput,
} from '../styles/UtilStyles';
import styled from 'styled-components';
import Button from './Button';
import { TError } from '../features/cellbanks/CellbanksTable';

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

export function useTextInputSearch({ tableColumnsHeaderCellsArray }) {
  // Keep search criteria as an array of objects { field, text }
  const initialSearchCriteria = tableColumnsHeaderCellsArray.map(
    (criterion) => {
      return { field: criterion, text: '' };
    }
  );
  const [searchCriteria, setSearchCriteria] = useState<any>(
    initialSearchCriteria
  );

  // Function to handle updating the search criteria array
  // const updateSearchCriteria = (criteria) => {
  //   setSearchCriteria(criteria);
  // };
  const [error, setError]= useState<string | null>(null)

  const performInputTextSearch = async (tableName) => {
    // Construct URLSearchParams with multiple searchField and searchText entries
    const params = new URLSearchParams();
    searchCriteria.forEach((criterion) => {
      params.append('searchField[]', criterion.field);
      params.append('searchText[]', criterion.text);
    });

    try {
      const response = await fetch(
        `${baseUrl}/api/${tableName}/search?${params}`
      );
      const data = await response.json();
      console.log(data, 'data in performInputTextSearch')
      if (!response.ok) {
        const error: TError = { message: data?.message || 'Failed to perform input text search' };
        setError(error.message);
        console.log(error, 'error in performInputTextSearch the error STATE')
        throw new Error(error.message);

      }
      return data;
    } catch (err) {
      console.error('Error in performInputTextSearch', err);
      return [];
      
    }
  };

  return {
    searchCriteria,
    setSearchCriteria,
    // updateSearchCriteria,
    performInputTextSearch,
    initialSearchCriteria,
    error,
    // setError
  };
}

export default function SearchFormRow({
  setSearchedData,
  tableName,
  tableColumnsHeaderCellsArray,
  setSearchMultiError,
  
}) {
  const {
    searchCriteria,
    setSearchCriteria,
    // updateSearchCriteria,
    performInputTextSearch,
    initialSearchCriteria,
    error: searchError,
    // setError: searchSetError
  } = useTextInputSearch({ tableColumnsHeaderCellsArray });

  // const handleAddCriteria = () => {
  //   updateSearchCriteria([...searchCriteria, { field: 'cell_bank_id', text: '' }]);
  // };

  // const handleRemoveCriteria = (index) => {
  //   const newCriteria = [...searchCriteria];
  //   newCriteria.splice(index, 1);
  //   updateSearchCriteria(newCriteria);
  // };

  // const handleFieldChange = (index, value) => {
  //   const newCriteria = [...searchCriteria];
  //   newCriteria[index].field = value;
  //   updateSearchCriteria(newCriteria);
  // };
  useEffect(() => {
    console.log(searchError, 'searchError')
    if(searchError){
      setSearchMultiError(searchError)
    }
  },[searchError])

  const handleTextChange = (e, index) => {
    const newCriteria = [...searchCriteria];
    const column = e.target.getAttribute('data-column');
    const textInput = e.target.value;
    newCriteria[index].field = column;
    newCriteria[index].text = e.target.value;
    setSearchCriteria(newCriteria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await performInputTextSearch(tableName);
    console.log('performInputTextSearch', data);
    setSearchedData(data);
    console.log(data); // Do something with the data
  };
  const handleClear = () => {
    console.log(initialSearchCriteria, 'initialSearchCriteria')
    const resetSearch = cellbanksTableHeaderCellsArray.map((criterion, i) => {
      return {field: criterion, text: ''};
    });
    setSearchCriteria(resetSearch)
    setSearchedData([]);
    setSearchMultiError(null)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    // <StyledSearchFormRow>
    <SearchTableRow>
      {/* <form onSubmit={handleSubmit}> */}
      {cellbanksTableHeaderCellsArray.map((criterion, index) => (
        <TableHeaderCell>
          <TableSearchInput
            data-column={criterion}
            value={searchCriteria[index].text}
            onChange={(e) => handleTextChange(e, index)}
            placeholder="Search Text"
          />
        </TableHeaderCell>
      ))}
      <TableHeaderCell>
        <ButtonsContainer>
          <Button
            $size="xs"
            type="button"
            onClick={handleSubmit}
            onKeyPress={handleKeyPress}
          >
            Search
          </Button>
          <Button
            $size="xs"
            type="button"
            onClick={handleClear}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleClear();
              }
            }}
          >
            Clear
          </Button>
        </ButtonsContainer>
      </TableHeaderCell>
      {/* </form> */}
    </SearchTableRow>
    // </StyledSearchFormRow>
  );
}
