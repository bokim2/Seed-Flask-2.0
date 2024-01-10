import { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// const StyledApp = styled.div`
//   background-color: #e4d0d0;
// `;

function App() {

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<TestComponent />} />
          <Route path="cellbank" element={<h1>cellbank page</h1>}/>
        </Routes>
            <TestComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
