import styled from 'styled-components';
import Select from 'react-select';
import { TTableHeaderCell, TTableRow } from '../../lib/types';
import { FormTextArea } from '../UtilStyles';

// TABLE STYLES

export const TableContainer = styled.div`
  /* --row-color: #FFFFFF;
--row-hover-color: #F4F4F4;
--row-selected-color: #F2F6FC; */

  /* position: relative; */
  /* padding-inline: 10rem; */
  outline: solid 4px red;
  width: 100%;

  @media (min-width: 850px) {
    /* width: auto; */
  }
`;

export const MainFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainFilterSelector = styled(Select)`
  font-family: var(--font-serif);
  /* background-color: transparent; */
  border-radius: 15px;
  padding-inline: 1rem;
`;

export const MainFilterSelectorOption = styled.option``;

export const MainFilterValue = styled.select``;

export const StyledTable = styled.table`
  /* --table-border-radius: 100px;

  border-radius: var(--table-border-radius); */
  /* border-spacing: 0;
  border-collapse: separate; */

  background-color: rgba(var(--clr-table-100), 1); // #262231
  border-collapse: collapse;
  width: 100%;
  text-align: center;
`;

export const Caption = styled.p`
  position: sticky;
  width: 100%;
  text-align: center;
  display: table-caption;

  z-index: 11;
  top: 0vh;
  height: auto;
  /* top: calc(var(--nav-bar-height, 5vh)); */
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: 0.2rem;
  font-size: 1.4rem;
  margin-bottom: 0rem;
  color: var(--clr-text-1);
  background-color: rgba(var(--clr-table-200), 1);
  padding-block: 1vh;
  pointer-events: none;

  /* div {
    position: absolute;
    top: 0;
    z-index: 4;
    height: calc(var(--nav-bar-height, 10vh));
    width: 100vw;
    background-color: red;
  } */
  
  @media (min-width: 850px) {
    height: calc(var(--nav-bar-height, 10vh));
    top: 0;
    /* top: calc(var(--nav-bar-height, 10vh)); */
    
    background-color: rgba(var(--clr-table-200), 1);

    /* top: 0vh; */
    font-size: 2rem;
    /* background-color: transparent; */
  }
`;

export const TableHeaderDiv = styled.div`
  position: sticky;
  /* top: 0; */
  z-index: 10;
  font-family: var(--font-serif);
  font-weight: 900;
  letter-spacing: 0.2rem;
  /* font-size: 1rem; */
  /* margin-bottom: 2rem; */
  color: var(--clr-text-1);
  
  /* padding-block: 1vh; */
  pointer-events: none;
  
  @media (min-width: 850px) {
    /* top: 2vh; */
  }
  `;

export const TableHeader = styled.thead`
/* top: calc(var(--nav-bar-height, 10vh)* 2); */
  /* position: sticky; */
  /* z-index: 10; */
  /* top: 9.7vh; // reference at NavBar styles */

  /* background-color: red; */

  @media (min-width: 850px) {
    position: sticky;
    top: calc(var(--nav-bar-height, 10vh));
  }
`;

// type TTableHeaderCell = {
//   width?: string;
// };

export const TableHeaderCell = styled.th<TTableHeaderCell>`
  outline: 1px solid white;
  /* border: 1px solid white; */
  background-color: rgba(var(--clr-table-500), 1);

  /* font-family: var(--font-serif); */
  /* background-color: orange; */
  /* line-height: .5; */

  padding: 0.5rem;
  font-weight: 500;
  line-height: 1;
  font-size: var(--table-cell-font-size, 0.9rem);
  /* padding: 1rem 2rem; */
  color: rgba(var(--clr-text-2), 0.8);

  width: ${(props) => props.width || 'auto'};

  /* font-family: var(--font-serif);
  letter-spacing: 0.09rem;
  font-weight: 800; */

  &:hover,
  &:focus,
  &:active,
  &.dbsearch {
    cursor: pointer;
    color: var(--clr-accent-7);
    transform: scale(1.05);
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }

  &.dbsearchActive {
    cursor: pointer;
    color: var(--clr-accent-7);
    border-bottom: 2px solid var(--clr-accent-7);
    transform: scale(1.05);
    transition: color 100ms ease-in-out, transform 100ms ease-in-out;
  }

  @media (max-width: 850px) {
    /* display: none; */
    border: none;
    display: flex;
    width: 100%;
  }
`;

export const TableHeaderCellInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.15rem;

  /* svg {
    visibility: hidden;
  } */

  &:hover svg {
    visibility: visible;
  }
