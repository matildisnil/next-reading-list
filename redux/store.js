import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './login/slices';
import booksReducer from './books/slices';
import searchResultBooksReducer from './searchResultBooks/slices';
import { createWrapper } from "next-redux-wrapper";


// export const store = configureStore({
//   reducer: {
//     user: loggedInReducer,
//     books: booksReducer,
//     searchResultBooks: searchResultBooksReducer,
//   }
// });

const makeStore = () =>
  configureStore({
    reducer: {
      user: loggedInReducer,
      books: booksReducer,
      searchResultBooks: searchResultBooksReducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);