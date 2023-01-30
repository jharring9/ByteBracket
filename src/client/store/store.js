import { configureStore } from '@reduxjs/toolkit'
import lambdaReducer from "./lambdaSlice";
import createStageReducer from "./createStageSlice";
import statsReducer from "./statsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    lambda: lambdaReducer,
    createStage: createStageReducer,
    stats: statsReducer,
    user: userReducer,
  },
})