import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import MasukPage from "../pages/MasukPage";

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

    ]
  }
])

export default router