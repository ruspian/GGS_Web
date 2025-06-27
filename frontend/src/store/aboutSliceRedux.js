import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialValue = {
  _id: null,
  name: "",
  about: "",
  visi: "",
  misi: [],
  logo: null,
  tanggal: null,
};

const aboutSlice = createSlice({
  name: "about",
  initialState: initialValue,
  reducers: {
    setAbout: (state, action) => {
      const payloadToStore = { ...action.payload };
      // Gunakan dayjs.isDayjs() untuk memastikan itu objek dayjs sebelum konversi
      if (payloadToStore.tanggal && dayjs.isDayjs(payloadToStore.tanggal)) {
        payloadToStore.tanggal = payloadToStore.tanggal.toISOString();
      }
      // Jika tanggal sudah string atau null, biarkan saja.
      return { ...state, ...payloadToStore };
    },

    editAbout: (state, action) => {
      if (action.payload._id !== undefined) state._id = action.payload._id;
      if (action.payload.name !== undefined) state.name = action.payload.name;
      if (action.payload.about !== undefined)
        state.about = action.payload.about;
      if (action.payload.visi !== undefined) state.visi = action.payload.visi;
      if (action.payload.misi !== undefined) state.misi = action.payload.misi;
      if (action.payload.logo !== undefined) state.logo = action.payload.logo;

      // Gunakan dayjs.isDayjs() untuk memastikan itu objek dayjs sebelum konversi
      if (action.payload.tanggal !== undefined) {
        state.tanggal = dayjs.isDayjs(action.payload.tanggal)
          ? action.payload.tanggal.toISOString()
          : action.payload.tanggal; // Jika sudah string atau null, gunakan langsung
      }
    },
  },
});

// Export action creator
export const { setAbout, editAbout } = aboutSlice.actions;

// Export reducer
export default aboutSlice.reducer;
