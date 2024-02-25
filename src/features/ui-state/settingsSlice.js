import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    timeZone: 'pacific',
};
const timeZoneSlice = createSlice({
    name: 'timeZone',
    initialState,
    reducers: {
        changeTimezone(state, action) {
            state.timeZone = action.payload;
        }
    }
});
export const { changeTimezone } = timeZoneSlice.actions;
export default timeZoneSlice.reducer;
//# sourceMappingURL=settingsSlice.js.map