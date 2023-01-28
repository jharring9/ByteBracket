import { createSlice } from "@reduxjs/toolkit";

export const lambdaSlice = createSlice({
  name: "lambda",
  initialState: {
    bracket: [],
    top25: [],
  },
  reducers: {
    clearBracket: (state) => {
      state.bracket = [];
    },
    setBracket: (state, action) => {
      state.bracket = action.payload;
    },
    clearTop25: (state) => {
      state.top25 = [];
    },
    setTop25: (state, action) => {
      state.top25 = action.payload;
    },
  },
});

export const { clearBracket, setBracket, clearTop25, setTop25 } =
  lambdaSlice.actions;
export default lambdaSlice.reducer;
