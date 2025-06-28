import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialValues = {
  _id: null,
  name: "",
  description: "",
  image: [],
  date: null,
};

const kegiatanSlice = createSlice({
  name: "kegiatan",
  initialState: initialValues,
  reducers: {
    setKegiatan: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    editKegiatan: (state, action) => {
      if (action.payload._id !== undefined) state._id = action.payload._id;
      if (action.payload.name !== undefined) state.name = action.payload.name;
      if (action.payload.description !== undefined)
        state.description = action.payload.description;
      if (action.payload.image !== undefined)
        state.image = action.payload.image;

      // Gunakan dayjs.isDayjs() untuk memastikan itu objek dayjs sebelum konversi
      if (action.payload.date !== undefined) {
        state.date = dayjs.isDayjs(action.payload.date)
          ? action.payload.date.toISOString()
          : action.payload.date; // Jika sudah string atau null, gunakan langsung
      }
    },
  },
});

export const { setKegiatan, editKegiatan } = kegiatanSlice.actions;
export default kegiatanSlice.reducer;
