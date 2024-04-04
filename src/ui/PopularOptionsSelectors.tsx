import React from 'react';

export default function PopularOptionsSelectors({
  popularOptions,
  columns,
  i,
  selectPopularOption,
}) {
  if (!popularOptions) return null;
//   console.log(popularOptions, columns, 'in popular options selectors');

  const tr: any = [];
  console.log('tr', tr);
  columns.forEach((column) => {
    console.log(
      'popularOptions?.cell_bank_id[0] in foreach',
      popularOptions[0]
    );
    if (popularOptions?.[0]?.[column]?.[i]) {
      const value = popularOptions?.[0]?.[column]?.[i] ?? '';
      tr.push(
        <td
          key={`${column}-${i}`}
          onClick={() => selectPopularOption(column, value)}
        >
          {popularOptions?.[0]?.[column]?.[i]}
        </td>
      );
    } else {
      tr.push(<td key={`${column}-${i}`}></td>);
    }
  });

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
    </>
  );
}
