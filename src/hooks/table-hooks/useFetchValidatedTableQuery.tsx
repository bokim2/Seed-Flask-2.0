import { z } from 'zod';
import { baseUrl } from '../../../configs';
import { useAppSelector } from '../hooks';
import { useInfiniteQuery } from '@tanstack/react-query';

// fetch rows in table - INFINITE SCROLL
export function useFetchValidatedTableQuery({ tableName, zodSchema }) {
  type FetchTableDataArgs = {
    pageParam?: number;
  };

  // setting page limit - getting global state from redux store
  const pageLimitSetting = useAppSelector((state) => state.page.LIMIT);
  // console.log('pageLimitSetting', pageLimitSetting);

  const fetchTableData = async ({ pageParam = 0 }: FetchTableDataArgs) => {
    try {
      const url = `${baseUrl}/api/${tableName}?offset=${
        pageParam * pageLimitSetting
      }&limit=${pageLimitSetting}`; // Example for offset pagination
      const response = await fetch(url, { credentials: 'include' });

      const data = await response.json();
      // return data;
      if (!response.ok) {
        // Use the server-provided error message if available, otherwise, a generic error message
        const errorMessage =
          data?.error ||
          data?.message ||
          `Failed to fetch from ${tableName}, status: ${response.status}`;
        throw new Error(errorMessage);
      }
      // console.log('data in useFetchValidatedTableQuery', data);

      const serverDataSchema = z.object({
        status: z.string(),
        data: zodSchema,
      });

      // validation ON
      const validatedData = serverDataSchema.safeParse(data);
      // console.log(validatedData, 'validatedData');
      if (!validatedData.success) {
        console.error(
          'useFetchValidatedTableQuery validation error',
          validatedData.error
        );
        throw new Error(`Data validation in ${tableName} table failed`);
      }
      console.log('validatedData.data', validatedData.data);
      return validatedData.data;
      // return dbData;

      // TURNED VALIDATION OFF FOR NOW!!!!
    } catch (err) {
      console.log(err, 'error in useFetchValidatedTableQuery');
      throw err;
    }
  };

  const queryOptions = {
    queryKey: [tableName, pageLimitSetting],
    queryFn: ({ pageParam = 0 }) => fetchTableData({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const nextPage = lastPage.data.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
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

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
