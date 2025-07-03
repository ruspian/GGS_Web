import { addToast, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/userSliceRedux';

const UserMenuComponent = ({ userDetail }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fungsi handle Logout
  const handleLogout = async () => {
    try {
      // kirim reques ke backend
      const response = await FetchFromAxios({
        ...getAPI.logout,
        headers: {
          Authorization: `Bearer ${userDetail.accessToken}`,
        },
        withCredentials: true,
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
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={userDetail.avatar}
          size="sm"
          radius="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem textValue='user' key="profile" className="h-14 gap-2">
          <p className="font-semibold">{userDetail.name}</p>
          <p className="font-semibold">{userDetail.email}</p>
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate(`/dashboard/profil/${userDetail._id}`)}
          textValue='dashboard'
          key="dashboard"
        >
          Dashboard
        </DropdownItem>

        <DropdownItem
          onClick={() => navigate(`/admin/profil`)}
          textValue='Admin'
          key="admin"
          className={`${userDetail.role === "admin" ? "hidden" : ""}`}
        >
          Admin
        </DropdownItem>

        <DropdownItem
          onClick={handleLogout}
          textValue='logout'
          key="logout"
          color="danger">
          Keluar
        </DropdownItem>

      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenuComponent
