import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSliceRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
