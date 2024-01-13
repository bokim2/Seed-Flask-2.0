import { useEffect, useState } from 'react';
import { baseUrl } from '../../configs';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useFlask(id: number| null) {
//   const [flask, setFlask] = useState<any>({});
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // console.log('in fetch data', import.meta.env.PROD);
//         const res = await fetch(`${baseUrl}/api/flasks/${id}`);
//         const data = await res.json();
//         // console.log('Axios response:', res);
//         // console.log('Data in useEffect:', res.data);
//         setFlask(data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

const {isLoading, data} = useQuery({queryKey: ['flask', id],
   queryFn: async () => {
        const res = await fetch(`${baseUrl}/api/flasks/${id}`);
        const data = await res.json();
        // console.log('in query function')
    return data;
    },
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: true,
        retry: false,
        enabled: Boolean(id),
        onError: ()=> console.log('error in useFlask'),
})
// console.log('data in useFlask', data);
const flask = data;
  return [flask, isLoading] as const;
}


export function useFlasks() {
    const {isLoading, data} = useQuery({queryKey: ['flasks'],
       queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/flasks`);
            const data = await res.json();
            console.log('in query function')
        return data;
        },
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: true,
            retry: false,
            enabled: true,
            onError: ()=> console.log('error in useFlask'),
    })
    console.log('data in useFlask', data);
    const flasks = data?.data;
      return [flasks, isLoading] as const;
    }