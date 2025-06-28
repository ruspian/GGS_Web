import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSliceRedux";
import aboutReducer from "./aboutSliceRedux";
import kegiatanReducer from "./kegiatanSliceRedux";
import anggotaReducer from "./anggotaSliceRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    kegiatan: kegiatanReducer,
    anggota: anggotaReducer,
  },
});

export default store;
