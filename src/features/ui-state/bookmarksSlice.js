import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cellbank_bookmark: [],
    flask_bookmark: [],
    sample_bookmark: [],
};
const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addCellbankBookmark(state, action) {
            if (!state.cellbank_bookmark.includes(action.payload)) {
                state.cellbank_bookmark.push(action.payload);
            }
        },
    },
});
export const { addCellbankBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
//# sourceMappingURL=bookmarksSlice.js.map