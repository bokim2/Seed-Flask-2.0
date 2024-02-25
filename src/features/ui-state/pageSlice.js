import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    LIMIT: 50,
};
const pageLimitSlice = createSlice({
    name: 'pageLimit',
    initialState,
    reducers: {
        changePageLimit(state, action) {
            state.LIMIT = action.payload;
        }
    }
});
export const { changePageLimit } = pageLimitSlice.actions;
export default pageLimitSlice.reducer;
//# sourceMappingURL=pageSlice.js.map