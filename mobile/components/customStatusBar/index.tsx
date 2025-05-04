import React, { ReactNode } from "react";
import { StatusBar, StatusBarStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { colors } from "@/constants/color";

interface Props {
  children?: ReactNode;
  statusBarColor?: string;
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  mainViewColor?: string;
}

const CustomStatusBar = ({
  children,
  statusBarColor = "#ffffff",
  backgroundColor = "#ffffff",
  statusBarStyle = "dark-content",
  mainViewColor = "#ffffff",
}: Props) => {
  const { colorScheme } = useColorScheme();

  const insets = useSafeAreaInsets();

  const _mainViewColor =
    colorScheme === "dark" ? colors["color-dark"] : mainViewColor;
  const _statusBarColor =
    colorScheme === "dark" ? colors["color-dark"] : statusBarColor;
  const _backgroundColor =
    colorScheme === "dark" ? colors["color-dark"] : backgroundColor;
  const _statusBarStyle =
    colorScheme === "dark" ? "light-content" : statusBarStyle;

  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: _mainViewColor,
      }}
    >
      <StatusBar
        backgroundColor={_statusBarColor}
        translucent
        barStyle={_statusBarStyle}
      />
      <View className="flex-1" style={{ backgroundColor: _backgroundColor }}>
        {children}
      </View>
    </View>
  );
};

export default CustomStatusBar;
