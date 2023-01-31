import { configureStore } from '@reduxjs/toolkit'
import lambdaReducer from "./lambdaSlice";
import bracketReducer from "./bracketSlice";
import createStageReducer from "./createStageSlice";
import statsReducer from "./statsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    bracket: bracketReducer,
    createStage: createStageReducer,
    lambda: lambdaReducer,
    stats: statsReducer,
    user: userReducer,
  },
})