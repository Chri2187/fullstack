import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const user = { isLogged: false };
  if (token) {
    user.isLogged = true;
  }
  return user && user.isLogged;
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
