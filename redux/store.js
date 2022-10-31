import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './login/slices';
import booksReducer from './books/slices';

export const store = configureStore({
  reducer: {
    user: loggedInReducer,
    books: booksReducer,
  }
});