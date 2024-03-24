import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TTimeZone = 'pacific' | 'eastern' | 'central' | 'mountain';

const initialState = {
  timeZone: 'pacific' as TTimeZone,
};

const timeZoneSlice = createSlice({
  name: 'timeZone',
  initialState,
  reducers: {
    changeTimezone(state, action) {
      state.timeZone = action.payload;
    },
  },
});
export const { changeTimezone } = timeZoneSlice.actions;

export default timeZoneSlice.reducer;
