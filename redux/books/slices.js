import {createSlice} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = [];

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        loadBooks: (state, action) => action.payload,
        addBook: (state, action) => [action.payload, ...state],
        toggleBook: (state, action) => {
            // const index = action.payload;
            const uid = action.payload;
            const found = state.find(book => book.id === uid);
            found.read = !found.read;
        },
        removeBook: (state, action) => {
            const uid = action.payload;
            const index = state.findIndex(book => book.id === uid);
            return [...state.slice(0,index), ...state.slice(index +1)]
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            // console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.books,
            };
        }
    }
})

export const { loadBooks, addBook, toggleBook, removeBook } = booksSlice.actions;
export const selectBookState = state => state?.books;
export default booksSlice.reducer;