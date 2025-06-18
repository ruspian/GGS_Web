import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import FetchFromAxios from "./utils/AxiosUtil";
import getAPI from "./common/getAPI";
import { setUserDetails } from "./store/userSliceRedux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    // fungsi untuk ambil data user
    const loadUserFromToken = async () => {
      // ambil token dari localStorage
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        // ambil dan kirim ke backend untuk ambil data user
        const res = await FetchFromAxios({
          ...getAPI.user_details,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        // jika berhasil
        if (res.data?.success) {
          dispatch(setUserDetails(res.data.data));
        }
      } catch (err) {
        console.error("Gagal ambil data user:", err?.response?.data?.message || err.message);
      }
    };

    loadUserFromToken();
  }, [dispatch]);

  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}

export default App
