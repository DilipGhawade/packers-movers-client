import { authApi } from "../../Service/api";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isLogin");

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
