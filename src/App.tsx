// import { useEffect, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
import TestComponent from './ui/TestComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const StyledDiv = styled.div`
  background-color: #e4d0d0;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledDiv>
        <img src="../public/images/yeast-21.png" alt="yeast" />
      </StyledDiv>
      <BrowserRouter>
        <Routes>
          <Route index element={<h1>main page</h1>} />
          <Route path="cellbank" element={<h1>cellbank page</h1>} />
          <Route path="flask" element={<h1>start flask page</h1>} />
          <Route path="sample" element={<h1>sample page</h1>} />
          <Route path="bioreactor" element={<h1>bioreactor page</h1>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
        <TestComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
