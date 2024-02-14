import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'
import { useAuth0 } from "@auth0/auth0-react";

// type user = 'pacific' | 'eastern' | 'central' | 'mountain';

const initialState = {user: null}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUser(state, action){
            state.user = action.payload;
        }
    }

})
export const { changeUser } = userSlice.actions;

export default userSlice.reducer;