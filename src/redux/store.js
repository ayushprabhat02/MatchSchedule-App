import {configureStore} from '@reduxjs/toolkit';
import dateSlice from './dateSlice';

const store = configureStore({
  reducer: {
    matches: dateSlice,
  },
});

export default store;
