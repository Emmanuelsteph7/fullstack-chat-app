import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Path } from "../../navigations/routes";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={Path.Chat} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
