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
import UserAdminComponent from "../components/UserAdminComponent";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import DisplayProfilUserPage from "../pages/DisplayProfilUserPage";
import ErrorPage from "../pages/ErrorPage";


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
        path: 'anggota/:id',
        element: <DisplayProfilUserPage />
      },
      {
        path: 'tentang',
        element: <AboutPage />
      },
      {
        path: 'kontak',
        element: <ContactPage />
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
        element: <AdminPermissionLayout><AdminPage /></AdminPermissionLayout>,
        children: [
          {
            path: 'dashboard',
            element: <AdminPermissionLayout><AdminDashboardComponent /></AdminPermissionLayout>
          },
          {
            path: 'profil',
            element: <AdminPermissionLayout><ProfilAdminComponent /></AdminPermissionLayout>
          },
          {
            path: 'kegiatan',
            element: <AdminPermissionLayout><KegiatanAdminComponent /></AdminPermissionLayout>
          },
          {
            path: 'anggota',
            element: <AdminPermissionLayout><AnggotaAdminComponent /></AdminPermissionLayout>
          },
          {
            path: 'galeri',
            element: <AdminPermissionLayout><GaleriAdminComponent /></AdminPermissionLayout>
          },
          {
            path: 'user',
            element: <AdminPermissionLayout><UserAdminComponent /></AdminPermissionLayout>
          },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

export default router