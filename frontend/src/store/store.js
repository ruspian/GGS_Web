import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSliceRedux";
import aboutReducer from "./aboutSliceRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
  },
});

export default store;
