import { useState } from 'react';
import {
  TableHeaderCell,
  TableHeaderCellInnerContainer,
} from '../../styles/UtilStyles';
import SortTableColumnsArrows from './SortTableColumnsArrows';
import { formatColumnName } from '../../hooks/hooks';

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
