import React from "react";
import CustomStatusBar from "@/components/customStatusBar";
import { useWindowDimensions, View } from "react-native";
import TextContent from "./components/textContent";
import WelcomeIcon1 from "@/assets/svgs/welcome-1.svg";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import Typography from "@/components/typography";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { darkGradientColors, lightGradientColors } from "@/constants/color";

const WelcomeScreen = () => {
  const { width } = useWindowDimensions();

  const { colorScheme } = useColorScheme();

  const gradientColors =
    colorScheme === "dark" ? darkGradientColors : lightGradientColors;

  return (
    <CustomStatusBar>
      <LinearGradient
        colors={gradientColors as any}
        style={{
          flex: 1,
        }}
      >
        <View className="flex-1">
          <View className="flex-1 justify-between pt-5 pb-10">
            <Typography
              variant="headline-4"
              weight={800}
              shouldAnimate
              className="text-color-primary dark:text-white text-center"
              entering={FadeInUp.duration(300)}
            >
              Eming Chat
            </Typography>
            <Animated.View
              entering={FadeIn.delay(100).duration(1000)}
              className="items-center"
            >
              <WelcomeIcon1 width={width - 100} height={400} />
            </Animated.View>
          </View>
          <TextContent />
        </View>
      </LinearGradient>
    </CustomStatusBar>
  );
};

export default WelcomeScreen;
