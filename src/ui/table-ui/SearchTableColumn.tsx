import React, { useState } from 'react';
import {
  SearchInputPTag,
  SearchSection,
  TableHeaderCellInnerContainer,
  TextSearchContainer,
  TextSearchInput,
} from '../../styles/UtilStyles';
import { ButtonsContainer } from '../../features/samples/SamplesMultiInputForm';
import Button from '../Button';
import SortTableColumnsArrows, {
  StyledArrowsContainer,
  StyledFaCaretDown,
  StyledFaCaretUp,
} from './SortTableColumnsArrows';

export default function SearchTableColumn({
  searchText,
  setSearchText,
  SelectSearchField,
  performInputTextSearch,
  searchField,
  setSearchedData,
}) {
  // searching cellbanks table through text input

  return (
    <SearchSection>
      <h3>
        Click on column to search:
        <SearchInputPTag>
          {` ${
            searchField == 'date_timestampz'
              ? 'date'
              : searchField.replace(/_/g, ' ')
          }`}
        </SearchInputPTag>
      </h3>

      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();
            const data = await performInputTextSearch();
            setSearchedData(data);
          } catch (err) {
            console.log('error', err);
          }
        }}
      >
        <TextSearchContainer>
          <TextSearchInput
            required
            type="text"
            id="search"
            placeholder="Text Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ButtonsContainer>
            <Button
              type="submit"
              $size={'small'}
              className="searchButton"
              //    onSubmit={async () => {
              //      try {
              //        const data = await performInputTextSearch();
              //        setSearchedData(data);
              //      } catch (err) {
              //        console.log('error', err);
              //      }
              //    }}
            >
              Search
            </Button>

            <Button
              type="button"
              $size={'small'}
              className="clearSearchButton"
              onClick={() => setSearchedData([])}
            >
              Clear Search
            </Button>
            <Button
              type="button"
              $size={'small'}
              className="clearSortButton"
              // onClick={() => setSearchedData([])}
            >
              <TableHeaderCellInnerContainer>
                Clear Sorting
                <StyledArrowsContainer>
                  <StyledFaCaretUp />
                  <StyledFaCaretDown />
                </StyledArrowsContainer>
              </TableHeaderCellInnerContainer>
            </Button>
          </ButtonsContainer>
        </TextSearchContainer>
      </form>
    </SearchSection>
  );
}
