import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

function App() {

  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}

export default App
