import { createSlice } from "@reduxjs/toolkit";

export const lambdaSlice = createSlice({
  name: "lambda",
  initialState: {
    field: [],
    top25: [],
  },
  reducers: {
    clearField: (state) => {
      state.field = [];
    },
    setField: (state, action) => {
      state.field = action.payload;
    },
    clearTop25: (state) => {
      state.top25 = [];
    },
    setTop25: (state, action) => {
      state.top25 = action.payload;
    },
  },
});

export const { clearField, setField, clearTop25, setTop25 } =
  lambdaSlice.actions;
export default lambdaSlice.reducer;
