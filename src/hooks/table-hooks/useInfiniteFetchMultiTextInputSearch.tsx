import { useState } from 'react';
import { baseUrl } from '../../../configs';
import { TError } from '../../features/cellbanks/CellbanksTable';
import { getUtcTimestampFromLocalTime, useAppSelector } from '../hooks';
import { FetchTableDataArgs } from './useFetchValidatedTableQuery';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteFetchMultiTextInputSearch({
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

  const [searchTrigger, setSearchTrigger] = useState(false);

  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);

  const queryOptions = {
    queryKey: [tablePathName, "search", pageLimitSetting],
    queryFn: ({ pageParam = 0 }) => performInputTextSearch({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const nextPage = lastPage?.data?.length
        ? allPages?.length + 1
        : undefined;
      return nextPage;
    },
    enabled: searchTrigger,
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(queryOptions);

  // Function to handle updating the search criteria array
  // const updateSearchCriteria = (criteria) => {
  //   setSearchCriteria(criteria);
  // };
  //   const [error, setError] = useState<string | null>(null);

  async function performInputTextSearch({ pageParam = 0 }: FetchTableDataArgs) {
    const params = new URLSearchParams();

    searchCriteria.forEach((criterion) => {
      if (criterion && criterion.text !== '') {
        params.append('searchField[]', criterion.field);
        params.append('searchText[]', criterion.text);
      }
    });
    console.log(
      searchCriteria,
      'searchCriteria in performInputTextSearch',
      'params',
      params.toString()
    );
    const offset = pageParam * pageLimitSetting;
    params.append('offset', offset.toString());
    params.append('limit', pageLimitSetting.toString());

    console.log(
      'cellbanks/search url that is sent for fetch call',
      `${baseUrl}/api/${tablePathName}/search?${params}`
    );
    try {
      const response = await fetch(
        `${baseUrl}/api/${tablePathName}/search?${params}`,
        { credentials: 'include' }
      );
console.log('right after fetch in performInputTextSearch')
      const data = await response.json();
      console.log(data, 'data in performInputTextSearch');
      if (!response.ok) {
        const error: TError = {
          message: data?.message || 'Failed to perform input text search',
        };
        setSearchMultiError(error.message);
        console.log(error, 'error in performInputTextSearch the error STATE');
        throw new Error(error.message);
      }
      console.log('data.ROWS in performInputTextSearch', data);
      if (data && data?.data && data?.data?.length === 0) {
        const error: TError = {
          message:
            data?.message ||
            'No matches with current filter criterias.  Try removing the last one that was added.',
        };
        setSearchMultiError(error.message);
        console.log(error, 'error in performInputTextSearch the error STATE');
        throw new Error(error.message);
      }
      // setSearchedData(data);
      return data;
    } finally {
      setSearchTrigger(false);
    }
  }

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
    setSearchMultiError(null);
    setSearchTrigger(true);
    await refetch();
    // const data = await performInputTextSearch();
    // console.log('performInputTextSearch', data);
    // setSearchedData(data);
    // console.log(data); // Do something with the data
  };

  const handleSearchClear = (tableColumnsHeaderCellsArray) => {
    console.log(initialSearchCriteria, 'initialSearchCriteria');
    const resetSearch = tableColumnsHeaderCellsArray.map((criterion, i) => {
      return { field: criterion, text: '' };
    });
    setSearchCriteria(resetSearch);
    setSearchedData(null);
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
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
