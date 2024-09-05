import React from 'react';
import { StyledBookmarkContainer } from '../styles/UtilStyles';
import styled from 'styled-components';

type TBookmarks = {
  bookmarksArray: number[];
  bookmarksTitle: string;
  containerBgColor?: string;
  bookmarkBgColor?: string;
};

const SideMenuBookmarksContainer = styled(StyledBookmarkContainer)<{
  $bgColor?: string;
}>`
  /* font-size: 0.9rem !important; */
  display: none;
  background-color: ${({ $bgColor }) => $bgColor || 'lightgrey'};
  border-radius: var(--border-radius-small, 5px);

  @media (min-width: 850px) {
    display: block;
  }
`;
const BookmarkTitle = styled.p`
  font-size: 1rem;
`;

const BookmarksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const Bookmark = styled.div<{ $bgColor?: string }>`
--border-radius-btn: 7.5px;
  background-color: ${({ $bgColor }) => $bgColor || 'var(--clr-accent-8)'};
  display: grid;
  place-items: center;
  padding: 0rem 0.25rem;
  min-width: 2rem;
  /* background-color: green; */

  border-radius: var(--border-radius-btn);
`;

const BookmarkText = styled.p`
  font-size: 0.9rem;
`;

export default function Bookmarks({
  bookmarksArray,
  bookmarksTitle,
  containerBgColor,
  bookmarkBgColor,
}: TBookmarks) {

    const lastBookmarked = bookmarksArray[bookmarksArray.length -1]
  return (
    <SideMenuBookmarksContainer $bgColor={containerBgColor}>
      <BookmarksContainer >
        <BookmarkTitle>{bookmarksTitle}: </BookmarkTitle>
        {/* {Array.isArray(bookmarksTitle) && bookmarksArray.join(', ')} */}

        {[...bookmarksArray].sort((a, b) => a - b).map((bookmark, i) => {
          return (
            <Bookmark key={i} $bgColor={bookmark == lastBookmarked ? 'pink' : bookmarkBgColor}>
              <BookmarkText style={{'fontWeight': bookmark == lastBookmarked ? 700 : 400}}>{bookmark}</BookmarkText>
            </Bookmark>
          );
        })}
      </BookmarksContainer>
    </SideMenuBookmarksContainer>
  );
}
