import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './redux/studentSlice';

const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});

export default store;
