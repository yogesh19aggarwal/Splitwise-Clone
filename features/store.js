import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import groupReducer from './slices/groupSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupReducer,
  },
});

export default store;