import styled from 'styled-components';

export const SampleAmountContainer = styled.div`
  /* display: none; */
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.4;
  max-height: 60vh;
  background-color: white;
  display: block;
  width: 4rem;
  position: relative;
 
  strong {
    font-family: var(--font-serif);
    font-weight: 900;
    /* color: grey; */
  }

  @media (min-width: 850px) {
    width: 7rem;
    font-size: 1.2rem;
  }
`;

export const DiluentAmountContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: var(--media-height); */
  background-color: #98dcf5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CultureAmountContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  /* height: var(--media-height); */
  background-color: #e8c142;
`;

export const StyledP = styled.p`
  text-align: center;
  color: var(--clr-text-2);
`;
export const StyledSampleP = styled.p`
  position: absolute;
  /* top: -1.6rem; */

  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--clr-text-2);
  z-index: 10;
`;
export const StyledCenteredP = styled.p`
  /* margin-top: auto; */
  text-align: center;
  color: var(--clr-text-2);
`;
export const StyledTotalP = styled.p`
  /* position: absolute; */
  /* bottom: 0; */
  /* margin-top: auto;  */
  text-align: center;
  color: var(--clr-text-2);
`;

export const Container = styled.div`
  height: 100%;
    display: block;
  width: 4rem;
  position: relative;
`;

export default function DilutionAmountAnimation({
  diluentUL,
  sampleUL,
  dilutionFactor,
}) {
  const totalUL = diluentUL + sampleUL;
  const diluentHeight = diluentUL / (diluentUL + sampleUL);
  const cultureHeight = sampleUL / (diluentUL + sampleUL);
  // console.log('mediaHeight', diluentHeight, cultureHeight);
  const liquidHeight = 60;
  return (
    // <Container id="animation-container">
      <SampleAmountContainer>
        <CultureAmountContainer
          style={{
            height: `${(cultureHeight + diluentHeight) * liquidHeight}%`,
          }}
        >
          <StyledSampleP>
            {sampleUL} uL <br /> <strong>sample</strong>
          </StyledSampleP>
        </CultureAmountContainer>
        <DiluentAmountContainer
          style={{ height: `${diluentHeight * liquidHeight}%` }}
        >
          <StyledCenteredP>
            {diluentUL} uL <br /> <strong>diluent</strong>
          </StyledCenteredP>
        </DiluentAmountContainer>
        {/* <StyledTotalP>
        {totalUL} uL <br /> <strong>total</strong>
      </StyledTotalP> */}
      </SampleAmountContainer>
    // </Container>
  );
}
