import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, useAppSelector, useAppDispatch } from '@/lib/store/store';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

export type VideosUiState = Record<
  string,
  { opened: boolean; completed: boolean }
>;

export const videosUi = createSlice({
  name: 'videoUi',
  initialState: {} as VideosUiState,
  reducers: {
    toggleOpen: (state, action: PayloadAction<string>) => ({
      ...state,
      [action.payload]: {
        ...(state[action.payload] || {}),
        opened: !(state[action.payload] || {}).opened
      }
    }),
    markCompleted: (state, action: PayloadAction<string>) => ({
      ...state,
      [action.payload]: {
        ...(state[action.payload] || {}),
        completed: true
      }
    })
  }
});

export const { toggleOpen, markCompleted } = videosUi.actions;

export const useToggleOpen = (videoId: string) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(toggleOpen(videoId));
  }, [dispatch]);
};

export const useMarkCompleted = (videoId: string) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(markCompleted(videoId));
  }, [dispatch]);
};

export const useVideosUiState = () =>
  useAppSelector((state) => ({ ...state[videosUi.reducerPath] }));

export const selectVideoUiState = (videoId: string) => (state: RootState) =>
  state[videosUi.reducerPath][videoId];

export const isVideoOpened = (videoId: string) => (state: RootState) =>
  state[videosUi.reducerPath][videoId]?.opened;

export const isVideoCompleted = (videoId: string) => (state: RootState) =>
  state[videosUi.reducerPath][videoId]?.completed;

export const useIsVideoOpened = (videoId: string) =>
  useAppSelector(isVideoOpened(videoId));

export const useIsVideoCompleted = (videoId: string) =>
  useAppSelector(isVideoCompleted(videoId));
