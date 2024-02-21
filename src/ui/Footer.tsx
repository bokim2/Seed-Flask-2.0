import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { CircularButton } from '../pages/HomePage';
import { UserButton } from '../styles/UtilStyles';

import { useOnClickOutside } from '../lib/hooks';
import InfoButtonForModal from './InfoButtonForModal';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
`;

export default function Footer() {
  return (
    <StyledFooter>
      {/* <StyledImg src="images/info/info.png" alt="info button" /> */}

      <InfoButtonForModal imgSrc="images/info/book.png" alt="info button">{<div>'hello test'</div>}</InfoButtonForModal>
    </StyledFooter>
  );
}
