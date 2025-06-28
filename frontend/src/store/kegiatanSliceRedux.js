import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  _id: null,
  name: "",
  description: "",
  date: null,
  image: null,
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
  },
});

export const { setKegiatan } = kegiatanSlice.actions;
export default kegiatanSlice.reducer;
