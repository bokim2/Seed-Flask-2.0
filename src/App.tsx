// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainNav from './ui/MainNav';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Home';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Settings from './pages/Settings';
import Cellbank from './pages/Cellbank';
import Flask from './pages/Flask';

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
  const queryClient = new QueryClient();
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
              <Route index element={<Dashboard />} />
              <Route path="cellbank" element={<Cellbank/>} />
              <Route path="flask" element={<Flask/>} />
              <Route path="sample" element={<h1>sample page</h1>} />
              <Route path="bioreactor" element={<h1>bioreactor page</h1>} />
              <Route path="settings" element={ <Settings/>} />
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
