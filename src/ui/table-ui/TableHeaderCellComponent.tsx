import { useState } from 'react';

import SortTableColumnsArrows from './SortTableColumnsArrows';
import { formatColumnName } from '../../hooks/hooks';
import { TableHeaderCell, TableHeaderCellInnerContainer } from '../../styles/table-styles/tableStyles';

type TTableHeaderCellComponent = {
  handleSortColumn?: (columnName: string)=> void;
  sortColumn?: string;
  columnName?: string;
}

export default function TableHeaderCellComponent({
  // searchField,
  handleSortColumn,
  sortColumn,
  columnName,
}) {
  return (
    <>
      <TableHeaderCell
        data-cell={columnName}
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
