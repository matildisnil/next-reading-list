import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        loadBooks: (state, action) => action.payload,
        addBook: (state, action) => [...state, action.payload],
        toggleBook: (state, action) => {
            const index = action.payload;
            state[index].read = !state[index].read},
        removeBook: (state, action) => {
            const index = action.payload;
            return [...state.slice(0,index), ...state.slice(index +1)]
        }
    }
})

export const { loadBooks, addBook, toggleBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;