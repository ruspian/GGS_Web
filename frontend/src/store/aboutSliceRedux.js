import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";

const initialValue = {
  data: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk untuk Mengambil Semua Data Kegiatan
export const fetchAboutThunk = createAsyncThunk(
  "about/fetchAboutThunk",
  async (_, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getAbout,
      });

      // jika berhasil
      if (response.data.success) {
        return {
          data: response.data.data,
        };
      } else {
        // jika gagal
        return rejectWithValue(
          response.data.message || "Gagal mengambil data."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Kesalahan koneksi atau server."
      );
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: initialValue,
  reducers: {
    setAbout: (state, action) => {
      state.data = action.payload;
    },

    editAbout: (state, action) => {
      const editedAbout = action.payload;
      state.data = state.data.map((about) => {
        about._id === editedAbout._id ? editedAbout : about;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchKegiatan ---
      .addCase(fetchAboutThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAboutThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data; // Mengisi data dari hasil fetch
        state.error = null;
      })
      .addCase(fetchAboutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.data = []; // Kosongkan data jika gagal memuat
      });
  },
});

// Export action creator
export const { setAbout, editAbout } = aboutSlice.actions;

// Export reducer
export default aboutSlice.reducer;
