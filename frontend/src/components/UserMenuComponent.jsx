import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'

const UserMenuComponent = ({ userDetail }) => {
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
        <DropdownItem textValue='settings' key="settings">My Settings</DropdownItem>
        <DropdownItem textValue='logout' key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenuComponent
