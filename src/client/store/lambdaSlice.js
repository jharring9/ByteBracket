import { createSlice } from "@reduxjs/toolkit";

export const lambdaSlice = createSlice({
  name: "lambda",
  initialState: {
    field: [],
    top25: [],
    logos: {},
  },
  reducers: {
    clearTop25: (state) => {
      state.top25 = [];
    },
    setField: (state, action) => {
      state.field = action.payload;
    },
    setTop25: (state, action) => {
      state.top25 = action.payload;
    },
    setLogos: (state, action) => {
      state.logos = action.payload;
    },
  },
});

export const { clearTop25, setField, setTop25, setLogos } = lambdaSlice.actions;
export default lambdaSlice.reducer;
