import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const useLoadFonts = () => {
  const [loaded, error] = useFonts({
    "Mulish-900": require("../../assets/fonts/mulish/Mulish-Black.ttf"),
    "Mulish-800": require("../../assets/fonts/mulish/Mulish-ExtraBold.ttf"),
    "Mulish-700": require("../../assets/fonts/mulish/Mulish-Bold.ttf"),
    "Mulish-600": require("../../assets/fonts/mulish/Mulish-SemiBold.ttf"),
    "Mulish-500": require("../../assets/fonts/mulish/Mulish-Medium.ttf"),
    "Mulish-400": require("../../assets/fonts/mulish/Mulish-Regular.ttf"),
    "Mulish-300": require("../../assets/fonts/mulish/Mulish-Light.ttf"),
    "Mulish-200": require("../../assets/fonts/mulish/Mulish-ExtraLight.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
};

export default useLoadFonts;
