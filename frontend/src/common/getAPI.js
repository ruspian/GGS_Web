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
    method: "GET",
  },
};

export default getAPI;
