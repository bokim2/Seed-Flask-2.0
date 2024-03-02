// import {
//   CultureAmountContainer,
//   DiluentAmountContainer,
//   StyledCenteredP,
//   StyledSampleP,
// } from './DilutionAmountAnimation';
// import {
//   CultureContainer,
//   DiluentContainer,
//   SampleContainer,
// } from './dilutions-styles';

// export default function DilutionAnimation({
//   diluentUL,
//   sampleUL,
//   dilutionFactor,
// }) {
//   const totalUL = diluentUL + sampleUL;
//   const diluentHeight = diluentUL / (diluentUL + sampleUL);
//   const cultureHeight = sampleUL / (diluentUL + sampleUL);
//   console.log('mediaHeight', diluentHeight, cultureHeight);
//   const liquidHeight = 60;
//   return (
//     // <Container id="animation-container">
//     <SampleContainer>
//       <CultureAmountContainer
//         style={{ height: `${(cultureHeight + diluentHeight) * liquidHeight}%` }}
//       >
//         <StyledSampleP>
//           {sampleUL} uL <br /> <strong>sample</strong>
//         </StyledSampleP>
//       </CultureAmountContainer>
//       <DiluentAmountContainer
//         style={{ height: `${diluentHeight * liquidHeight}%` }}
//       >
//         <StyledCenteredP>
//           {diluentUL} uL <br /> <strong>diluent</strong>
//         </StyledCenteredP>
//       </DiluentAmountContainer>
//       {/* <StyledTotalP>
//         {totalUL} uL <br /> <strong>total</strong>
//       </StyledTotalP> */}
//     </SampleContainer>
//     // </Container>
//   );
// }
