import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api/apiSlice';
import userSlice from './features/userSlice';
import sidebarSlice from './features/sidebarSlice';
import urlSlice from './features/urlSlice';
import apiQuerySlice from './api/apiQuerySlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiQuerySlice.reducerPath]: apiQuerySlice.reducer,
    user: userSlice,
    sidebar: sidebarSlice,
    url: urlSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
    apiQuerySlice.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
