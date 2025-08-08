import { combineReducers } from '@reduxjs/toolkit';
import { playlistApi } from '@/lib/store/api.service';
import { videosUi } from '@/lib/features/videos/videos.slice';

export const rootReducer = combineReducers({
  [videosUi.reducerPath]: videosUi.reducer,
  [playlistApi.reducerPath]: playlistApi.reducer
});

export default rootReducer;
