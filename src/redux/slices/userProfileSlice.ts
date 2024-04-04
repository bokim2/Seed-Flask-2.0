import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { useAuth0 } from '@auth0/auth0-react';

// type user = 'pacific' | 'eastern' | 'central' | 'mountain';

const initialState = { userProfile: null };

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateUserProfile(state, action) {
      state.userProfile = action.payload;
    },
  },
});
export const { updateUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
