import {createSlice} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = false;

export const readOrUnreadSlice = createSlice({
    name: "readOrUnread",
    initialState,
    reducers: {
        toggleReadOrUnread: state => !state,
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         // this never logs, maybe not working
    //         console.log('HYDRATE', state, action.payload);
    //         // not sure about this
    //         return {
    //             ...state,
    //         };
    //     }
    // }
})

export const { toggleReadOrUnread } = readOrUnreadSlice.actions;
export default readOrUnreadSlice.reducer;