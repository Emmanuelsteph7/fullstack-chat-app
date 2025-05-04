import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";

const PublicLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/(protected)" />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};

export default PublicLayout;