`;

export const TableRow = styled.tr`
  /* &:not(:first-of-type) { */
  /* border-bottom: 1px solid rgba(var(--clr-table-500), 1); */
  /* } */

  /* &:first-of-type {
    border-bottom: none;
  } */
  /* background-color: hsl(0, 0%, 0%, 0.01); */
  &:nth-of-type(2n) {
    /* background-color: hsl(0, 0%, 0%, 0.03); */
  }

  /* &:first-child th:first-child {
    border-top-left-radius: 15px;
  }

  &:first-child th:last-child {
    border-top-right-radius: 15px;
  }

  &:last-child td:first-child {
    border-bottom-left-radius: 15px;
  }

  &:last-child td:last-child {
    border-bottom-right-radius: 15px;
  } */

  &:hover {
    /* background-color: hsl(0, 0%, 0%, 0); */
    background-color: var(--clr-table-700);
    /* font-size: 120%; */
    /* transform: scale(1.01); */
  }
`;

export const TableHeaderRow = styled(TableRow)`
  /* border: 1px solid red; */
  /* border-bottom: none; */
  display: none;

  @media (min-width: 850px) {
    display: table-row;
  }
`;

export const TableSearchInput = styled.input`
  font-size: var(--table-cell-font-size, 0.85rem);
  width: 100%;
  background-color: transparent;
  color: inherit;
  outline: none;
  border: none;
  border-bottom: 2px solid rgba(var(--clr-accent-0), 1);
  /* margin: 0.5rem; */
  /* border-radius: 5px; */
  /* padding: 0.5rem; */
  /* width: 200px; */

  /* @media (min-width: 850px) { */
  /* padding: 0rem 1rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.7rem;
    &::before {
      content: attr(data-cell) ':  ';
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    } */
  /* } */
`;

export const TableDataCell = styled.td`
  font-size: var(--table-cell-font-size, 0.2rem);
  border: 1px solid rgba(var(--clr-table-500), 0.8);

  display: table-cell;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;
  /* max-width: 100%; */
  vertical-align: bottom;

  padding: 0.25rem;
  text-transform: none;
  /* max-width: 20vw; */

  &.ellipsis {
    max-width: 20vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &[data-cell='cell bank id'] {
    /* background-color: red !important; */
    cursor: pointer;

    &:hover {
      font-weight: 700;
      color: rgba(var(--clr-accent-6), 0.8);
    }
  }

  &[data-cell='flask id'] {
    /* background-color: red !important; */
    cursor: pointer;

    &:hover {
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 0.8);
    }
  }

  &.clickableId {
    &:active {
      font-weight: 400;
    }
  }

  @media (max-width: 850px) {
    --table-cell-font-size: 0.8rem;

    text-align: left;
    /* display: grid; */
    padding: 0rem 1rem;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: flex-end;
    align-items: flex-end; */
    font-size: var(--table-cell-font-size, 0.8rem);

    &::before {
      content: attr(data-cell) ':  ';
      vertical-align: bottom;
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    }

    /* &[data-cell='none'] {
      button {
        display: none;
      }
    } */

    &.ellipsis {
      display: none;
    }

    /* don't desplay notes or description on mobile */
    /* &[data-cell='notes'], &[data-cell='description'] {
          display: none;
        } */

    &:first-child {
      /* color: rgba(var(--clr-accent-3), 1); */
      font-size: 1rem;
    }
  }
`;

export const EditTextArea = styled(FormTextArea)`
  /* padding-top: 0rem !important; */
  /* text-align: left; */
  /* width: auto; */
  /* font-size: 1rem;
  height: 2rem;
  height: auto; */
  /* box-sizing: content-box; */
  /* background-color: red; */
  /* vertical-align: bottom; */

  /* &::before {
      background-color: red;
      content: attr(data-cell) ':  ';
      font-weight: 700;
      color: rgba(var(--clr-accent-0), 1);
      margin-right: 0.5rem;
    }

    &[data-cell='none']::before {
      content: none;
    } */

  /* line-height: .5; */
  width: 100%;
  height: 1.4rem;
  background-color: transparent;
  color: inherit;
  outline: none;
  /* border: none; */

  @media (min-width: 850px) {
    text-align: center;
    width: 100%;
  }
`;


// for bookmarked rows
export const PreviousDataRow = styled(TableRow)<TTableRow>`
  /* background-color: ${(props) => props.$editing && 'red'};
  &:nth-of-type(2n) {
    background-color: ${(props) => props.$editing && 'red'};
  }
  &:hover {
    background-color: ${(props) => props.$editing && 'red'};
  } */

  /* bookmarked */
  background-color: ${(props) => props.$bookmarked && 'var(--clr-table-700)'};
  /* &:nth-of-type(2n) {
    background-color: ${(props) => props.$bookmarked && 'lightyellow'};
  }
  &:hover {
    background-color: ${(props) => props.$bookmarked && '#F2D17C'};
  } */
`;

export const EditRow = styled.tr`
  /* background-color: rgba(var(--clr-accent-0), 1); */
  background-color: yellow;
  color: turquoise;
`;
