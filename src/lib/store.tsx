import { configureStore } from '@reduxjs/toolkit';
import timeZoneReducer from '../features/ui-state/settingsSlice';
import bookmarksReducer from '../features/ui-state/bookmarksSlice';
import userReducer from '../features/ui-state/userSlice';
import pageLimitReducer from '../features/ui-state/pageSlice';

const store = configureStore({
  reducer: {
    // animation: animationReducer,
    timeZone: timeZoneReducer,
    bookmarks: bookmarksReducer,
    user: userReducer,
    page: pageLimitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
