import { useState } from 'react';
import { baseUrl } from '../../../configs';
import { TError } from '../../features/cellbanks/CellbanksTable';

export function useMultiTextInputSearch({
  tableColumnsHeaderCellsArray,
  tablePathName,
  setSearchedData,
  setSearchMultiError,
}) {
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
  const [error, setError] = useState<string | null>(null);

  const performInputTextSearch = async (tablePathName) => {
    // Construct URLSearchParams with multiple searchField and searchText entries
    const params = new URLSearchParams();
    searchCriteria.forEach((criterion) => {
      params.append('searchField[]', criterion.field);
      params.append('searchText[]', criterion.text);
    });

    try {
      const response = await fetch(
        `${baseUrl}/api/${tablePathName}/search?${params}`
      );
      const data = await response.json();
      console.log(data, 'data in performInputTextSearch');
      if (!response.ok) {
        const error: TError = {
          message: data?.message || 'Failed to perform input text search',
        };
        setError(error.message);
        console.log(error, 'error in performInputTextSearch the error STATE');
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error('Error in performInputTextSearch', err);
      return [];
    }
  };

  const handleSearchTextChange = (e, index) => {
    const newCriteria = [...searchCriteria];
    const column = e.target.getAttribute('data-column');
    const textInput = e.target.value;
    newCriteria[index].field = column;
    newCriteria[index].text = e.target.value;
    setSearchCriteria(newCriteria);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const data = await performInputTextSearch(tablePathName);
    console.log('performInputTextSearch', data);
    setSearchedData(data);
    console.log(data); // Do something with the data
  };
  const handleSearchClear = (tableColumnsHeaderCellsArray) => {
    console.log(initialSearchCriteria, 'initialSearchCriteria');
    const resetSearch = tableColumnsHeaderCellsArray.map((criterion, i) => {
      return { field: criterion, text: '' };
    });
    setSearchCriteria(resetSearch);
    setSearchedData([]);
    setSearchMultiError(null);
  };

  return {
    searchCriteria,
    setSearchCriteria,
    performInputTextSearch,
    initialSearchCriteria,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchClear,
    error,
  };
}
