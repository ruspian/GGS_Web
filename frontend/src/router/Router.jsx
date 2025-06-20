import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import MasukPage from "../pages/MasukPage";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import ProfilUserComponent from "../components/ProfilUserComponent";
import EditUserComponent from "../components/EditUserComponent";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'tentang',
        element: <h1>About</h1>
      },
      {
        path: 'daftar',
        element: <RegisterPage />
      },
      {
        path: 'masuk',
        element: <MasukPage />
      },
      {
        path: 'dashboard',
        element: <UserDashboardLayout />,
        children: [
          {
            path: 'profil/:id',
            element: <ProfilUserComponent />
          },
          {
            path: 'edit/:id',
            element: <EditUserComponent />
          }
        ]
      }
    ]
  },
])

export default router