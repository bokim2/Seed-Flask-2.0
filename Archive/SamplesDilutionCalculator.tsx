// import React, { useState } from 'react';
// import Button from '../../ui/Button';
// import styled from 'styled-components';

// const OuterContainer = styled.div`
//   display: grid;
//   /* grid-auto-flow: column; */
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;
//   font-size: 1.2rem;
//   background-color: rgba(var(--clr-accent-5), 0.2);
//   padding: 1rem;
//   border-radius: 15px;
// `;
// const InnerContainer = styled.div`
//   display: flex;
//   gap: 0.25rem;
// `;

// const CalculationContainer = styled.div``;

// const OD600ReadingInput = styled.input`
//   width: 7ch;
// `;

// const DilutionButton = styled(Button)`
//   &.selected {
//     background-color: rgba(var(--clr-accent-5), 1);
//     color: var(--clr-text-2);
//   }
// `;

// export default function DilutionCalculator() {
//   const [totaluL, setTotaluL] = useState<number>(1000);
//   const [dilutionFactor, setDilutionFactor] = useState(5);
//   const [OD600Reading, setOD600Reading] = useState<string>('0.');

//   const dilutionTotaluLOptions = [200, 500, 1000, 1500];
//   const dilutionFactorOptions = [2, 5, 10, 12.5, 15, 20];
//   const estimatedOD600Options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20];

//   return (
//     <div>
//       <p>calculate from total uL</p>
//       <OuterContainer>
//         {/* total ul */}
//         <CalculationContainer>
//           selected total ul: {totaluL}
//         </CalculationContainer>
//         <InnerContainer>
//           {dilutionTotaluLOptions.map((option, i) => (
//             <DilutionButton
//               key={i}
//               $size="xs"
//               value={totaluL}
//               onClick={() => setTotaluL(option)}
//               className={totaluL == option ? 'selected' : ''}
//             >
//               {option}
//             </DilutionButton>
//           ))}
//           <input
//             type="number"
//             placeholder="total uL"
//             value={totaluL}
//             onChange={(e) => setTotaluL(Number(e.target.value))}
//           />
//         </InnerContainer>

//         {/* dilution factor */}
//         <CalculationContainer>
//           selected dilution factor: {dilutionFactor}
//         </CalculationContainer>
//         <InnerContainer>
//           {dilutionFactorOptions.map((option, i) => (
//             <DilutionButton
//               key={i}
//               $size="xs"
//               value={option}
//               onClick={() => setDilutionFactor(option)}
//               className={dilutionFactor == option ? 'selected' : ''}
//             >
//               {option}
//             </DilutionButton>
//           ))}
//           <input
//             type="number"
//             placeholder="total uL"
//             value={dilutionFactor}
//             onChange={(e) => setDilutionFactor(Number(e.target.value))}
//           />
//         </InnerContainer>

//         {/* dilution factor */}
//         <InnerContainer>
//           {`${totaluL - totaluL / Number(dilutionFactor)}uL diluent + ${
//             totaluL / Number(dilutionFactor)
//           }uL sample for a ${dilutionFactor}x dilution`}
//         </InnerContainer>
//         <CalculationContainer>
//           Raw OD600:{' '}
//           <OD600ReadingInput
//             type="text"
//             placeholder="od600 reading"
//             value={OD600Reading}
//             onChange={(e) => setOD600Reading(e.target.value)}
//           />
//           OD600 reading:{' '}
//           {OD600Reading
//             ? (Number(OD600Reading) * Number(dilutionFactor)).toFixed(3)
//             : 'Enter reading from spec'}
//         </CalculationContainer>
//       </OuterContainer>
//     </div>
//   );
// }

// // <select>
// // {dilutionTotaluLOptions.map((dilutionFactor, i) => (
// //     <option value={dilutionFactor} key={i}>
// //     {dilutionFactor}
// //   </option>
// // ))}
// // </select>

// // <select>
// // {dilutionFactorOptions.map((dilutionFactor, i) => (
// //     <option value={dilutionFactor} key={i}>
// //     {dilutionFactor}
// //   </option>
// // ))}
// // </select>

// // enter your dilutions
// //       <input type="number" placeholder="total ul" />
// //       calculate from estimated od600
