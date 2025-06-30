import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";

const initialState = {
  data: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk untuk Mengambil Semua Data Kegiatan
export const fetchKegiatanThunk = createAsyncThunk(
  "kegiatan/fetchKegiatanThunk",
  async (_, { rejectWithValue }) => {
    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getKegiatan,
      });

      // jika berhasil
      if (response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
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
      console.log("ini error dari addKegiatanThunk", error);

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
        state.data = action.payload; // Mengisi data dari hasil fetch
        state.error = null;
      })
      .addCase(fetchKegiatanThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.data = []; // Kosongkan data jika gagal memuat
      })
      // --- addKegiatan ---
      .addCase(addKegiatanThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addKegiatanThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload); // Tambahkan kegiatan baru ke array data
        state.error = null;
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

export const { setKegiatan, editKegiatan, addKegiatan, deleteKegiatan } =
  kegiatanSlice.actions;
export default kegiatanSlice.reducer;
