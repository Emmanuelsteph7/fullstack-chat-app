import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { MessageSquare } from "lucide-react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const GlobalLayout = () => {
  const { fetchProfile, isGetProfileLoading, profileData } = useAuthStore();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGetProfileLoading && !profileData) {
    return (
      <div className="flex items-center flex-col justify-center h-screen">
        <div className="w-[50px] h-[50px] rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
          <MessageSquare className="text-primary animate-pulse" />
        </div>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <Suspense>
      <ToastContainer position="bottom-center" />
      <Outlet />
    </Suspense>
  );
};

export default GlobalLayout;
