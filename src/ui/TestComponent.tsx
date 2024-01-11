import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import GlobalStyles from '../styles/GlobalStyles';
import Button from './Button';

const StyledApp = styled.div`
  background-color: #e4d0d0;
`;

export default function TestComponent() {
    const [flask, setFlask] = useState({});

    

    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log('in fetch data', import.meta.env.PROD);
          // import.meta.env.PROD === true
          // ? 'api/flasks/1'
          // : 'http://localhost:3000/api/flasks/1'
          const res = await axios.get(
            import.meta.env.PROD === true
              ? 'api/flasks/1'
              : 'http://localhost:3000/api/flasks/1'
          );
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
          <Button variation= 'secondary' size='medium'>Test</Button>
        </StyledApp>
      </>
    );
}
