import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSliceRedux";
import aboutReducer from "./aboutSliceRedux";
import kegiatanReducer from "./kegiatanSliceRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    kegiatan: kegiatanReducer,
  },
});

export default store;
