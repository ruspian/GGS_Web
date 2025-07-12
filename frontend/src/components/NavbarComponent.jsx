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
import LogoIcon from "/src/assets/logo.png";
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
  const location = useLocation();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userDetail = useSelector((state) => state.user);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Kegiatan", path: "/kegiatan" },
    { name: "Kontak", path: "/kontak" },
  ];

  // Fungsi ganti bahasa
  const changeLang = (lang) => {
    const currentUrl = window.location.href;
    if (lang === "en") {
      window.location.href = `https://translate.google.com/translate?hl=en&sl=id&tl=en&u=${encodeURIComponent(currentUrl)}`;
    } else {
      // Kembali ke URL asli
      const originalUrl = currentUrl.split("/translate?u=")[1];
      window.location.href = decodeURIComponent(originalUrl || "/");
    }
  };

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await FetchFromAxios({
          ...getAPI.user_details,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

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
          <img className="w-10 h-10" src={LogoIcon} alt="Logo" />
          <p className="font-bold text-inherit">GGS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand className="mr-8">
          <img className="w-10 h-10" src={LogoIcon} alt="Logo" />
          <p className="font-bold text-inherit">GGS</p>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item.name}-${index}`}
            className={`${location.pathname === item.path ? "text-success font-semibold" : ""}`}
          >
            <Link to={item.path} size="lg">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {userDetail._id ? (
        <NavbarContent justify="end">
          <NavbarItem className="flex items-center gap-4">
            <UserMenuComponent userDetail={userDetail} />

            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              onChange={(e) => changeLang(e.target.value)}
              defaultValue="id"
            >
              <option value="id">🇮🇩</option>
              <option value="en">🇬🇧</option>
            </select>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="flex items-center gap-4">

            {/* Tombol Masuk */}
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

            {/* Dropdown Bahasa */}
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              onChange={(e) => changeLang(e.target.value)}
              defaultValue="id"
            >
              <option value="id">🇮🇩</option>
              <option value="en">🇬🇧</option>
            </select>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              to={item.path}
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
  );
};

export default NavbarComponent;
