import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";

const initialState = {
  data: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalCount: 0,
  totalPage: 1,
  currentPage: 1,
  limit: 10,
  totalImageCount: 0,
  image: [],
  selectedKegiatan: null,
};

// Thunk untuk Mengambil Semua Data Kegiatan
export const fetchKegiatanThunk = createAsyncThunk(
  "kegiatan/fetchKegiatanThunk",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getKegiatan,
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
          totalImageCount: response.data.totalImageCount,
          image: response.data.image,
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

// Thunk untuk Mengambil Semua Data Kegiatan
export const fetchKegiatanByIdThunk = createAsyncThunk(
  "kegiatan/fetchKegiatanByIdThunk",
  async (_id, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getKegiatanById,
        data: {
          _id,
        },
      });

      // jika berhasil
      if (response.data.success) {
        return {
          selectedKegiatan: response.data.data,
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

// Thunk untuk Mengedit Kegiatan yang Ada
export const editKegiatanThunk = createAsyncThunk(
  "kegiatan/editKegiatanThunk",
  async (updatedKegiatanData, { rejectWithValue }) => {
    try {
      const response = await FetchFromAxios({
        ...getAPI.editKegiatan,
        data: updatedKegiatanData,
      });
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "Gagal mengupdate kegiatan."
        );
      }
    } catch (error) {
      console.log("ini error dari editKegiatanThunk", error);

      return rejectWithValue(
        error.response?.data?.message || "Kesalahan saat mengupdate kegiatan."
      );
    }
  }
);

// Thunk untuk Menambah Kegiatan Baru
export const addKegiatanThunk = createAsyncThunk(
  "kegiatan/addKegiatanThunk",
  async (newKegiatanData, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.createKegiatan,
        data: newKegiatanData,
      });

      // jika berhasil
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "Gagal menambahkan kegiatan."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Kesalahan saat menambah kegiatan."
      );
    }
  }
);

// Thunk untuk Menghapus Kegiatan
export const deleteKegiatanThunk = createAsyncThunk(
  "kegiatan/deleteKegiatanThunk",
  async (kegiatanId, { rejectWithValue }) => {
    try {
      const response = await FetchFromAxios({
        ...getAPI.deleteKegiatan,
        data: { _id: kegiatanId },
      });
      if (response.data.success) {
        return kegiatanId;
      } else {
        return rejectWithValue(
          response.data.message || "Gagal menghapus kegiatan."
        );
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Kesalahan saat menghapus kegiatan."
      );
    }
  }
);

const kegiatanSlice = createSlice({
  name: "kegiatan",
  initialState: initialState,
  reducers: {
    setKegiatan: (state, action) => {
      state.data = action.payload;
    },
    editKegiatan: (state, action) => {
      const editedKegiatan = action.payload;

      state.data = state.data.map((kegiatan) => {
        kegiatan._id === editedKegiatan._id ? editedKegiatan : kegiatan;
      });
    },
    addKegiatan: (state, action) => {
      state.data.push(action.payload);
    },
    deleteKegiatan: (state, action) => {
      state.data = state.data.filter(
        (kegiatan) => kegiatan._id !== action.payload
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedKegiatan: (state, action) => {
      state.selectedKegiatan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchKegiatan ---
      .addCase(fetchKegiatanThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchKegiatanThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data; // Mengisi data dari hasil fetch
        state.totalPage = action.payload.totalPage;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        state.limit = action.payload.limit;
        state.totalImageCount = action.payload.totalImageCount;
        state.image = action.payload.image;
        state.error = null;
      })
      .addCase(fetchKegiatanThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.data = []; // Kosongkan data jika gagal memuat
      })
      // --- fetchKegiatanById ---
      .addCase(fetchKegiatanByIdThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchKegiatanByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedKegiatan = action.payload.selectedKegiatan;
        state.error = null;
      })
      .addCase(fetchKegiatanByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.selectedKegiatan = null; // Kosongkan data jika gagal memuat
      })
      // --- addKegiatan ---
      .addCase(addKegiatanThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addKegiatanThunk.fulfilled, (state) => {
        state.status = "succeeded";

        // state.totalCount += 1;
        // state.totalPage = Math.ceil(state.totalCount / state.limit) || 1;
      })
      .addCase(addKegiatanThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- editKegiatan ---
      .addCase(editKegiatanThunk.pending, (state) => {
        state.status = "loading"; // Atau 'updating'
      })
      .addCase(editKegiatanThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Temukan kegiatan yang diupdate berdasarkan ID dan ganti dengan data baru
        const index = state.data.findIndex(
          (kegiatan) => kegiatan._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editKegiatanThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- deleteKegiatan ---
      .addCase(deleteKegiatanThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteKegiatanThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Hapus kegiatan dari array data berdasarkan ID
        state.data = state.data.filter(
          (kegiatan) => kegiatan._id !== action.payload
        ); // action.payload adalah ID yang dihapus
        state.error = null;
      })
      .addCase(deleteKegiatanThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setKegiatan,
  editKegiatan,
  addKegiatan,
  deleteKegiatan,
  setCurrentPage,
  setSelectedKegiatan,
} = kegiatanSlice.actions;
export default kegiatanSlice.reducer;
