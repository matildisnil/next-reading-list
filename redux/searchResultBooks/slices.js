import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const searchResultsBooksSlice = createSlice({
    name: "searchResultBooks",
    initialState,
    reducers: {
        addSearchResultBooks: (state, action) => action.payload,
    }
})

export const { addSearchResultBooks } = searchResultsBooksSlice.actions;
export default searchResultsBooksSlice.reducer;