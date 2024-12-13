import { useAuthStore } from "../../store/useAuthStore";
import { Path } from "../../navigations/routes";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const ProtectedLayout = () => {
  const { isAuthenticated, isGetProfileLoading } = useAuthStore();

  if (!isAuthenticated && !isGetProfileLoading) {
    return <Navigate to={Path.Login} replace />;
  }

  return (
    <div className="bg-base-100">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
