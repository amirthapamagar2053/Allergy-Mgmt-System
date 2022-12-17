import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  return localStorage.getItem("loggedInUser") ? (
    <Outlet />
  ) : (
    <Navigate to="/Signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
