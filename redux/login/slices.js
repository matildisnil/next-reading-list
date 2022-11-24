import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


const initialState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {state.user = action.payload},
    // handling logout in rootreducer instead
    // logout: (state) => { state.user = null },
    logout: state => {
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.user,
      };
    }
  }
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// behöver jag detta
export const selectUser = (state) => state.user.user;