import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../lib/store';

type TBookmarks = {
  cellbank_bookmark: number[];
  flask_bookmark: number[];
  sample_bookmark: number[];
};

const initialState: TBookmarks = {
  cellbank_bookmark: [],
  flask_bookmark: [],
  sample_bookmark: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addCellbankBookmark(state, action: PayloadAction<number>) {
      if (!state.cellbank_bookmark.includes(action.payload)) {
        state.cellbank_bookmark.push(action.payload);
      }
    },
  },
});

export const { addCellbankBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
