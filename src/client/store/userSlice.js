import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    resetUser: (state) => {
      state.user = {};
      state.user.leagues = [];
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (!state.user.leagues) state.user.leagues = [];
    },
    addLeague: (state, action) => {
      if (!state.user.leagues) state.user.leagues = [];
      state.user.leagues.push(action.payload);
    },
  },
});

export const { resetUser, setUser, addLeague } = userSlice.actions;
export default userSlice.reducer;
