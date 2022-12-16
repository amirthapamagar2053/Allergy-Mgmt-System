import { Outlet } from "react-router";
import App from "../App";

const Layout = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};

export default Layout;
