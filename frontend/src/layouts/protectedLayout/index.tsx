import { useAuthStore } from "../../store/useAuthStore";
import { Path } from "../../navigations/routes";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={Path.Login} replace />;
  }

  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
