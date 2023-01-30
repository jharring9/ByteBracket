import { createSlice } from "@reduxjs/toolkit";

export const createStageSlice = createSlice({
  name: "createStage",
  initialState: {
    value: 1,
    progressBar: [
      { id: "01", name: "Select Stats", stage: 1, status: "current" },
      { id: "02", name: "Your Top 25", stage: 2, status: "upcoming" },
      { id: "03", name: "Make Your Picks", stage: 3, status: "upcoming" },
      { id: "04", name: "Finalize Bracket", stage: 4, status: "upcoming" },
    ],
  },
  reducers: {
    setCreateStage: (state, action) => {
      state.value = action.payload;
      switch (action.payload) {
        case 1:
          state.progressBar[0].status = "current";
          state.progressBar[1].status = "upcoming";
          state.progressBar[2].status = "upcoming";
          state.progressBar[3].status = "upcoming";
          break;
        case 2:
          state.progressBar[0].status = "complete";
          state.progressBar[1].status = "current";
          state.progressBar[2].status = "upcoming";
          state.progressBar[3].status = "upcoming";
          break;
        case 3:
          state.progressBar[0].status = "complete";
          state.progressBar[1].status = "complete";
          state.progressBar[2].status = "current";
          state.progressBar[3].status = "upcoming";
          break;
        case 4:
          state.progressBar[0].status = "complete";
          state.progressBar[1].status = "complete";
          state.progressBar[2].status = "complete";
          state.progressBar[3].status = "current";
          break;
      }
    },
  },
});

export const { setCreateStage } = createStageSlice.actions;
export default createStageSlice.reducer;
