import {createSlice} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = [];

export const searchResultsBooksSlice = createSlice({
    name: "searchResultBooks",
    initialState,
    reducers: {
        addSearchResultBooks: (state, action) => action.payload,
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

export const { addSearchResultBooks } = searchResultsBooksSlice.actions;
export const selectSearchResultBooksState = state => state?.searchResultBooks;
export const selectSearchResultOneBookState = (state, id) => state?.searchResultBooks?.find(book => book.googlebooks_id === id);


export default searchResultsBooksSlice.reducer;