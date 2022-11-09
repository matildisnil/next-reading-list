import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


const initialState = { user: null };

export const loggedInSlice = createSlice({
  name: "loggedInState",
  initialState,
  reducers: {
    login: (state, action) => {state.user = action.payload},
    logout: (state) => { state.user = null },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    }
  }
});
export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;

// behöver jag detta
export const selectUser = (state) => state.loggedInState.user;