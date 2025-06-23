import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import ProfilUserComponent from "../components/ProfilUserComponent";
import EditUserComponent from "../components/EditUserComponent";
import BerandaPage from "../pages/BerandaPage";
import SemuaKegiatanPage from "../pages/SemuaKegiatanPage";
import DisplayKegiatanPage from "../pages/DisplayKegiatanPage";
import AnggotaPage from "../pages/AnggotaPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <BerandaPage />
      },
      {
        path: 'kegiatan',
        element: <SemuaKegiatanPage />
      },
      {
        path: 'kegiatan/:id',
        element: <DisplayKegiatanPage />
      },
      {
        path: 'anggota',
        element: <AnggotaPage />
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