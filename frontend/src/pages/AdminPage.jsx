import React from 'react'
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
  Image, User
} from "@heroui/react";
import { RiFileUserLine, RiLogoutBoxLine } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { BiUserPin } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
const AdminPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  return (
    <div className='absolute top-0 bottom-0 left-0 overflow-x-hidden right-0 z-50 bg-white no-scrollbar'>
      <div className='py-6 px-8 bg-white shadow-md flex h-20 flex-row w-full items-center justify-between'>
        <GiHamburgerMenu className='text-2xl cursor-pointer hover:text-emerald-600' onClick={onOpen} />
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          description="Administrator"
          name="Otong"
        />
      </div>

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
                    key="Dashoard"
                    startContent={
                      <MdOutlineSpaceDashboard className='text-emerald-600' />
                    }
                    className='text-lg font-bold h-12'
                    onPress={() => {
                      navigate('/admin/dashboard');
                      onClose();
                    }}
                  >
                    Dashboard
                  </ListboxItem>
                  <ListboxItem
                    key="tentang"
                    startContent={
                      <RiFileUserLine className='text-emerald-600' />
                    }
                    className='text-lg font-bold h-12'
                    onPress={() => {
                      navigate('/admin/profil');
                      onClose();
                    }}
                  >
                    Profil
                  </ListboxItem>
                  <ListboxItem
                    key="kegiatan"
                    startContent={
                      <LuListTodo className='text-emerald-600' />
                    }
                    className='text-lg font-bold h-12'
                    onPress={() => {
                      navigate('/admin/kegiatan');
                      onClose();
                    }}
                  >
                    Kegiatan
                  </ListboxItem>
                  <ListboxItem
                    key="anggota"
                    startContent={
                      <BiUserPin className='text-emerald-600' />
                    }
                    className='text-lg font-bold h-12'
                    onPress={() => {
                      navigate('/admin/anggota');
                      onClose();
                    }}
                  >
                    Anggota
                  </ListboxItem>
                  <ListboxItem
                    key="galeri"
                    startContent={
                      <GrGallery className='text-emerald-600' />
                    }
                    className='text-lg font-bold h-12'
                    onPress={() => {
                      navigate('/admin/galeri');
                      onClose();
                    }}
                  >
                    Galeri
                  </ListboxItem>

                  <ListboxItem
                    key="keluar"
                    startContent={
                      <RiLogoutBoxLine className='text-red-600' />
                    }
                    className='text-danger text-lg font-bold h-12'
                  >
                    <Link to='/admin/galeri' className='text-red-600'>
                      Keluar
                    </Link>
                  </ListboxItem>
                </Listbox>
              </DrawerBody>

              <DrawerFooter>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className='container md:mx-auto mx-4 my-3'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage