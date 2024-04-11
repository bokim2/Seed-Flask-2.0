import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainNav from './ui/nav-ui/MainNav';
import AppLayout from './AppLayout';
import Dashboard from './pages/HomePage';

import SettingsPage from './pages/SettingsPage';

import SamplePage from './pages/SamplePage';
import HomePage from './pages/HomePage';
import FlaskPage from './pages/FlaskPage';
import CellbankPage from './pages/CellbankPage';
import ChartsPage from './pages/ChartsPage';
import BioreactorPage from './pages/SchedulesPage';
import { useEffect, useState } from 'react';
import { baseUrl } from '../configs';
import GetStarted from './pages/GetStarted';
import LoaderBar from './ui/LoaderBar';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { updateUserProfile } from './redux/slices/userProfileSlice';
import { TuserProfile } from './redux/slices/userSlice';
import AboutPage from './pages/AboutPage';
import AboutCreator from './features/about/AboutCreator';
import AboutSeedFlask from './features/about/AboutSeedFlask';

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

function App() {
  const userProfile = useAppSelector(
    (state) => state.userProfile.userProfile
  ) as TuserProfile | null;
  const dispatch = useAppDispatch();

  const [userLoading, setUserLoading] = useState<boolean>(true);
  // console.log('userProfile in APP console log before useEffect', userProfile);
  useEffect(() => {
    async function authProfile() {
      try {
        const response = await fetch(`${baseUrl}/api/auth/status`, {
          credentials: 'include', // Include cookies for cross-origin requests
        });
        // console.log(response);
        if (response.ok) {
          const data = await response.json();

          // setUserProfile(data);
          // console.log('userProfile in APP first useEffect', data);
          dispatch(updateUserProfile(data));
        }
        if (response.status === 401) {
          console.log('Error: Not authenticated.  Please sign in.');
        }
        if (response.status === 403) {
          console.log('Error: Not authorized to access this resource.');
        }
      } catch (err) {
        console.log('error', err);
      } finally {
        setUserLoading(false);
      }
    }

    // getEnv()
    authProfile();
  }, []);
  // console.log('userProfile in APP console log after useEffect', userProfile);

  if (userLoading) {
    return <LoaderBar />;
  }

  return (
    <>
      <GlobalStyles />
      {/* <StyledDiv>

      </StyledDiv> */}
      <BrowserRouter>
        <Routes>
          {userProfile && userProfile?.isAuthenticated === true ? (
            <>
              <Route
                element={
                  <AppLayout
                    userProfile={userProfile}
                    // setUserProfile={setUserProfile}
                  />
                }
              >
                <Route index element={<HomePage />} />
                <Route path="cellbank" element={<CellbankPage />} />
                <Route path="flask" element={<FlaskPage />} />
                <Route path="sample" element={<SamplePage />} />
                <Route path="schedule" element={<BioreactorPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="about/*" element={<AboutPage />}/>
                  {/* <Route path="about/seed-flask" element={<AboutSeedFlask />} />
                  <Route path="about/bo" element={<AboutCreator />} /> */}
                {/* </Route> */}
                <Route path="charts" element={<ChartsPage />} />
                {/* <Route path="signin" element={<SignInPage />} /> */}
              </Route>{' '}
            </>
          ) : (
            <>
              <Route
                element={
                  <AppLayout
                    userProfile={userProfile}
                    // setUserProfile={setUserProfile}
                  />
                }
              >
                <Route index element={<GetStarted />} />
                {/* <Route path="cellbank" element={<CellbankPage />} />
                <Route path="flask" element={<FlaskPage />} />
                <Route path="sample" element={<SamplePage />} />
                <Route path="bioreactor" element={<BioreactorPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="charts" element={<ChartsPage />} /> */}
                {/* <Route path="signin" element={<SignInPage />} /> */}
              </Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        {/* <TestComponent /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
