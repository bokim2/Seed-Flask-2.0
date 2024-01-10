import { useEffect, useState } from 'react';
import axios from 'axios';
// import './App.css';

// Remove the import statements for useEffect, useState, and axios

function App() {
  // eslint-disable-next-line
  const [flask, setFlask] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('in fetch data', import.meta.env.PROD)
        // import.meta.env.PROD === true
        // ? 'api/flasks/1' 
        // : 'http://localhost:3000/api/flasks/1'
        const res = await axios.get(
          import.meta.env.PROD === true
          ? 'api/flasks/1' 
          : 'http://localhost:3000/api/flasks/1');
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
      <div>
        app page changing test prod
        {JSON.stringify(flask)}
      </div>
    </>
  );
}

export default App;
