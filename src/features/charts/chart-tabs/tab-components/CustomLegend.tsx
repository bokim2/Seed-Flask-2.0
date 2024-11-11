// import styled from 'styled-components';

// type TColorBox = {
//     $color: string;
// }

// const LegendWrapper = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;

//     outline: 1px solid red;
// `

// const LegendItem = styled.div`
//     display: flex;
//     align-items: center;
//     white-space: nowrap;
//     gap: 3px;
// `

// const ColorBox = styled.div<TColorBox>`
//     --color-box-size: 12px;
//     height: var(--color-box-size);
//     width: var(--color-box-size);
//     background-color: ${({ $color }) => $color}; 
// `

// export default function CustomLegend({ datasets }) {
//     return (
//       <LegendWrapper

//       >
//         {datasets.map((dataset, index) => (
//           <LegendItem
//             key={index}
           
//           >
//             <ColorBox
//             $color={dataset.borderColor}
//             //   style={{
//             //     display: 'inline-block',
//             //     width: '12px',
//             //     height: '12px',
//             //     backgroundColor: dataset.borderColor,
//             //     marginRight: '5px',
//             //   }}
//             />
//             <div>{dataset.label}</div>
//           </LegendItem>
//         ))}
//       </LegendWrapper>
//     );
//   }
  