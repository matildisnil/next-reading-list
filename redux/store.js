import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './login/slices';
import booksReducer from './books/slices';
import searchResultBooksReducer from './searchResultBooks/slices';
import readOrUnreadReducer from './readOrUnread/slices';
import { createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
      user: userReducer,
      books: booksReducer,
      searchResultBooks: searchResultBooksReducer,
      readOrUnread: readOrUnreadReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') { // check for action type
    state = undefined;
  }
  return combinedReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);