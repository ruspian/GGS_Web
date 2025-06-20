import { Tab, Tabs } from '@heroui/react'
import { BackSquare, Edit, Profile } from 'iconsax-reactjs';
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';

const UserDashboardLayout = () => {
  const userDetail = useSelector((state) => state.user);
  console.log("userDetail lauout", userDetail);

  const navigate = useNavigate();

  // fungsi navigate
  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <div className='top-0 bottom-0 left-0 right-0 bg-white absolute z-40'>
      <div
        onClick={() => handleNavigate('/')}
        className='flex items-center absolute hover:text-emerald-600 top-0 lg:right-10 right-2 cursor-pointer z-50 justify-end gap-1 p-4'
      >
        <p className='text-sm lg:block hidden'>Kembali</p>
        <BackSquare size="20" />
      </div>
      {
        userDetail._id && (

          <div className="container mx-auto flex w-full flex-col">
            <Tabs
              aria-label="Options"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none px-6 border-b border-divider",
                cursor: "w-full bg-[#22d3ee]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#06b6d4]",
              }}
              color="primary"
              variant="underlined"
            >
              <Tab
                onClick={() => handleNavigate(`/dashboard/profil/${userDetail._id}`)}
                key="profil"
                title={
                  <div className="flex items-center space-x-1">
                    <Profile size="18" />
                    <span>Profil</span>
                  </div>
                }
              />

              <Tab
                onClick={() => handleNavigate(`/dashboard/edit/${userDetail._id}`)}
                key="edit"
                title={
                  <div className="flex items-center space-x-2">
                    <Edit size="18" />
                    <span>Edit</span>
                  </div>
                }
              />
            </Tabs>
            <Outlet />
          </div>
        )
      }
    </div>
  )
}

export default UserDashboardLayout;
