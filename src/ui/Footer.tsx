import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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

      <InfoButtonForModal buttonBackgroundColor="light" imgSrc="images/info/about.png" alt="info button">
        <div>'hello test'</div>
      </InfoButtonForModal>
    </StyledFooter>
  );
}
