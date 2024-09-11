
// chart / graph

import styled from 'styled-components';

export const GraphAndLegendContainer = styled.div`

`;

export const GraphContainer = styled.div`
  /* max-height: 60vh; */
  width: 100%;
  aspect-ratio: 1 / 1;
  /* height: 50vh; */
  /* max-width: 100%; */

  &:hover {
    cursor: crosshair;
  }
  @media (min-width: 850px) {
    aspect-ratio: 1 / 1.5;
    height: 60vh;
    padding: 1rem;
    /* height: 80vh; */
  }
`;
