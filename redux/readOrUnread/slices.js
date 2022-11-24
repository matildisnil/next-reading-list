import {createSlice} from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = false;

export const readOrUnreadSlice = createSlice({
    name: "readOrUnread",
    initialState,
    reducers: {
        toggleReadOrUnread: state => !state,
    },
})

export const { toggleReadOrUnread } = readOrUnreadSlice.actions;
export default readOrUnreadSlice.reducer;
export const selectReadOrUnread = state => state?.readOrUnread;
