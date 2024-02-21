import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styled from 'styled-components';

export const StyledArrowsContainer = styled.div`
 display: flex;
    flex-direction: column;

    &:hover {
        color: #e8d6d6;
    }

    &.hidden {
        visibility: hidden;
    }
`

export const StyledFaCaretUp = styled(FaCaretUp)`
    &:hover {
        color: #00f7ff;
    }

    &.asc {
        color: red;
    }


`

export const StyledFaCaretDown = styled(FaCaretDown)`
    &:hover {
        color: #00f7ff;
    }

    &.desc {
        color: red;
    }
`

export default function SortTableColumnsArrows({sortColumn, columnName, handleSortColumn}) {
    // console.log('asc or des', sortColumn, columnName, sortColumn?.[columnName], sortColumn?.columnName === 'asc' ? 'asc' : '')

  return (
    <StyledArrowsContainer className={sortColumn?.[columnName] ? '' : 'hidden'}>
      <StyledFaCaretUp className={`${'sort-caret-asc'} ${sortColumn?.[columnName] === 'asc' ? 'asc' : ''}`} onClick={(e) => {
          handleSortColumn(e, columnName, 'asc');
        }}/>
      <StyledFaCaretDown className={`${'sort-caret-desc'} ${sortColumn?.[columnName] === 'desc' ? 'desc' : ''}`} onClick={(e) => {
          handleSortColumn(e, columnName, 'desc');
        }}/>
    </StyledArrowsContainer>
  );
}
