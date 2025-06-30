import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../assets/logo.png';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Listbox,
  ListboxItem,
  Image, User,
  addToast
} from "@heroui/react";
import { RiFileUserLine, RiLogoutBoxLine } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { BiUserPin } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { logoutUser } from '../store/userSliceRedux';

const AdminPage = () => {



  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Mengambil data user dari Redux store
  const user = useSelector((state) => state.user);

  // Fungsi handle Logout
  const handleLogout = async () => {
    try {
      // kirim reques ke backend
      const response = await FetchFromAxios({
        ...getAPI.logout,
        userId: user?._id,
      });

      // jika berhasil
      if (response.data.success) {

        // hapus token dari localstorage
        dispatch(logoutUser())
        localStorage.clear();

        addToast({ title: response.data.message });

        // arahkan ke dashboard
        navigate("/");

      }

    } catch (error) {
      addToast({ title: error.response.data.message });
    }
  }



  return (
    <>
      <div className='fixed top-0 left-0 w-full h-20 overflow-hidden bg-white shadow-md flex flex-row items-center justify-between px-8 z-50'>
        <GiHamburgerMenu className='text-2xl cursor-pointer hover:text-emerald-600' onClick={onOpen} />
        <User
          avatarProps={{
            src: user?.avatar,
            alt: "User Avatar",
          }}
          description={user?.role}
          name={user?.name}
        />
      </div>

      {/* Konten utama halaman */}
      <div className='pt-10'>
        <div className='container md:mx-auto mx-4 my-3'>
          <Outlet />
        </div>
      </div>

      {/* Drawer (Side Nav) */}
      <Drawer
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='left'
        size='sm'
        radius='sm'
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex items-center gap-2 mt-8">
                <Link to={'/'} className="flex items-center gap-2">
                  <Image
                    alt="Card background"
                    className="w-10 h-10"
                    src={logo}
                  />
                  <p className='text-lg font-bold'>GORONTALO GREEN SCHOOL</p>
                </Link>
              </DrawerHeader>

              <DrawerBody>
                <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                  <ListboxItem
                    key="Dashboard"
                    startContent={<MdOutlineSpaceDashboard className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/dashboard'); onClose(); }}
                  >
                    Dashboard
                  </ListboxItem>
                  <ListboxItem
                    key="tentang"
                    startContent={<RiFileUserLine className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/profil'); onClose(); }}
                  >
                    Profil
                  </ListboxItem>
                  <ListboxItem
                    key="kegiatan"
                    startContent={<LuListTodo className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/kegiatan'); onClose(); }}
                  >
                    Kegiatan
                  </ListboxItem>
                  <ListboxItem
                    key="anggota"
                    startContent={<BiUserPin className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/anggota'); onClose(); }}
                  >
                    Anggota
                  </ListboxItem>
                  <ListboxItem
                    key="galeri"
                    startContent={<GrGallery className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/galeri'); onClose(); }}
                  >
                    Galeri
                  </ListboxItem>
                  <ListboxItem
                    key="user"
                    startContent={<FaRegUser className='text-emerald-600' />}
                    className='text-lg font-bold h-12'
                    onPress={() => { navigate('/admin/user'); onClose(); }}
                  >
                    User
                  </ListboxItem>
                  <ListboxItem
                    key="keluar"
                    startContent={<RiLogoutBoxLine className='text-red-600' />}
                    className='text-danger text-lg font-bold h-12'
                    onPress={handleLogout}
                  >
                    Keluar
                  </ListboxItem>
                </Listbox>
              </DrawerBody>
              <DrawerFooter>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AdminPage;
