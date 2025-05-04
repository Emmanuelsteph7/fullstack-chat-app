import React from "react";
import CustomStatusBar from "@/components/customStatusBar";
import Container from "@/components/container";
import Typography from "@/components/typography";
import LoginForm from "./components/loginForm";
import BackIcon from "@/components/backIcon";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { darkGradientColors, lightGradientColors } from "@/constants/color";
import KeyboardAvoidingWrapper from "@/components/keyboardAvoidingWrapper";

const LoginScreen = () => {
  const { colorScheme } = useColorScheme();

  const gradientColors =
    colorScheme === "dark" ? darkGradientColors : lightGradientColors;

  return (
    <CustomStatusBar>
      <KeyboardAvoidingWrapper>
        <LinearGradient
          colors={gradientColors as any}
          style={{
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Container className="py-10 justify-between flex-1">
              <BackIcon />
              <View className="flex-1 pt-[20px] pb-[20px]">
                <Typography variant="headline-4" weight={700}>
                  Welcome
                </Typography>
                <Typography
                  variant="headline-4"
                  className="text-color-primary dark:text-color-primary-dark mb-5"
                  weight={700}
                >
                  Back!
                </Typography>
                <Typography variant="body-small" className="mb-8">
                  Sign in to access amazing features and connect with your
                  family and loved ones.
                </Typography>
                <LoginForm />
              </View>
              <View className="flex-row justify-center gap-2 mt-8">
                <Typography>New to Eming Chat?</Typography>
                <Link push href="/(public)/sign-up">
                  <Typography
                    className="text-color-primary dark:text-color-primary-dark"
                    weight={700}
                  >
                    Sign Up
                  </Typography>
                </Link>
              </View>
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingWrapper>
    </CustomStatusBar>
  );
};

export default LoginScreen;
