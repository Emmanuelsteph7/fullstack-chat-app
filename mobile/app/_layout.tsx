import React from "react";
import { Slot } from "expo-router";
import useLoadFonts from "@/hooks/utils/useLoadFonts";

import "../global.css";

const RootLayout = () => {
  const { error, loaded } = useLoadFonts();

  if (!loaded && !error) {
    return null;
  }

  return <Slot />;
};

export default RootLayout;
