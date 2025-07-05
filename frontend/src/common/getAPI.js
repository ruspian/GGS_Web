export const BACKEND_URL = "http://localhost:3000";

const getAPI = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  refresh_token: {
    url: "/api/user/refresh-token",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  user_details: {
    url: "/api/user/user-detail",
    method: "GET",
  },
  getAllUser: {
    url: "/api/user/all-user",
    method: "GET",
  },
  logout: {
    url: "/api/user/logout",
    method: "GET",
  },
  uploadFile: {
    url: "/api/file/upload-file",
    method: "POST",
  },
  uploadAvatarUpdate: {
    url: "/api/user/upload-avatar",
    method: "PUT",
  },
  updateUserDetail: {
    url: "/api/user/update-user-detail",
    method: "POST",
  },
  createAbout: {
    url: "/api/about/create-about",
    method: "POST",
  },
  getAbout: {
    url: "/api/about/get-about",
    method: "GET",
  },
  editAbout: {
    url: "/api/about/edit-about",
    method: "PUT",
  },
  createKegiatan: {
    url: "/api/kegiatan/create-kegiatan",
    method: "POST",
  },
  getKegiatan: {
    url: "/api/kegiatan/get-kegiatan",
    method: "POST",
  },
  getKegiatanById: {
    url: "/api/kegiatan/get-kegiatan-by-id",
    method: "POST",
  },
  editKegiatan: {
    url: "/api/kegiatan/edit-kegiatan",
    method: "PUT",
  },
  deleteKegiatan: {
    url: "/api/kegiatan/delete-kegiatan",
    method: "DELETE",
  },
  createAnggota: {
    url: "/api/anggota/create-anggota",
    method: "POST",
  },
  getAllAnggota: {
    url: "/api/anggota/get-all-anggota",
    method: "POST",
  },
  deleteAnggota: {
    url: "/api/anggota/delete-anggota",
    method: "DELETE",
  },
  getGaleri: {
    url: "/api/galeri/get-galeri",
    method: "GET",
  },
};

export default getAPI;
