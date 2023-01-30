import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    values: {
      wl: 5,
      sos: 5,
      ppg: 5,
      oppg: 5,
      fg: 5,
      ft: 5,
      tpm: 5,
      trb: 5,
      ast: 5,
      stlblk: 5,
      to: 5,
      pf: 5,
    },
  },
  reducers: {
    resetStats: (state) => {
      state.values = {
        wl: 5,
        sos: 5,
        ppg: 5,
        oppg: 5,
        fg: 5,
        ft: 5,
        tpm: 5,
        trb: 5,
        ast: 5,
        stlblk: 5,
        to: 5,
        pf: 5,
      };
    },
    setStats: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { resetStats, setStats } = statsSlice.actions;
export default statsSlice.reducer;
