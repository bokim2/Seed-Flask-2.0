import { configureStore } from '@reduxjs/toolkit';
import timeZoneReducer from './slices/settingsSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import userProfileReducer from './slices/userProfileSlice';
import pageLimitReducer from './slices/pageSlice';
import mainfilterReducer from './slices/mainfilterSlice';

// store bookmarks in local storage

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('bookmarks');
    if (serializedState === null) return;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err, 'Error loading bookmarks from local storage');
  }
}

function saveStateToLocalStorage(state) {
  try {
    console.log('state.bookmarks in saveStateTolocalstorage', state.bookmarks);
    const serializedState = JSON.stringify(state.bookmarks);
    localStorage.setItem('bookmarks', serializedState);
  } catch (err) {
    console.error(err, 'Error saving bookmarks to local storage');
  }
}

const preloadedState = {
  bookmarks: loadFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    // animation: animationReducer,
    timeZone: timeZoneReducer,
    bookmarks: bookmarksReducer,
    userProfile: userProfileReducer,
    page: pageLimitReducer,
    mainFilter: mainfilterReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveStateToLocalStorage({
    bookmarks: store.getState().bookmarks,
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
