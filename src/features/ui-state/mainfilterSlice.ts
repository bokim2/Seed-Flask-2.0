import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'

type TMainFilter = 'all' | 'project' | 'username';

const initialState = {
    mainfilter: 'all' as TMainFilter,
} 



const mainfilterSlice = createSlice({
    name: 'mainfilter',
    initialState,
    reducers: {
        changeMainfilter(state, action){
            state.mainfilter = action.payload;
        }
    }

})
export const { changeMainfilter } = mainfilterSlice.actions;

export default mainfilterSlice.reducer;