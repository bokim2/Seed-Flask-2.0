import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
    toggleCellbankBookmark(state, action: PayloadAction<number>) {
      if (!state.cellbank_bookmark.includes(action.payload)) {
        state.cellbank_bookmark.push(action.payload);
      } else {
        state.cellbank_bookmark = state.cellbank_bookmark.filter(
          (id) => id !== action.payload
        );
      }
    },
    clearCellbankBookmark(state) {
      console.log('Clearing cellbank bookmarks');
      state.cellbank_bookmark = [];
    },
    toggleFlaskBookmark(state, action: PayloadAction<number>) {
      if (!state.flask_bookmark.includes(action.payload)) {
        state.flask_bookmark.push(action.payload);
      } else {
        state.flask_bookmark = state.flask_bookmark.filter(
          (id) => id !== action.payload
        );
      }
    },
    clearFlaskBookmark(state) {
      state.flask_bookmark = [];
    },
  },
});

export const {
  toggleCellbankBookmark,
  clearCellbankBookmark,
  toggleFlaskBookmark,
  clearFlaskBookmark,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
