import React from "react";
import { Slot } from "expo-router";
import useLoadFonts from "@/hooks/utils/useLoadFonts";

import "../global.css";
import Toast from "@/components/toast";
import useAxiosInterceptor from "@/hooks/utils/useAxiosInterceptor";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  useAxiosInterceptor();
  const { error, loaded } = useLoadFonts();

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <Slot />
      <Toast />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
