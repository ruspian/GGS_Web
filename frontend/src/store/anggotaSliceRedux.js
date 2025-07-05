import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";

const initialValues = {
  data: [],
  totalPage: 1,
  totalCount: 0,
  currentPage: 1,
  limit: 6,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk untuk Mengambil Semua Data Anggota
export const fetchAnggotaThunk = createAsyncThunk(
  "anggota/fetchAnggotaThunk",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getAllAnggota,
        data: {
          page,
          limit,
        },
      });

      // jika berhasil
      if (response.data.success) {
        return {
          data: response.data.data,
          totalCount: response.data.totalCount,
          totalPage: response.data.totalPage,
          currentPage: response.data.currentPage,
          limit: response.data.limit,
        };
      } else {
        // jika gagal
        return rejectWithValue(
          response.data.message || "Gagal memuat data kegiatan."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Kesalahan koneksi atau server."
      );
    }
  }
);

const anggotaSlice = createSlice({
  name: "anggota",
  initialState: initialValues,
  reducers: {
    setAllAnggota: (state, action) => {
      state.data = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchKegiatan ---
      .addCase(fetchAnggotaThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAnggotaThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data; // Mengisi data dari hasil fetch
        state.totalPage = action.payload.totalPage;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        state.limit = action.payload.limit;
        state.error = null;
      })
      .addCase(fetchAnggotaThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.data = []; // Kosongkan data jika gagal memuat
      });
  },
});

export const { setAllAnggota, setCurrentPage } = anggotaSlice.actions;
export default anggotaSlice.reducer;
