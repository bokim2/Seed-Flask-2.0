import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainNav from './ui/nav-ui/MainNav';
import AppLayout from './AppLayout';
import Dashboard from './pages/HomePage';

import SettingsPage from './pages/SettingsPage';

import SamplePage from './pages/SamplePage';
import HomePage from './pages/HomePage';
import FlaskPage from './pages/FlaskPage';
import CellbankPage from './pages/CellbankPage';
import ChartsPage from './pages/ChartsPage';
import BioreactorPage from './pages/BioreactorPage';
import { useEffect, useState } from 'react';
import { baseUrl } from '../configs';

// const StyledDiv = styled.div`
//   /* background-color: #e4d0d0; */
// `;
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 60 * 1000,
//     },
//   },
// });

type TuserProfile = {
  picture: string;
  name: string;
  email: string;
};

function App() {
  const [userProfile, setUserProfile] = useState<TuserProfile | null>(null);

  useEffect(() => {
    async function authProfile() {
      try {
        const response = await fetch(`${baseUrl}/profile`, {
          credentials: 'include', // Include cookies for cross-origin requests
        });
        console.log(response);
        if(response.ok){
        const data = await response.json();
        setUserProfile(data);
        } 
        if (response.status === 401){
          console.log('Error: Not authenticated.  Please sign in.');
        }
        if (response.status === 403){
          console.log('Error: Not authorized to access this resource.');
        }
      } catch (errr) {
        console.log('error', errr);
      }
    }

    // getEnv()
    authProfile();
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* <StyledDiv>

      </StyledDiv> */}
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout userProfile={userProfile} />}>
            <Route index element={<HomePage />} />
            <Route path="cellbank" element={<CellbankPage />} />
            <Route path="flask" element={<FlaskPage />} />
            <Route path="sample" element={<SamplePage />} />
            <Route path="bioreactor" element={<BioreactorPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="charts" element={<ChartsPage />} />
            {/* <Route path="signin" element={<SignInPage />} /> */}
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        {/* <TestComponent /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
