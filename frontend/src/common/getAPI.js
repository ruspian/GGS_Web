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
};

export default getAPI;
