import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer';

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;