import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  user_id: [],
};

const anggotaSlice = createSlice({
  name: "anggota",
  initialState: initialValues,
  reducers: {
    setAllAnggota: (state, action) => {
      state.user_id = [...action.payload];
    },
  },
});

export const { setAllAnggota } = anggotaSlice.actions;
export default anggotaSlice.reducer;
