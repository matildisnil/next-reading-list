import {createSlice} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = [];

export const searchResultsBooksSlice = createSlice({
    name: "searchResultBooks",
    initialState,
    reducers: {
        addSearchResultBooks: (state, action) => action.payload,
        toggleAddedToTrue: (state, action) => {
          const uid = action.payload;
          const found = state.find(book => book.googlebooks_id === uid);
          found.added = true;
      },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
          // console.log('HYDRATE', state, action.payload);
          return {
            ...state,
            ...action.payload.searchResultBooks,
          };
        }
      }
})

export const { addSearchResultBooks, toggleAddedToTrue } = searchResultsBooksSlice.actions;
export const selectSearchResultBooksState = state => state?.searchResultBooks;
export const selectSearchResultOneBookState = (state, id) => state?.searchResultBooks?.find(book => book.googlebooks_id === id);
export default searchResultsBooksSlice.reducer;