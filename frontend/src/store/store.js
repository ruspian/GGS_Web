import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSliceRedux";
import aboutReducer from "./aboutSliceRedux";
import kegiatanReducer from "./kegiatanSliceRedux";
import anggotaReducer from "./anggotaSliceRedux";
import galeriReducer from "./galeriSliceRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    kegiatan: kegiatanReducer,
    anggota: anggotaReducer,
    galeri: galeriReducer,
  },
});

export default store;
