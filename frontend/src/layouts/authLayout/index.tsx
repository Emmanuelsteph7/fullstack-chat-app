import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Path } from "../../navigations/routes";
import Navbar from "../../components/navbar";
import AuthSquareBoxes from "./components/authSquareSection";

const AuthLayout = () => {
  const { isAuthenticated, isGetProfileLoading } = useAuthStore();

  if (isAuthenticated && !isGetProfileLoading) {
    return <Navigate to={Path.Chat} replace />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen md:h-screen flex">
        <div className="flex-1 px-5 py-20 lg:py-0 lg:px-0 h-full flex items-center">
          <div className="w-full mx-auto max-w-[400px]">
            <Outlet />
          </div>
        </div>
        <AuthSquareBoxes />
      </div>
    </>
  );
};

export default AuthLayout;
