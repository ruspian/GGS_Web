import { createSlice } from "@reduxjs/toolkit";

// buat user Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
