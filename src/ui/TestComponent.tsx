import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Button from './Button';
import { baseUrl } from '../../configs.js';

const StyledApp = styled.div`
  background-color: #e4d0d0;
`;

export default function TestComponent() {
  const [flask, setFlask] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('in fetch data', import.meta.env.PROD);
        const res = await axios.get(`${baseUrl}/api/flasks/1`);
        console.log('Axios response:', res);
        console.log('Data in useEffect:', res.data);
        setFlask(res.data);
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
        app page changing test prod
        {JSON.stringify(flask)}
        <Button $variation="secondary" $size="medium">
          Test
        </Button>
      </StyledApp>
    </>
  );
}
