import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type TPageLimit = number;

const initialState = {
  LIMIT: 50 as TPageLimit,
};

const pageLimitSlice = createSlice({
  name: 'pageLimit',
  initialState,
  reducers: {
    changePageLimit(state, action) {
      state.LIMIT = action.payload;
    },
  },
});
export const { changePageLimit } = pageLimitSlice.actions;

export default pageLimitSlice.reducer;
