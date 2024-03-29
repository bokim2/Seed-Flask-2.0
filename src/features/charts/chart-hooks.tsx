import { useState } from 'react';
import { baseUrl } from '../../../configs';
import { useQuery } from '@tanstack/react-query';

export function useBookmarkedFlasksGraphData(bookmarkedFlasks) {
//   const [bookmarkedFlasksGraphData, setBookmarkedFlasksGraphData] = useState(
//     []
//   );

  const getBookmarkedFlasksGraphData = async () => {
    try {
      if (bookmarkedFlasks.length === 0) return;
      console.log(bookmarkedFlasks, 'in getBookmarkedFlasksGraphData');
      console.log(bookmarkedFlasks.join(','), bookmarkedFlasks.join(','));
      const response = await fetch(
        `${baseUrl}/api/chart/flasks?flaskIds=${bookmarkedFlasks.join(',')}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const { data } = await response.json();
      console.log(data, 'in getBookmarkedFlasksGraphData');
    //   setBookmarkedFlasksGraphData(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Fetching error:', err.message);
      } else {
        console.log('Unknown error:', err);
      }
      // Handle the error according to your application's needs
    }
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['bookmarkedFlasksGraphData', JSON.stringify(bookmarkedFlasks)],
    queryFn: getBookmarkedFlasksGraphData,
  });

  return { data, isLoading, error, isFetching, refetch }
}
