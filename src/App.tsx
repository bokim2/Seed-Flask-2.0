// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainNav from './ui/MainNav';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      {/* <StyledDiv>

      </StyledDiv> */}
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="cellbank" element={<h1>cellbank page</h1>} />
            <Route path="flask" element={<h1>start flask page</h1>} />
            <Route path="sample" element={<h1>sample page</h1>} />
            <Route path="bioreactor" element={<h1>bioreactor page</h1>} />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <TestComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
