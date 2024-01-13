import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Button from './Button';
import { baseUrl } from '../../configs.js';
import { useFlask } from '../lib/hooks.js';

const StyledApp = styled.div`
  background-color: #d9d9e7;
`;

export default function TestComponent() {

  const [flasks, setFlasks] = useState<any>([]);

  const [flask, setFlask] = useFlask(1)
  console.log('flask from useFlask', flask);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('in fetch data', import.meta.env.PROD);
        const {data} = await axios.get(`${baseUrl}/api/flasks`);
        console.log('Axios response: FLASKS', data.data);

        setFlasks(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <GlobalStyles /> */}
      <StyledApp>
        app page changing test:  
        {JSON.stringify(flask)}
        <div style={{ color: 'black' }}>{JSON.stringify(flasks)}</div>
        <Button $variation="secondary" $size="medium">
          Test
        </Button>
      </StyledApp>
    </>
  );
}
