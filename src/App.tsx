// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainNav from './ui/MainNav';
import AppLayout from './AppLayout';
import Dashboard from './pages/HomePage';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingsPage from './pages/SettingsPage';

import SamplePage from './pages/SamplePage';
import HomePage from './pages/HomePage';
import FlaskPage from './pages/FlaskPage';
import CellbankPage from './pages/CellbankPage';
import ChartsPage from './pages/ChartsPage';
import SignInPage from './pages/SignInPage';
import BioreactorPage from './pages/BioreactorPage';

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
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query)=> {
        if (query?.meta?.errorMessage) {
          console.log(query.meta.errorMessage);
        }
      }
    }),
    mutationCache: new MutationCache({
      onError: (error)=> {
        console.log(error);
      }
    }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        {/* <StyledDiv>

      </StyledDiv> */}
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="cellbank" element={<CellbankPage />} />
              <Route path="flask" element={<FlaskPage />} />
              <Route path="sample" element={<SamplePage />} />
              <Route path="bioreactor" element={<BioreactorPage/>} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="charts" element={<ChartsPage />} />
              <Route path="signin" element={<SignInPage />} />
            </Route>

            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
          {/* <TestComponent /> */}
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
