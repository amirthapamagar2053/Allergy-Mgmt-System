import { useLocation, Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector((state) => state.users);
  return user.length === 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
