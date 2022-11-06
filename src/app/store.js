import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/PostsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
