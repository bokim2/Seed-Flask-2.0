import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { useAuth0 } from '@auth0/auth0-react';

// type user = 'pacific' | 'eastern' | 'central' | 'mountain';

export type Tuser = {
  picture: string;
  name: string;
  email: string;
};

export type TuserProfile = {
  isAuthenticated: boolean;
  user: Tuser | null;
};

export const initialUserState = { isAuthenticated: false, user: null };

const initialState: TuserProfile = initialUserState;

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateUserProfile(state, action: PayloadAction<TuserProfile>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
  },
});
export const { updateUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
