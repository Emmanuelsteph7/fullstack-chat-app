import React from "react";
import CustomStatusBar from "@/components/customStatusBar";
import Container from "@/components/container";
import Typography from "@/components/typography";
import LoginForm from "./components/loginForm";
import BackIcon from "@/components/backIcon";
import { View } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { darkGradientColors, lightGradientColors } from "@/constants/color";

const LoginScreen = () => {
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
        <Container className="py-10 justify-between flex-1">
          <BackIcon />
          <View className="flex-1 py-[40px]">
            <Typography variant="headline-3" weight={700}>
              Welcome
            </Typography>
            <Typography
              variant="headline-3"
              className="text-color-primary dark:text-color-primary-dark mb-5"
              weight={700}
            >
              Back!
            </Typography>
            <Typography variant="body" className="mb-8">
              Sign in to access amazing features and connect with your family
              and loved ones.
            </Typography>
            <LoginForm />
          </View>
          <View className="flex-row justify-center gap-2 mt-8">
            <Typography>New to Eming Chat?</Typography>
            <Link href="/(public)/sign-up">
              <Typography
                className="text-color-primary dark:text-color-primary-dark"
                weight={700}
              >
                Sign Up
              </Typography>
            </Link>
          </View>
        </Container>
      </LinearGradient>
    </CustomStatusBar>
  );
};

export default LoginScreen;
