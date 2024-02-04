import { configureStore } from "@reduxjs/toolkit";
import timeZoneReducer from "../features/settings/settingsSlice";
import bookmarksReducer from "../features/settings/bookmarksSlice";

const store = configureStore({
    reducer: {
        
            // animation: animationReducer,
            timeZone: timeZoneReducer,
            bookmarks: bookmarksReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;