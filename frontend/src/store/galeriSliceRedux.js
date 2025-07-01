import { createSlice } from "@reduxjs/toolkit";

const galeriSlice = createSlice({
  name: "galeri",
  initialState: {
    img: [],
  },
  reducers: {
    setGaleri: (state, action) => {
      state.img = action.payload;
    },
  },
});

export const { setGaleri } = galeriSlice.actions;
export default galeriSlice.reducer;
