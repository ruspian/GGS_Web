import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { useState } from "react";
import LogoIcon from '/src/assets/logo.png';
import { useLocation, Link } from "react-router-dom";

const NavbarComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // ambil lokasi path
  const location = useLocation();


  const menuItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'Kegiatan', path: '/kegiatan' },
    { name: 'Galery', path: '/galery' },
    { name: 'Kontak', path: '/kontak' },
  ];

  // Fungsi untuk menangani navigasi dan status menu

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

      <NavbarContent justify="end">
        <NavbarItem>
          <Link to="/daftar">
            <Button
              radius="sm"
              color="success"
              variant="bordered"
            >
              Daftar
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

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

        <NavbarMenuItem>
          <Link
            className="w-full"
            size="lg"
            color="#F31260"
          >
            Keluar
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}

export default NavbarComponent
