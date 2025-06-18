import axios from "axios";
import getAPI, { BACKEND_URL } from "../src/common/getAPI";

// fungsi untuk mengambil data
const FetchFromAxios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

//  tambah token ke header
FetchFromAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // tambah token ke header jika ada
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // kembalikan config
    return config;
  },

  // jika ada error
  (error) => {
    return Promise.reject(error);
  }
);

// refresh access token
FetchFromAxios.interceptors.request.use(
  (response) => {
    return response;
  },

  // jika error 401
  async (error) => {
    let originalRequest = error.config;

    // jika error maka ulangi request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      // jika ada refresh token maka refresh token
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        // jika ada maka perbahui token di header
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return FetchFromAxios(originalRequest);
        }
      }
    }

    // kembalikan error jika tidak ada
    return Promise.reject(error);
  }
);

// fungsi untuk refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    // kirim refresh token ke backend
    const response = await FetchFromAxios({
      ...getAPI.refresh_token,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // simpan token
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default FetchFromAxios;
