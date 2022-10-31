import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

export const loggedInSlice = createSlice({
  name: "loggedInState",
  initialState,
  reducers: {
    login: (state, action) => {state.user = action.payload},
    logout: (state) => { state.user = null },
  },
});
export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;

// behöver jag detta
export const selectUser = (state) => state.loggedInState.user;