import { useState } from 'react';
import {
  TableHeaderCell,
  TableHeaderCellInnerContainer,
} from '../../styles/UtilStyles';
import SortTableColumnsArrows from './SortTableColumnsArrows';

export default function TableHeaderCellComponent({
  // searchField,
  searchedData,
  handleSortColumn,
  sortColumn,
  columnName,
}) {

  
  function formatColumnName(columnName) {
    if (columnName === 'human_readable_date') {
      return 'date';
    } else {
      return columnName.replace(/_/g, ' ');
    }
  }

  return (
    <>
      <TableHeaderCell
        data-column-name={columnName}
        // className={`${searchField == columnName ? 'dbsearch' : ''} 
        //           ${
        //             searchField == columnName &&
        //             searchedData?.length > 0 &&
        //             'dbsearchActive'
        //           }`}
      >
        <TableHeaderCellInnerContainer>
          {formatColumnName(columnName)}
          <SortTableColumnsArrows
            handleSortColumn={handleSortColumn}
            columnName={columnName}
            sortColumn={sortColumn}
          />
        </TableHeaderCellInnerContainer>
      </TableHeaderCell>
    </>
  );
}
