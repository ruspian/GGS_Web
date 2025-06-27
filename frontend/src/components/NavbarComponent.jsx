import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,

} from "@heroui/react";
import { useEffect, useState } from "react";
import LogoIcon from '/src/assets/logo.png';
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FetchFromAxios from "../utils/AxiosUtil";
import getAPI from "../common/getAPI";
import { setUserDetails } from "../store/userSliceRedux";
import UserMenuComponent from "./UserMenuComponent";
import AuthComponent from "./AuthComponent";
import { IoMdLogIn } from "react-icons/io";

const NavbarComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // ambil lokasi path
  const location = useLocation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // ambil data user dari redux
  const userDetail = useSelector((state) => state.user);


  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'Kegiatan', path: '/kegiatan' },
    { name: 'Kontak', path: '/kontak' },
  ];

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
    <Navbar isBordered isMenuOpen={openMenu} onMenuOpenChange={setOpenMenu}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={openMenu ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img
            className="w-10 h-10"
            src={LogoIcon}
            alt="" />
          <p className="font-bold text-inherit">GGS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand className="mr-8">
          <img
            className="w-10 h-10"
            src={LogoIcon}
            alt="" />
          <p className="font-bold text-inherit">GGS</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}
            className={`${location.pathname === item.path ? "text-success font-semibold" : ""} `}
          >

            <Link
              to={item.path}
              size="lg"
            >
              {item.name}
            </Link>

          </NavbarItem>
        ))}
      </NavbarContent>

      {
        userDetail._id ? (

          <UserMenuComponent userDetail={userDetail} />

        ) : (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                radius="sm"
                color="success"
                variant="bordered"
                onPress={onOpen}
                endContent={<IoMdLogIn size={20} />}
              >
                Masuk
              </Button>
              <AuthComponent isOpen={isOpen} onOpenChange={onOpenChange} />
            </NavbarItem>
          </NavbarContent>
        )
      }

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              to={`${item.path}`}
              size="lg"
              color="foreground"
              onClick={() => setOpenMenu(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavbarComponent
