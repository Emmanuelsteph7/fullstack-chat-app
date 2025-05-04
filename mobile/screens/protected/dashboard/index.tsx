import React from "react";
import CustomStatusBar from "@/components/customStatusBar";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { useAuthStore } from "@/store/useAuthStore";

const DashboardScreen = () => {
  const { handleLogout, logoutLoading } = useAuthStore();

  return (
    <CustomStatusBar>
      <Typography variant="headline-4" className="text-center mb-10">
        Dashboard
      </Typography>
      <Button
        label="Logout"
        onPress={handleLogout}
        className="max-w-[250px] w-full mx-auto"
        isLoading={logoutLoading}
      />
    </CustomStatusBar>
  );
};

export default DashboardScreen;
