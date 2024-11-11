import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import InfoButtonForModal from './InfoButtonForModal';
import SideMenu from './nav-ui/SideMenu';

const StyledFooter = styled.footer`
  position: fixed;
  z-index: 99999;
  width: 100%;
  bottom: 0;
  left: 0;
`;

export default function Footer() {
  return (
    <StyledFooter>
      {/* <StyledImg src="/images/info/info.png" alt="info button" /> */}

      <SideMenu />
    </StyledFooter>
  );
}
