import BackIcon from "@/components/backIcon";
import Container from "@/components/container";
import CustomStatusBar from "@/components/customStatusBar";
import KeyboardAvoidingWrapper from "@/components/keyboardAvoidingWrapper";
import Typography from "@/components/typography";
import { darkGradientColors, lightGradientColors } from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, View } from "react-native";
import SignupForm from "./components/signupForm";
import useSignup from "./hooks/useSignup";
import OtpSheet from "@/components/otpSheet";

const SignupScreen = () => {
  const signupLogic = useSignup();

  const {
    handleOtpChange,
    otp,
    bottomSheetRef,
    handleModalClose,
    handleVerifyAccount,
    isVerifyLoading,
  } = signupLogic;

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
                  Hello
                </Typography>
                <Typography
                  variant="headline-4"
                  className="text-color-primary dark:text-color-primary-dark mb-5"
                  weight={700}
                >
                  There!
                </Typography>
                <Typography variant="body-small" className="mb-8">
                  Sign up to access amazing features and connect with your
                  family and loved ones.
                </Typography>
                <SignupForm signupLogic={signupLogic} />
              </View>
              <View className="flex-row justify-center gap-2 mt-8">
                <Typography>Already have an account?</Typography>
                <Link push href="/(public)/login">
                  <Typography
                    className="text-color-primary dark:text-color-primary-dark"
                    weight={700}
                  >
                    Login
                  </Typography>
                </Link>
              </View>
            </Container>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingWrapper>
      <OtpSheet
        header="Verify your email"
        description="An email has been sent to you. Kindly fill in the code to verify your
          account."
        handleAction={handleVerifyAccount}
        handleClose={handleModalClose}
        handleOtpChange={handleOtpChange}
        isLoading={isVerifyLoading}
        ref={bottomSheetRef}
        otpValue={otp}
      />
    </CustomStatusBar>
  );
};

export default SignupScreen;
