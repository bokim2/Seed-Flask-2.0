import React from 'react';
import { StyledTable } from '../styles/UtilStyles';

export default function PopularOptionsSelectors({ popularOptions, columns, i, selectPopularOption}) {
    if (!popularOptions) return null;
    // console.log(popularOptions, columns, 'in popular options selectors')

const tr: any = []

columns.forEach((column)=> {
    if (popularOptions?.[column]?.[i]) {
        const value = popularOptions?.[column]?.[i] ?? ''
        tr.push(<td key={`${column}-${i}`} onClick={() => selectPopularOption(column, value)}>{popularOptions?.[column]?.[i]}</td>)
    } else {
        tr.push(<td key={`${column}-${i}`}></td>)
    }
})



  return (
  <>
    {tr}
        {/* {columns.map(column => (popularOption[column] &&
        //   popularOptions[column]?.map((option, optionIndex) => (
            <td key={optionIndex}>{option}</td>
            // <div>{JSON.stringify(option)}</div>
          ))} */}
{/* 
         { columns.map((column, rowNumber) => {
            if (popularOptions[column]?.[rowNumber]) {
                return (<td key={rowNumber}>{popularOptions[column][rowNumber]}</td>)
            } else {
                return (<td key={rowNumber}></td>)
            }
          })
          } */}


  </>)
}
