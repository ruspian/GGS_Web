import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import ProfilUserComponent from "../components/ProfilUserComponent";
import EditUserComponent from "../components/EditUserComponent";
import BerandaPage from "../pages/BerandaPage";
import SemuaKegiatanPage from "../pages/SemuaKegiatanPage";
import DisplayKegiatanPage from "../pages/DisplayKegiatanPage";
import AnggotaPage from "../pages/AnggotaPage";
import AdminPage from "../pages/AdminPage";
import AdminPermissionLayout from "../layouts/AdminPermissionLayout";
import AdminDashboardComponent from "../components/AdminDashboardComponent";
import ProfilAdminComponent from "../components/ProfilAdminComponent";
import KegiatanAdminComponent from "../components/KegiatanAdminComponent";
import AnggotaAdminComponent from "../components/AnggotaAdminComponent";
import GaleriAdminComponent from "../components/GaleriAdminComponent";


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
      },
      {
        path: 'admin',
        element: <AdminPage />,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboardComponent />
          },
          {
            path: 'profil',
            element: <ProfilAdminComponent />
          },
          {
            path: 'kegiatan',
            element: <KegiatanAdminComponent />
          },
          {
            path: 'anggota',
            element: <AnggotaAdminComponent />
          },
          {
            path: 'galeri',
            element: <GaleriAdminComponent />
          },
        ]
      }
    ]
  },
])

export default router