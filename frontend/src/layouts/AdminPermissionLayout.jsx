import { useSelector } from 'react-redux';
import Admin from '../utils/AdminUtil';
import AdminPage from '../pages/AdminPage';
import NotFoundAdminComponent from '../components/NotFoundAdminComponent';
import { Children } from 'react';


const AdminPermissionLayout = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {
        Admin(user.role) ? (
          children
        ) : (
          <NotFoundAdminComponent />

        )
      }
    </>
  )
}

export default AdminPermissionLayout
