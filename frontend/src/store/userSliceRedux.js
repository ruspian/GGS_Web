import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  role: "",
  aboutme: "",
  social_media: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  },
};

// buat user Slice
const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    logoutUser: () => {
      return initialValue;
    },
    updatedAvatarUser: (state, action) => {
      if (state) {
        state.avatar = action.payload;
      }
    },
    updatedDetailUser: (state, action) => {
      if (state) {
        state.name = action.payload.name || state.name;
        state.email = action.payload.email || state.email;
        state.mobile = action.payload.mobile || state.mobile;
        state.aboutme = action.payload.aboutme || state.aboutme;

        if (action.payload.social_media) {
          state.social_media = {
            ...state.social_media, // Pertahankan yang sudah ada
            ...action.payload.social_media, // Timpa dengan yang baru dari payload
          };
        }
      }
    },
  },
});

export const {
  setUserDetails,
  logoutUser,
  updatedAvatarUser,
  updatedDetailUser,
} = userSlice.actions;
export default userSlice.reducer;
