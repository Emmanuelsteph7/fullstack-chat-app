import { TouchableOpacity } from "react-native";
import React from "react";
import ChevronBackIcon from "@/assets/svgs/chevron-back.svg";
import { colors } from "@/constants/color";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

const BackIcon = () => {
  const router = useRouter();

  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      activeOpacity={0.6}
      className="w-[50px] bg-color-primary/10 dark:bg-color-primary-dark/10 rounded-full h-[50px] items-center justify-center"
    >
      <ChevronBackIcon
        width={22}
        height={22}
        color={
          colorScheme === "dark"
            ? colors["color-primary-dark"]
            : colors["color-primary"]
        }
      />
    </TouchableOpacity>
  );
};

export default BackIcon;
