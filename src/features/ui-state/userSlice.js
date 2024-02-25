import { createSlice } from '@reduxjs/toolkit';
// type user = 'pacific' | 'eastern' | 'central' | 'mountain';
const initialState = { user: null };
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser(state, action) {
            state.user = action.payload;
        }
    }
});
export const { changeUser } = userSlice.actions;
export default userSlice.reducer;
//# sourceMappingURL=userSlice.js.map