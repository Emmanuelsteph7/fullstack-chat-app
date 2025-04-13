import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader";

const GlobalLayout = () => {
  const { fetchProfile, isGetProfileLoading } = useAuthStore();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loader show={isGetProfileLoading} showBg variant="fixed" />
      <Suspense>
        <ToastContainer position="bottom-right" />
        <Outlet />
      </Suspense>
    </>
  );
};

export default GlobalLayout;
